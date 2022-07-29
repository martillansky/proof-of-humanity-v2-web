import Jimp from "jimp";
import { base64ToUint8Array, concatenateBuffers, randomString } from "./misc";
import { createFFmpeg, FFmpeg } from "@ffmpeg/ffmpeg";
import { uploadToIPFS } from "./ipfs";
import { on } from "./events";

function exifRemoved(buffer: Uint8Array) {
  const dv = new DataView(buffer.buffer);
  const formatTag = dv.getUint16(0);
  if (formatTag === 0xffd8) {
    const pieces = [];
    let i = 0;
    let recess = 0;
    let offset = 2;
    let app1 = dv.getUint16(offset);
    offset += 2;
    while (offset < dv.byteLength) {
      if (app1 === 0xffda) break;
      if (app1 === 0xffe1) {
        pieces[i++] = { recess, offset: offset - 2 };
        recess = offset + dv.getUint16(offset);
      }
      offset += dv.getUint16(offset);
      app1 = dv.getUint16(offset);
      offset += 2;
    }

    return concatenateBuffers(
      ...pieces.reduce(
        (acc, v) => [...acc, buffer.slice(v.recess, v.offset)],
        []
      ),
      buffer.slice(recess)
    );
  }

  return buffer;
}

async function isGrayscale(image: Jimp) {
  let red = 0;
  let green = 0;
  let blue = 0;

  image.scan(
    0,
    0,
    image.bitmap.width,
    image.bitmap.height,
    function (_x, _y, idx) {
      red += this.bitmap.data[idx + 0];
      green += this.bitmap.data[idx + 1];
      blue += this.bitmap.data[idx + 2];
    }
  );

  return red === green && green === blue;
}

export async function sanitizeImage(buffer: Buffer) {
  try {
    const image = await Jimp.read(buffer);
    const { bitmap } = image;

    if (await isGrayscale(image)) throw new Error("Image is grayscale");

    return exifRemoved(
      await image
        .quality(95)
        .resize(Math.min(bitmap.width, 1080), Math.min(bitmap.height, 1080))
        .getBufferAsync(Jimp.MIME_JPEG)
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    on(image, "load", () => resolve(image));
    on(image, "error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getCroppedPhoto = async (
  photoUri: string,
  pixelCrop: Crop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) => {
  const image = await createImage(photoUri);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  context.translate(bBoxWidth / 2, bBoxHeight / 2);
  context.rotate(rotRad);
  context.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  context.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  context.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = context.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  context.putImageData(data, 0, 0);

  // As Base64 string
  return canvas.toDataURL("image/jpeg");
};

let ffmpeg: FFmpeg;

export const loadFFMPEG = async () => {
  if (ffmpeg && ffmpeg.isLoaded()) return;
  ffmpeg = createFFmpeg({ log: false, corePath: "/dist/ffmpeg-core.js" });
  await ffmpeg.load();
};

export async function videoSanitizer(
  inputBuffer: Uint8Array,
  callback: (progress: number) => void,
  mirrored: boolean,
  duration: number
) {
  try {
    await loadFFMPEG();

    ffmpeg.setProgress((progress) => {
      // if (progress.time === undefined) return;
      // callback(progress.time / duration);
    });

    const inputName = randomString(46);
    const outputName = randomString(46);
    const outputFilename = `${outputName}.mp4`;

    const options = [
      "-i",
      inputName,
      "-map_metadata",
      -1,
      "-c:v",
      "libx264",
      "-c:a",
      "copy",
      "-crf",
      "26",
      "-preset",
      "superfast",
      "-vf",
      "mpdecimate",
      ...(mirrored ? ["-vf", "mirror"] : []),
      outputFilename,
    ];

    ffmpeg.FS("writeFile", inputName, inputBuffer);
    await ffmpeg.run(...options);

    const videoURI = await uploadToIPFS(
      outputFilename,
      Buffer.from(ffmpeg.FS("readFile", outputFilename))
    );

    ffmpeg.FS("unlink", inputName);
    ffmpeg.FS("unlink", outputFilename);

    return videoURI;
  } catch (err) {
    console.error(err);
  }
}

import Button from "components/Button";
import React, { useRef, useState } from "react";
import { useFormContext } from "./context";
import ReactWebcam from "react-webcam";
import useFullscreen from "hooks/useFullscreen";
import { getCroppedPhoto, sanitizeImage } from "utils/media";
import { base64ToUint8Array } from "utils/misc";
import useUserMedia from "hooks/useUserMedia";
import Uploader from "components/Uploader";
import Cropper from "react-easy-crop";
import Modal from "components/Modal";
import Image from "components/Image";
import Webcam, { CameraButton } from "components/Webcam";
import type { Area, Point } from "react-easy-crop/types";

import FacialFeaturesImage from "assets/images/facial-features.jpg";
import NotFrontFacingImage from "assets/images/not-front-facing.jpg";
import GlassesImage from "assets/images/glasses.jpg";
import SunglassesImage from "assets/images/sunglasses.jpg";
import HijabImage from "assets/images/hijab.jpg";
import NiqabImage from "assets/images/niqab.jpg";
import BWImage from "assets/images/b&w.jpg";
import MaskImage from "assets/images/mask.jpg";

const Photo: React.FC = () => {
  const { advance, previous, photoUriState } = useFormContext();
  const { switchCamera } = useUserMedia();

  const fullscreenRef = useRef(null);
  const { setFullscreen, toggleFullscreen } = useFullscreen(fullscreenRef);

  const [originalPhoto, setOriginalPhoto] = useState<ArrayBuffer | null>(null);
  const [originalPhotoUri, setOriginalPhotoUri] = useState("");
  const [photo, setPhoto] = useState<ArrayBuffer | null>(null);
  const [photoUri, setPhotoUri] = photoUriState;

  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [camera, setCamera] = useState<ReactWebcam | null>(null);

  const [cropPixels, setCropPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [maxZoom, setMaxZoom] = useState(3);
  const [zoom, setZoom] = useState(1);

  const loadOriginalPhoto = async (blob: Blob) => {
    setOriginalPhoto(await blob.arrayBuffer());
    setOriginalPhotoUri(URL.createObjectURL(blob));
    setCameraEnabled(false);
  };

  const onCrop = async () => {
    if (!cropPixels) return;
    if (cropPixels.width < 256 || cropPixels.height < 256)
      return console.error("Size error");

    const cropped = await getCroppedPhoto(originalPhotoUri, cropPixels);
    if (!cropped) return;

    const sanitized = await sanitizeImage(
      Buffer.from(base64ToUint8Array(cropped.split(",")[1]))
    );

    setPhoto(sanitized);
    setPhotoUri(
      URL.createObjectURL(new Blob([sanitized], { type: "image/jpeg" }))
    );
  };

  const takePhoto = () => {
    setFullscreen(false);
    if (!camera) return;

    const originalPhoto = camera.getScreenshot();
    if (!originalPhoto) return;

    loadOriginalPhoto(
      new Blob([base64ToUint8Array(originalPhoto.split(",")[1])], {
        type: "buffer",
      })
    );
  };

  const retakePhoto = () => {
    setOriginalPhoto(new ArrayBuffer(0));
    setOriginalPhotoUri("");
    setPhoto(new ArrayBuffer(0));
    setPhotoUri("");
    setCameraEnabled(true);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCropPixels(null);
  };

  return (
    <>
      <span className="text-3xl font-bold my-8">Face Photo</span>

      <span className="font-bold">Photo Instructions:</span>
      <ul>
        <li>
          The photo should include the face of the submitter facing the camera
          and the facial features must be visible.
        </li>
        <li>
          Face should not be covered under heavy make-up, large piercings or
          masks hindering the visibility of facial features. Headcover not
          covering the internal region of the face is acceptable (For example, a
          hijab is acceptable for a submitter but a niqab is not).
        </li>
        <li>
          It can include items worn daily (ex: headscarf, turban, wig, light
          makeup, etc) provided they do not violate the previous point. It
          cannot include special items worn only on special occasions.
        </li>
      </ul>

      <div className="grid grid-cols-4 gap-2">
        <Image uri={FacialFeaturesImage} rounded />
        <Image uri={NotFrontFacingImage} rounded />
        <Image uri={GlassesImage} rounded />
        <Image uri={SunglassesImage} rounded />
        <Image uri={HijabImage} rounded />
        <Image uri={NiqabImage} rounded />
        <Image uri={BWImage} rounded />
        <Image uri={MaskImage} rounded />
      </div>

      <div className="w-full my-4 grid grid-cols-2">
        <Webcam
          enabled={cameraEnabled}
          fullscreenRef={fullscreenRef}
          loadCamera={setCamera}
          trigger={
            <button className="p-2 bg-blue-500 border rounded font-bold text-3xl text-white">
              Take photo with camera
            </button>
          }
        >
          <div className="absolute bottom-4 grid grid-cols-3 gap-2">
            <CameraButton onClick={switchCamera}>SWITCH</CameraButton>
            <CameraButton onClick={takePhoto}>TAKE</CameraButton>
            <CameraButton onClick={toggleFullscreen}>FULLSCREEN</CameraButton>
          </div>
        </Webcam>

        <Uploader
          className="w-full flex flex-col justify-center p-2 border-dashed border-2 border-sky-500 rounded"
          type="image"
          onDrop={async (received) => {
            const file = received[0];
            loadOriginalPhoto(new Blob([file], { type: file.type }));
          }}
          disabled={!!originalPhoto}
        >
          <span className="text-3xl font-bold">Or upload an image</span>
          <p>Drag 'n drop some files here, or click to select files</p>
        </Uploader>
      </div>

      <Modal open={!!originalPhoto && !photo} onClose={retakePhoto}>
        <div className="flex flex-col">
          <span className="text-3xl font-bold my-8">Crop your photo</span>
          <span className="mb-8">
            Make sure your face is centered and not rotated.
          </span>

          <div className="relative w-full h-96">
            <Cropper
              image={originalPhotoUri}
              crop={crop}
              zoom={zoom}
              maxZoom={maxZoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onCropComplete={(_area, croppedPixels) => {
                setCropPixels(croppedPixels);
                if (croppedPixels.width < 256 || croppedPixels.height < 256)
                  console.error("Size error");
              }}
              onZoomChange={setZoom}
              onMediaLoaded={(media) => {
                setMaxZoom(
                  Math.floor(
                    Math.min(media.naturalWidth, media.naturalHeight) / 256
                  )
                );
              }}
            />
          </div>

          <div className="flex flex-col">
            <span>Size</span>
            <input
              type="range"
              min={1}
              max={maxZoom}
              step={0.05}
              value={zoom}
              onChange={(event) => setZoom(parseFloat(event.target.value))}
            />
          </div>
          <Button onClick={onCrop}>Ready</Button>
        </div>
      </Modal>

      {photo && <Image uri={photoUri} rounded previewed />}

      <div className="m-4 grid grid-cols-2 gap-2">
        <Button onClick={previous}>Previous</Button>
        <Button onClick={advance}>Advance</Button>
      </div>
    </>
  );
};

export default Photo;

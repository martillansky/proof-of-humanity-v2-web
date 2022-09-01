import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop/types";
import ReactWebcam from "react-webcam";
import BWImage from "assets/images/b&w.jpg";
import FrontFacingImage from "assets/images/front-facing.jpg";
import GlassesImage from "assets/images/glasses.jpg";
import HijabImage from "assets/images/hijab.jpg";
import NiqabImage from "assets/images/niqab.jpg";
import NotFrontFacingImage from "assets/images/not-front-facing.jpg";
import SunglassesImage from "assets/images/sunglasses.jpg";
import CameraIcon from "assets/svg/CameraMajor.svg";
import CircleCancel from "assets/svg/CircleCancelMinor.svg";
import CircleTick from "assets/svg/CircleTickMinor.svg";
import CheckmarkIcon from "assets/svg/MobileAcceptMajor.svg";
import ResetIcon from "assets/svg/ResetMinor.svg";
import ZoomIcon from "assets/svg/SearchMajor.svg";
import UploadIcon from "assets/svg/UploadMajor.svg";
import Image from "components/Image";
import Uploader from "components/Uploader";
import Webcam from "components/Webcam";
import useFullscreen from "hooks/useFullscreen";
import { getCroppedPhoto, sanitizeImage } from "utils/media";
import { base64ToUint8Array } from "utils/misc";
import { useFormContext } from "./context";

const ExamplePic: React.FC<{ uri: string; wrong?: boolean }> = ({
  uri,
  wrong,
}) => (
  <div className="flex flex-col items-center">
    <Image className="w-28 h-28 mb-1" uri={uri} />
    {wrong ? (
      <CircleCancel className="w-6 h-6 fill-red-500" />
    ) : (
      <CircleTick className="w-6 h-6 fill-green-500" />
    )}
  </div>
);

const Photo: React.FC = () => {
  const {
    advance,
    dispatch,
    state: { photo },
  } = useFormContext();

  const fullscreenRef = useRef(null);
  const { isFullscreen, setFullscreen, toggleFullscreen } =
    useFullscreen(fullscreenRef);

  const [originalPhoto, setOriginalPhoto] = useState<{
    uri: string;
    buffer: Buffer;
  } | null>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState<ReactWebcam | null>(null);
  const [cropPixels, setCropPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [maxZoom, setMaxZoom] = useState(3);
  const [zoom, setZoom] = useState(1);

  const onCrop = async () => {
    if (!cropPixels || !originalPhoto) return;
    if (cropPixels.width < 256 || cropPixels.height < 256)
      return console.error("Size error");

    const cropped = await getCroppedPhoto(originalPhoto.uri, cropPixels);
    if (!cropped) return;

    const sanitized = await sanitizeImage(
      Buffer.from(base64ToUint8Array(cropped.split(",")[1]))
    );

    dispatch({
      type: "PHOTO",
      payload: {
        content: sanitized,
        uri: URL.createObjectURL(new Blob([sanitized], { type: "image/jpeg" })),
      },
    });
  };

  const takePhoto = async () => {
    setFullscreen(false);
    if (!camera) return;

    const screenshot = camera.getScreenshot();
    if (!screenshot) return;

    const buffer = Buffer.from(base64ToUint8Array(screenshot.split(",")[1]));
    setOriginalPhoto({
      uri: URL.createObjectURL(new Blob([buffer], { type: "buffer" })),
      buffer,
    });

    setShowCamera(false);
  };

  const retakePhoto = () => {
    setShowCamera(false);
    dispatch({ type: "DELETE_PHOTO" });
    setOriginalPhoto(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCropPixels(null);
  };

  return (
    <>
      <span className="w-full my-4 flex flex-col text-2xl font-semibold">
        {originalPhoto && !photo ? "Crop photo" : "Take Photo"}
        <div className="divider mt-4 w-2/3" />
      </span>

      <span className="txt pb-8">
        {originalPhoto && !photo
          ? "Make sure your face is centered and not rotated"
          : "The photo should include the face of the submitter facing the camera and the facial features must be visible"}
      </span>

      {!showCamera && !originalPhoto && !photo && (
        <div className="flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row pb-8">
            <div className="w-fit m-auto flex flex-col items-center">
              <span className="txt pb-2">Face the camera</span>
              <div className="grid grid-cols-2 gap-2">
                <ExamplePic uri={FrontFacingImage} />
                <ExamplePic uri={NotFrontFacingImage} wrong={true} />
              </div>
            </div>

            <div className="w-fit m-auto flex flex-col items-center">
              <span className="txt pb-2">No filters</span>
              <div className="w-fit grid grid-cols-1">
                <ExamplePic uri={BWImage} wrong={true} />
              </div>
            </div>
          </div>

          <div className="w-fit flex flex-col items-center">
            <span className="txt pb-2">
              All facial features must be visible
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <ExamplePic uri={HijabImage} />
              <ExamplePic uri={NiqabImage} wrong={true} />
              <ExamplePic uri={GlassesImage} />
              <ExamplePic uri={SunglassesImage} wrong={true} />
            </div>
          </div>
          <div className="relative w-full mt-12 bordered grid grid-cols-2">
            <Uploader
              className="h-full flex items-center justify-center p-2 outline-dotted outline-white bg-white rounded"
              type="image"
              onDrop={async (received) => {
                const file = received[0];
                setOriginalPhoto({
                  uri: URL.createObjectURL(
                    new Blob([file], { type: file.type })
                  ),
                  buffer: Buffer.from(await file.arrayBuffer()),
                });
              }}
              disabled={!!originalPhoto}
            >
              <UploadIcon className="w-12 h-12 mr-4 fill-[#ff9966]" />
              <span className="text-lg font-semibold">Upload photo</span>
            </Uploader>

            <span
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
                         p-1
                         border-2 border-slate-200
                         bg-white rounded-full 
                         text-[#ff9966] text-xs font-semibold"
            >
              OR
            </span>

            <button
              className="flex items-center justify-center p-2 font-semibold text-lg text-white"
              onClick={() => setShowCamera(true)}
            >
              <div className="flex flex-col">
                <span>Take with</span>
                <span>camera</span>
              </div>
              <CameraIcon className="w-12 h-12 ml-4 fill-white" />
            </button>
          </div>
        </div>
      )}

      {showCamera && (
        <div tabIndex={0} ref={fullscreenRef}>
          <Webcam
            fullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            loadCamera={setCamera}
            action={takePhoto}
          />
        </div>
      )}

      {!showCamera && !!originalPhoto && !photo && (
        <>
          <div className="centered mx-12 mb-4">
            <ZoomIcon className="w-6 h-6 mr-2 fill-[#ff9966]" />
            <input
              className="w-full h-0.5 bg-slate-200 appearance-none slider-thumb"
              type="range"
              min={1}
              max={maxZoom}
              step={0.05}
              value={zoom}
              onChange={(event) => setZoom(parseFloat(event.target.value))}
            />
          </div>

          <div className="relative w-full h-96 mb-2 bg-slate-200">
            <Cropper
              image={originalPhoto?.uri}
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

          <button className="btn-main" onClick={onCrop}>
            <CheckmarkIcon className="w-6 h-6 mr-2 fill-white" />
            Ready
          </button>
        </>
      )}

      {!!photo && (
        <div className="flex flex-col items-center">
          <Image uri={photo.uri} rounded previewed />
          <button className="btn-main mt-4" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {(showCamera || !!originalPhoto || !!photo) && (
        <button
          className="centered mt-4 text-[#ff9966] font-semibold text-lg uppercase"
          onClick={() => retakePhoto()}
        >
          <ResetIcon className="w-6 h-6 mr-2 fill-[#ff9966]" />
          {showCamera ? "Return" : "Retake"}
        </button>
      )}
    </>
  );
};

export default Photo;

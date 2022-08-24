import { IS_MOBILE } from "constants/media";
import React, { useState } from "react";
import ReactWebcam from "react-webcam";
import { loadFFMPEG } from "utils/media";
import cn from "classnames";

import FlipCameraIcon from "assets/svg/FlipCameraMajor.svg";
import MaximizeIcon from "assets/svg/MaximizeMinor.svg";
import MinimizeIcon from "assets/svg/MinimizeMinor.svg";
import SmileyIcon from "assets/svg/SmileyHappyMajor.svg";
import MirrorIcon from "assets/svg/ProductReturnsMinor.svg";
import PlayIcon from "assets/svg/PlayMajor.svg";
import PauseIcon from "assets/svg/PauseMajor.svg";

interface CameraButtonInterface {
  className?: string;
  secondary?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const CameraButton: React.FC<CameraButtonInterface> = ({
  className,
  secondary,
  onClick,
  children,
}) => (
  <button
    className={cn(
      "btn-main rounded-full absolute",
      secondary
        ? "w-12 h-12 opacity-60"
        : "w-16 h-16 outline outline-2 outline-offset-2 outline-[#ff9966]",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

interface WebcamProps {
  fullscreen: boolean;
  recording?: boolean;
  toggleFullscreen: () => void;
  action: () => void;
  video?: boolean;
  loadCamera: React.Dispatch<React.SetStateAction<ReactWebcam | null>>;
}

const Webcam: React.FC<WebcamProps> = ({
  video = false,
  loadCamera,
  action,
  recording,
  fullscreen,
  toggleFullscreen,
}) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentCamera, setCurrentCamera] = useState("");
  const [cameraPermission, setCameraPermission] = useState(true);
  const [userMediaError, setUserMediaError] = useState("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [mirrored, setMirrored] = useState(false);

  const switchFacingMode = () =>
    setFacingMode(facingMode === "user" ? "environment" : "user");

  const onUserMedia = (mediaStream: MediaStream) => {
    if (devices.length !== 0) return;

    if (video) loadFFMPEG();

    navigator.mediaDevices.enumerateDevices().then((videoDevices) => {
      setDevices(videoDevices.filter((dev) => dev.kind === "videoinput"));
      setCurrentCamera(videoDevices[0].deviceId);
    });
  };

  const onUserMediaError = (error: DOMException) => {
    switch (error.name) {
      case "NotFoundError":
      case "DevicesNotFound:Error":
        if (devices.length > 0) switchFacingMode();
        setUserMediaError("NoCamera");
        break;
      case "NotAllowedError":
      case "PermissionDeniedError":
        setCameraPermission(false);
        break;
      case "OverconstrainedError":
      case "ConstraintNotSatisfied:Error":
        setUserMediaError("NoConstraints");
        break;
      case "NotReadableError":
      case "TrackStartError":
        setUserMediaError("NoCamera");
        break;
    }
  };

  if (!cameraPermission || userMediaError)
    return <div className="text-red-500 text-3xl">Camera not enabled</div>;

  const FullscreenIcon = fullscreen ? MinimizeIcon : MaximizeIcon;
  const ActionIcon = video ? (recording ? PauseIcon : PlayIcon) : SmileyIcon;

  return (
    <div className="relative">
      <ReactWebcam
        className="w-full h-full"
        ref={loadCamera}
        mirrored={mirrored}
        screenshotFormat={"image/jpeg"}
        audio={video}
        screenshotQuality={1}
        forceScreenshotSourceSize
        videoConstraints={{
          width: IS_MOBILE
            ? { min: 640, exact: 1280 }
            : { min: 640, ideal: 1920 },
          height: IS_MOBILE
            ? { min: 480, exact: 720 }
            : { min: 480, ideal: 1080 },
          frameRate: { min: 24, ideal: 60 },
          deviceId: IS_MOBILE ? undefined : currentCamera,
          facingMode,
        }}
        onCanPlayThrough={() => false}
        onClick={(e) => e.preventDefault()}
        onUserMedia={onUserMedia}
        onUserMediaError={onUserMediaError}
      />

      {recording ? (
        <span
          className="absolute top-6 right-6
                     h-8 w-8 inline-flex
                     bg-red-500 rounded-full
                     before:h-full before:w-full
                     before:animate-ping
                     before:bg-red-400/80 before:rounded-full"
        />
      ) : (
        <>
          {IS_MOBILE && devices.length > 1 && (
            <CameraButton
              secondary
              className="left-4 top-4"
              onClick={switchFacingMode}
            >
              <FlipCameraIcon className="w-8 h-8 fill-white" />
            </CameraButton>
          )}
          <CameraButton
            secondary
            className={cn(
              "left-4",
              IS_MOBILE && devices.length > 1 ? "top-20" : "top-4"
            )}
            onClick={() => setMirrored((o) => !o)}
          >
            <MirrorIcon className="w-8 h-8 fill-white" />
          </CameraButton>
          <CameraButton
            secondary
            className="right-4 top-4"
            onClick={toggleFullscreen}
          >
            <FullscreenIcon className="w-8 h-8 fill-white" />
          </CameraButton>
        </>
      )}

      <CameraButton
        className="bottom-8 left-1/2 -translate-x-1/2 opacity-90"
        onClick={action}
      >
        <ActionIcon className="w-12 h-12 fill-white" />
      </CameraButton>
    </div>
  );
};

export default Webcam;

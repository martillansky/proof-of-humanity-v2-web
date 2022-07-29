import { IS_MOBILE } from "constants/media";
import useUserMedia from "hooks/useUserMedia";
import React from "react";
import ReactWebcam from "react-webcam";
import Modal from "./Modal";

interface WebcamProps {
  video?: boolean;
  fullscreenRef: React.MutableRefObject<any>;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
  loadCamera: React.Dispatch<React.SetStateAction<ReactWebcam | null>>;
  enabled: boolean;
  children?: React.ReactNode;
}

const Webcam: React.FC<WebcamProps> = ({
  fullscreenRef,
  trigger,
  loadCamera,
  enabled = false,
  video = false,
  children,
}) => {
  const {
    cameraPermission,
    userMediaError,
    facingMode,
    onUserMedia,
    onUserMediaError,
    currentCamera,
  } = useUserMedia();

  const cameraOpen = enabled && cameraPermission && !userMediaError;

  return (
    <Modal trigger={trigger}>
      {!cameraOpen && (
        <div className="text-red-500 text-3xl">Camera not enabled</div>
      )}
      <div
        tabIndex={0}
        ref={fullscreenRef}
        className="relative flex justify-center"
      >
        <ReactWebcam
          ref={loadCamera}
          mirrored={false}
          screenshotFormat={video ? undefined : "image/jpeg"}
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
            facingMode: facingMode,
          }}
          onCanPlayThrough={() => false}
          onClick={(event) => event.preventDefault()}
          onUserMedia={onUserMedia}
          onUserMediaError={onUserMediaError}
        />
        {children}
      </div>
    </Modal>
  );
};

export default Webcam;

interface CameraButtonInterface {
  onClick: () => void;
  children: React.ReactNode;
}

export const CameraButton: React.FC<CameraButtonInterface> = ({
  onClick,
  children,
}) => (
  <button
    className="p-2 rounded-full bg-orange text-white font-bold"
    onClick={onClick}
  >
    {children}
  </button>
);

import { useState } from "react";

const useUserMedia = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [facingMode, setFacingMode] = useState("user");
  const [currentCamera, setCurrentCamera] = useState("");
  const [cameraPermission, setCameraPermission] = useState(true);
  const [userMediaError, setUserMediaError] = useState("");

  const switchCamera = () =>
    setFacingMode(facingMode === "user" ? "environment" : "user");

  const onUserMedia = () => {
    if (devices.length !== 0) return;

    navigator.mediaDevices.enumerateDevices().then((videoDevices) => {
      setDevices(videoDevices.filter((dev) => dev.kind === "videoinput"));
      setCurrentCamera(videoDevices[0].deviceId);
    });
  };

  const onUserMediaError = (error: DOMException) => {
    switch (error.name) {
      case "NotFoundError":
      case "DevicesNotFound:Error":
        if (devices.length > 0) switchCamera();
        else setUserMediaError("NoCamera");
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

  return {
    devices,
    facingMode,
    currentCamera,
    cameraPermission,
    userMediaError,
    switchCamera,
    onUserMedia,
    onUserMediaError,
    setFacingMode,
  };
};

export default useUserMedia;

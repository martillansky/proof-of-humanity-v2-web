import useFullscreen from "hooks/useFullscreen";
import React, { useRef, useState } from "react";
import useUserMedia from "hooks/useUserMedia";
import getBlobDuration from "get-blob-duration";
import useWeb3 from "hooks/useWeb3";
import { base2048 } from "utils/misc";
import { IS_ANDROID, IS_IOS, IS_MOBILE, OS } from "constants/media";
import { useFormContext } from "./context";
import ReactWebcam from "react-webcam";
import cn from "classnames";

import SpeakerImage from "assets/images/speaker.png";
import SignImage from "assets/images/sign.png";
import Button from "components/Button";
import Uploader from "components/Uploader";
import { videoSanitizer } from "utils/media";

const CameraButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    className="p-2 rounded-full bg-orange text-white font-bold"
    onClick={onClick}
  >
    {children}
  </button>
);

const MIN_DIMS = { width: 352, height: 352 };

const Video: React.FC = () => {
  const { previous, advance } = useFormContext();
  const { account } = useWeb3();
  const { fullscreen, toggleFullscreen, exitFullscreen } = useFullscreen();
  const {
    devices,
    facingMode,
    setFacingMode,
    cameraPermission,
    userMediaError,
    onUserMedia,
    onUserMediaError,
    currentCamera,
  } = useUserMedia();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<BlobPart[]>([]);
  const [recordingMode, setRecordingMode] = useState("");
  const [videoUri, setVideoUri] = useState("");
  const [mirrored, setMirrored] = useState(false);
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState<Blob | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [camera, setCamera] = useState<ReactWebcam | null>(null);

  const handleStartCaptureClick = () => {
    if (!camera || !camera.stream) return;

    setRecording(true);

    mediaRecorderRef.current = new MediaRecorder(camera.stream, {
      mimeType: IS_IOS ? "video/mp4" : "video/webm",
    });

    mediaRecorderRef.current.ondataavailable = ({ data }) =>
      setRecordedVideo(recordedVideo.concat(data));

    mediaRecorderRef.current.onstop = async () => {
      if (fullscreen) exitFullscreen();

      const blob = new Blob(recordedVideo, {
        type: `${IS_IOS ? "video/mp4" : "video/webm"};codecs=h264`,
      });
      setRecording(false);
      setCameraEnabled(false);
      setDuration(await getBlobDuration(blob));
      setVideoUri(URL.createObjectURL(blob));
      setFile(blob);
    };

    mediaRecorderRef.current.start();
  };

  const handleStopCaptureClick = () => {
    if (!mediaRecorderRef.current || recording) return;
    mediaRecorderRef.current.stop();
  };

  const mirrorVideo = () => setMirrored((m) => !m);

  const switchCamera = () => {
    if (IS_IOS || IS_ANDROID)
      setFacingMode((fm) => (fm === "environment" ? "user" : "environment"));
  };

  const goBack = () => {
    const goPrevious = recordingMode === "";

    setRecording(false);
    setCameraEnabled(false);
    setVideoUri("");
    setRecordedVideo([]);
    setFile(null);
    setRecordingMode("");

    if (goPrevious) previous();
  };

  const generatePhrase = () => {
    if (!account) return;
    const address = account.slice(2);
    const bytes = Buffer.from(address, "hex");

    const words = base2048.encode(bytes);

    return ` My confirmation phrase is: \n${words
      .split(" ")
      .slice(0, 8)
      .join(" ")}`;
  };

  const uploadVideo = async () => {
    if (!file) return;
    if (videoUri) setVideoUri("");

    advance();

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      const uri = await videoSanitizer(buffer, () => {}, mirrored, duration);
      if (!uri) throw new Error("Could not sanitize video");
      setVideoUri(uri);
    } catch (err) {
      console.error("There was an error parsing your video, please try again");

      setCameraEnabled(true);
      setRecording(false);
      setRecordedVideo([]);
      setVideoUri("");
      setFile(null);
      setMirrored(false);
    }
  };

  const cameraOpen =
    cameraEnabled &&
    recordingMode &&
    cameraPermission &&
    !userMediaError &&
    !videoUri;

  return (
    <div className="flex flex-col items-center">
      <span>Are you ready to speak?</span>
      <span>
        You must be in a quiet room, with a working microphone and be able to
        read from your screen. If you are unable to comply, then an alternative
        process is available.
      </span>
      <div className="flex">
        <button
          className="border"
          onClick={() => {
            setRecordingMode("speaking");
            setCameraEnabled(true);
          }}
        >
          <img src={SpeakerImage} />
          <span>I am able to identify my account using my voice and sight</span>
        </button>
        <button
          className="border"
          onClick={() => {
            setRecordingMode("visual");
            setCameraEnabled(true);
          }}
        >
          <img src={SignImage} />
          <span>I would prefer to use a visual method</span>
        </button>
      </div>

      <span>Confirmation phrase: {generatePhrase()}</span>

      {cameraOpen && (
        <div className="relative flex justify-center">
          <ReactWebcam
            style={{ width: "100%", display: "block" }}
            ref={setCamera}
            audio
            // mirrored={this.state.mirrored}
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
          <div className="absolute bottom-4 grid grid-cols-3 gap-2">
            <i className="animate-ping" />
            <div
              className={cn("buttons-camera-container", {
                "video-mirrored": mirrored,
              })}
            >
              {!recording ? (
                <>
                  <CameraButton onClick={handleStartCaptureClick}>
                    RECORD
                  </CameraButton>
                  <CameraButton onClick={mirrorVideo}>MIRROR</CameraButton>
                  {devices.length > 1 && (IS_IOS || IS_ANDROID) && (
                    <CameraButton onClick={switchCamera}>SWITCH</CameraButton>
                  )}
                  <CameraButton
                    onClick={fullscreen ? exitFullscreen : toggleFullscreen}
                  >
                    FULLSCREEN
                  </CameraButton>
                </>
              ) : (
                <CameraButton onClick={handleStopCaptureClick}>
                  STOP RECORD
                </CameraButton>
              )}
            </div>
          </div>
        </div>
      )}

      <Uploader
        className="w-full flex justify-center p-2 border-dashed border-2 border-sky-500 rounded"
        type="video"
        onDrop={async (received) => {
          const file = received[0];
          const blob = new Blob([file], { type: file.type });
          const videoURL = URL.createObjectURL(blob);

          const duration = await getBlobDuration(blob);
          if (duration > 60 * 2) return console.error("Video is too long");

          const video = document.createElement("video");
          video.crossOrigin = "anonymous";
          video.src = videoURL;
          video.preload = "auto";

          video.addEventListener("loadeddata", () => {
            if (
              video.videoWidth < MIN_DIMS.width ||
              video.videoHeight < MIN_DIMS.height
            )
              return console.error("Video dimensions are too small");

            setFile(blob);
            setRecording(false);
            setCameraEnabled(false);
            setVideoUri(videoURL);
            setDuration(duration);
          });
        }}
      >
        <p>Drag 'n drop some files here, or click to select files</p>
      </Uploader>

      {videoUri && <video src={videoUri} controls />}

      <div className="m-4 grid grid-cols-2 gap-2">
        <Button onClick={previous}>Previous</Button>
        <Button onClick={advance}>Advance</Button>
      </div>
    </div>
  );
};

export default Video;

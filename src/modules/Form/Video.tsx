import useFullscreen from "hooks/useFullscreen";
import React, { useRef, useState } from "react";
import useUserMedia from "hooks/useUserMedia";
import getBlobDuration from "get-blob-duration";
import useWeb3 from "hooks/useWeb3";
import { base2048 } from "utils/misc";
import { IS_ANDROID, IS_IOS } from "constants/media";
import { useFormContext } from "./context";
import ReactWebcam from "react-webcam";
import cn from "classnames";
import Button from "components/Button";
import Uploader from "components/Uploader";
import Webcam from "components/Webcam";

import SpeakerImage from "assets/images/speaker.png";
import SignImage from "assets/images/sign.png";

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
  const { account } = useWeb3();
  const { videoUriState, previous, advance } = useFormContext();
  const [videoUri, setVideoUri] = videoUriState;

  const fullscreenRef = useRef(null);
  const { setFullscreen, toggleFullscreen } = useFullscreen(fullscreenRef);

  const { devices, setFacingMode } = useUserMedia();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<BlobPart[]>([]);
  const [recordingMode, setRecordingMode] = useState("");
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
      setFullscreen(false);
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

  const switchCamera = () => {
    if (IS_IOS || IS_ANDROID)
      setFacingMode((fm) => (fm === "environment" ? "user" : "environment"));
  };

  // const goBack = () => {
  //   const goPrevious = recordingMode === "";

  //   setRecording(false);
  //   setCameraEnabled(false);
  //   setVideoUri("");
  //   setRecordedVideo([]);
  //   setFile(null);
  //   setRecordingMode("");

  //   if (goPrevious) previous();
  // };

  const generatePhrase = () => {
    if (!account) return;
    const address = account.slice(2);
    const words = base2048.encode(Buffer.from(address, "hex"));
    return words.split(" ").slice(0, 8).join(" ");
  };

  // const uploadVideo = async () => {
  //   if (!file) return;
  //   if (videoUri) setVideoUri("");

  //   advance();

  //   const buffer = Buffer.from(await file.arrayBuffer());

  //   try {
  //     const uri = await videoSanitizer(buffer, () => {}, mirrored, duration);
  //     if (!uri) throw new Error("Could not sanitize video");
  //     setVideoUri(uri);
  //   } catch (err) {
  //     console.error("There was an error parsing your video, please try again");

  //     setCameraEnabled(true);
  //     setRecording(false);
  //     setRecordedVideo([]);
  //     setVideoUri("");
  //     setFile(null);
  //     setMirrored(false);
  //   }
  // };

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
            <i className="animate-ping" />
            <div
              className={cn("buttons-camera-container", {
                "video-mirrored": mirrored,
              })}
            >
              {recording ? (
                <CameraButton onClick={handleStopCaptureClick}>
                  STOP RECORD
                </CameraButton>
              ) : (
                <>
                  <CameraButton onClick={handleStartCaptureClick}>
                    RECORD
                  </CameraButton>
                  <CameraButton onClick={() => setMirrored((m) => !m)}>
                    MIRROR
                  </CameraButton>
                  {devices.length > 1 && (IS_IOS || IS_ANDROID) && (
                    <CameraButton onClick={switchCamera}>SWITCH</CameraButton>
                  )}
                  <CameraButton onClick={toggleFullscreen}>
                    FULLSCREEN
                  </CameraButton>
                </>
              )}
            </div>
          </div>
        </Webcam>

        <Uploader
          className="w-full flex flex-col justify-center p-2 border-dashed border-2 border-sky-500 rounded"
          type="video"
          onDrop={async (received) => {
            const file = received[0];
            const blob = new Blob([file], { type: file.type });
            const uri = URL.createObjectURL(blob);

            const duration = await getBlobDuration(blob);
            if (duration > 60 * 2) return console.error("Video is too long");

            const video = document.createElement("video");
            video.crossOrigin = "anonymous";
            video.src = uri;
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
              setVideoUri(uri);
              setDuration(duration);
            });
          }}
        >
          <span className="text-3xl font-bold">Or upload an image</span>
          <p>Drag 'n drop some files here, or click to select files</p>
        </Uploader>
      </div>

      {videoUri && <video src={videoUri} controls />}

      <div className="m-4 grid grid-cols-2 gap-2">
        <Button onClick={previous}>Previous</Button>
        <Button onClick={advance}>Advance</Button>
      </div>
    </div>
  );
};

export default Video;

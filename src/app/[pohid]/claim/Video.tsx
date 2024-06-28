import getBlobDuration from "get-blob-duration";
import React, { useRef, useState } from "react";
import ReactWebcam from "react-webcam";
import Uploader from "components/Uploader";
import Webcam from "components/Webcam";
import { IS_IOS, OS } from "utils/media";
import useFullscreen from "hooks/useFullscreen";
import { useAccount } from "wagmi";
import { ObservableObject } from "@legendapp/state";
import { MediaState } from "./Form";
import CameraIcon from "icons/CameraMajor.svg";
import ResetIcon from "icons/ResetMinor.svg";
import UploadIcon from "icons/upload.svg";

const MIN_DIMS = { width: 352, height: 352 };

interface PhotoProps {
  advance: () => void;
  video$: ObservableObject<MediaState["video"]>;
  isRenewal: boolean;
}

function VideoStep({ advance, video$, isRenewal }: PhotoProps) {
  const video = video$.use();

  const { address } = useAccount();

  const fullscreenRef = useRef(null);
  const { isFullscreen, setFullscreen, toggleFullscreen } =
    useFullscreen(fullscreenRef);

  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState<ReactWebcam | null>(null);
  const [recording, setRecording] = useState(false);

  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = () => {
    if (!camera || !camera.stream) return;
    const mediaRecorder = new MediaRecorder(camera.stream, {
      mimeType: IS_IOS ? "video/mp4" : "video/webm",
    });

    mediaRecorder.ondataavailable = async ({ data }) => {
      const newlyRecorded = ([] as BlobPart[]).concat(data);
      const blob = new Blob(newlyRecorded, {
        type: `${IS_IOS ? "video/mp4" : "video/webm"};codecs=h264`,
      });
      video$.set({ content: blob, uri: URL.createObjectURL(blob) });
      setShowCamera(false);
    };

    mediaRecorder.onstop = async () => {
      setFullscreen(false);
      setRecording(false);
    };

    mediaRecorder.start();

    setRecorder(mediaRecorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if (!recorder || !recording) return;
    recorder.stop();
  };

  const retakeVideo = () => {
    setShowCamera(false);
    setRecording(false);
    video$.delete();
  };

  const isMac = OS.name?.includes("Mac");
  const phrase = 
    isRenewal
    ? "I certify I am a real human and I reapply to keep being part of this registry"
    : "I certify that I am a real human and that I am not already registered in this registry";

  const secondaryPhrase = 
    isMac
    ? "For MAC computers, momentarily, we recommend recording on a different media and upload afterwards." 
    : "The phrase will also appear on screen when you start recording."
  ;
  

  return (
    <>
      <span className="w-full my-4 flex flex-col text-2xl font-semibold">
        Video
        <div className="divider mt-4 w-2/3" />
      </span>

      <span className="flex flex-col text-center my-8 mx-12">
        <span>
          You must record yourself holding a sign with your wallet address
        </span>
        <strong className="my-2">{address}</strong>
        <span>and say the phrase</span>
        <span className="my-2">
          <code className="text-theme">"</code>
          <strong>
            {phrase}
          </strong>
          <code className="text-theme">"</code>
        </span>
      </span>

      {showCamera && (
        <span className="text-center mb-4">
          {secondaryPhrase}
        </span>
      )}

      {!showCamera && !video && (
        <div className="relative w-full mt-12 bordered grid grid-cols-2">
          <Uploader
            className="h-full flex items-center justify-center p-2 outline-dotted outline-white bg-white rounded"
            type="video"
            onDrop={async (received) => {
              const file = received[0];
              const blob = new Blob([file], { type: file.type });
              const uri = URL.createObjectURL(blob);

              const duration = await getBlobDuration(blob);
              if (duration > 60 * 2) return console.error("Video is too long");

              const vid = document.createElement("video");
              vid.crossOrigin = "anonymous";
              vid.src = uri;
              vid.preload = "auto";

              vid.addEventListener("loadeddata", async () => {
                if (
                  vid.videoWidth < MIN_DIMS.width ||
                  vid.videoHeight < MIN_DIMS.height
                )
                  return console.error("Video dimensions are too small");

                setRecording(false);
                video$.set({ uri, content: blob });
              });
            }}
          >
            <div className="mr-4 bg-theme w-12 h-12 rounded-full flex items-center justify-center">
              <UploadIcon className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium">Upload video</span>
          </Uploader>

          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-1 border-2 border-slate-200 bg-white rounded-full text-theme text-xs font-semibold">
            OR
          </span>

          <button
            className="flex items-center justify-center p-2 font-medium text-lg text-white"
            onClick={() => setShowCamera(true)}
          >
            <div className="flex flex-col">
              <span>Record with</span>
              <span>camera</span>
            </div>
            <CameraIcon className="h-12 ml-4 fill-white" />
          </button>
        </div>
      )}

      {showCamera && !isMac && (
        <div tabIndex={0} ref={fullscreenRef}>
          <Webcam
            isVideo
            overlay
            recording={recording}
            action={recording ? stopRecording : startRecording}
            fullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            loadCamera={setCamera}
          />
        </div>
      )}

      {!!video && (
        <div className="flex flex-col items-center">
          <video src={video.uri} controls />
          <button className="btn-main mt-4" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {(showCamera || !!video) && (
        <button
          className="centered mt-4 text-theme font-semibold text-lg uppercase"
          onClick={() => retakeVideo()}
        >
          <ResetIcon className="w-6 h-6 mr-2 fill-theme" />
          {showCamera ? "Return" : "Retake"}
        </button>
      )}
    </>
  );
}

export default VideoStep;

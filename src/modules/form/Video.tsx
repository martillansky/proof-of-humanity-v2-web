import getBlobDuration from "get-blob-duration";
import React, { useRef, useState } from "react";
import ReactWebcam from "react-webcam";
import CameraIcon from "assets/svg/CameraMajor.svg";
import ResetIcon from "assets/svg/ResetMinor.svg";
import UploadIcon from "assets/svg/UploadMajor.svg";
import Uploader from "components/Uploader";
import Video from "components/Video";
import Webcam from "components/Webcam";
import { IS_IOS } from "constants/media";
import useFullscreen from "hooks/useFullscreen";
import useWeb3 from "hooks/useWeb3";
import { useFormContext } from "./context";
import useFormNavigate from "./useFormNavigate";

const MIN_DIMS = { width: 352, height: 352 };

const VideoStep: React.FC = () => {
  const { account } = useWeb3();
  const nav = useFormNavigate();
  const {
    state: { video },
    dispatch,
  } = useFormContext();

  const fullscreenRef = useRef(null);
  const { isFullscreen, setFullscreen, toggleFullscreen } =
    useFullscreen(fullscreenRef);

  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState<ReactWebcam | null>(null);
  const [recording, setRecording] = useState(false);

  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = () => {
    console.log(recorder, recording);
    if (!camera || !camera.stream) return;
    const mediaRecorder = new MediaRecorder(camera.stream, {
      mimeType: IS_IOS ? "video/mp4" : "video/webm",
    });

    mediaRecorder.ondataavailable = async ({ data }) => {
      const newlyRecorded = ([] as BlobPart[]).concat(data);
      const blob = new Blob(newlyRecorded, {
        type: `${IS_IOS ? "video/mp4" : "video/webm"};codecs=h264`,
      });

      dispatch({
        type: "VIDEO",
        payload: {
          content: await blob.arrayBuffer(),
          uri: URL.createObjectURL(blob),
        },
      });
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
    dispatch({ type: "DELETE_VIDEO" });
  };

  return (
    <>
      <span className="w-full my-4 flex flex-col text-2xl font-semibold">
        Video
        <div className="divider mt-4 w-2/3" />
      </span>

      <span className="txt text-center my-8 mx-12">
        You must record yourself holding a sign with your address{" "}
        <strong>{account}</strong> and say the phrase{" "}
        <span className="text-theme">"</span>
        <strong>
          I certify that I am a real human and that I am not already registered
          in this registry
        </strong>
        <span className="text-theme">"</span>
      </span>

      {showCamera && (
        <span className="txt text-center mb-4">
          The phrase will also appear on screen when you start recording.
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

              console.log({ uri });

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
                dispatch({
                  type: "VIDEO",
                  payload: { uri, content: await blob.arrayBuffer() },
                });
              });
            }}
          >
            <UploadIcon className="w-12 h-12 mr-4 fill-theme" />
            <span className="text-lg font-semibold">Upload video</span>
          </Uploader>

          <span
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
                         p-1
                         border-2 border-slate-200
                         bg-white rounded-full 
                         text-theme text-xs font-semibold"
          >
            OR
          </span>

          <button
            className="flex items-center justify-center p-2 font-semibold text-lg text-white"
            onClick={() => setShowCamera(true)}
          >
            <div className="flex flex-col">
              <span>Record with</span>
              <span>camera</span>
            </div>
            <CameraIcon className="w-12 h-12 ml-4 fill-white" />
          </button>
        </div>
      )}

      {showCamera && (
        <div tabIndex={0} ref={fullscreenRef}>
          <Webcam
            video
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
          <Video uri={video.uri} />
          <button className="btn-main mt-4" onClick={nav.toReview}>
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
};

export default VideoStep;

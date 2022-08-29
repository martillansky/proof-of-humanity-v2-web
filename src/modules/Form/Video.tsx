import useFullscreen from "hooks/useFullscreen";
import React, { useRef, useState } from "react";
import getBlobDuration from "get-blob-duration";
import useWeb3 from "hooks/useWeb3";
import { IS_IOS } from "constants/media";
import { useFormContext } from "./context";
import ReactWebcam from "react-webcam";
import Uploader from "components/Uploader";
import Webcam from "components/Webcam";
import { phraseFromAddress } from "utils/address";
import { videoSanitizer } from "utils/media";
import cn from "classnames";

import UploadIcon from "assets/svg/UploadMajor.svg";
import CameraIcon from "assets/svg/CameraMajor.svg";
import ResetIcon from "assets/svg/ResetMinor.svg";
import Video from "components/Video";

const MIN_DIMS = { width: 352, height: 352 };

const VideoStep: React.FC = () => {
  const { account } = useWeb3();
  const {
    advance,
    state: { video },
    dispatch,
  } = useFormContext();
  // const [video, setVideo] = useState<{
  //   uri: string;
  //   buffer: Buffer;
  // } | null>(null);

  const fullscreenRef = useRef(null);
  const { isFullscreen, setFullscreen, toggleFullscreen } =
    useFullscreen(fullscreenRef);

  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState<ReactWebcam | null>(null);
  const [recording, setRecording] = useState(false);
  // const [recordedVideo, setRecordedVideo] = useState<BlobPart[]>([]);
  const [recordingMode, setRecordingMode] = useState<"phrase" | "sign" | null>(
    null
  );
  // const [duration, setDuration] = useState(0);
  // const [file, setFile] = useState<Blob | null>(null);

  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = () => {
    console.log(recorder, recording);
    if (!camera || !camera.stream) return;
    const mediaRecorder = new MediaRecorder(camera.stream, {
      mimeType: IS_IOS ? "video/mp4" : "video/webm",
    });

    mediaRecorder.ondataavailable = async ({ data }) => {
      const newlyRecorded = ([] as BlobPart[]).concat(data);
      // setRecordedVideo(newlyRecorded);
      const blob = new Blob(newlyRecorded, {
        type: `${IS_IOS ? "video/mp4" : "video/webm"};codecs=h264`,
      });
      // setDuration(await getBlobDuration(blob));
      // setVideoUri(URL.createObjectURL(blob));
      // setFile(blob);

      // const vid = await videoSanitizer(Buffer.from(await data.arrayBuffer()));

      // const uri = URL.createObjectURL(
      //   new Blob([vid], {
      //     type: `${IS_IOS ? "video/mp4" : "video/webm"};codecs=h264`,
      //   })
      // );

      // console.log({ vid, uri });
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
    // setRecordedVideo([]);
    // setFile(null);
    setRecordingMode(null);
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
    <>
      <span className="w-full my-4 flex flex-col text-2xl font-semibold">
        Video
        <div className="divider mt-4 w-2/3" />
      </span>

      {!showCamera && !video && (
        <>
          <span className="txt mb-4">
            You must be in a quiet room, with a working microphone and be able
            to read from your screen. You must speak the phrase{" "}
            <span className="text-[#ff9966]">"</span>
            <strong>
              I certify I am a real human and not registered in this registry
            </strong>
            <span className="text-[#ff9966]">"</span> accompanied by one of the
            following:
          </span>

          <div className="flex">
            <div
              className={cn("bg-slate-200 rounded mx-4 w-64 p-1", {
                "gradient background font-semibold": recordingMode === "sign",
              })}
            >
              <button
                className="w-full h-full bg-white rounded-sm hover:bg-slate-100"
                onClick={() => setRecordingMode("sign")}
              >
                Hold a sign with your address
              </button>
            </div>
            <div
              className={cn("bg-slate-200 rounded mx-4 w-64 p-1", {
                "gradient background font-semibold": recordingMode === "phrase",
              })}
            >
              <button
                className="w-full h-full bg-white rounded-sm hover:bg-slate-100"
                onClick={() => setRecordingMode("phrase")}
              >
                Speak a phrase generated from your address
              </button>
            </div>
          </div>
        </>
      )}

      {recordingMode === "phrase" && (
        <span className="txt my-2">
          Confirmation phrase: <strong>{phraseFromAddress(account)}</strong>
        </span>
      )}

      {recordingMode === "sign" && (
        <span className="txt my-2">
          Hold sign with your address: <strong>{account}</strong>
        </span>
      )}

      {recordingMode && !showCamera && !video && (
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

                // const buffer = await videoSanitizer(
                //   Buffer.from(await blob.arrayBuffer())
                // );

                // setFile(blob);
                setRecording(false);
                dispatch({
                  type: "VIDEO",
                  payload: { uri, content: await blob.arrayBuffer() },
                });
                // setVideo({
                //   uri,
                //   buffer: Buffer.from(await blob.arrayBuffer()),
                // });
                // setDuration(duration);
              });
            }}
          >
            <UploadIcon className="w-12 h-12 mr-4 fill-[#ff9966]" />
            <span className="text-lg font-semibold">Upload video</span>
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
          <button className="btn-main mt-4" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {(showCamera || !!video) && (
        <button
          className="centered mt-4 text-[#ff9966] font-semibold text-lg uppercase"
          onClick={() => retakeVideo()}
        >
          <ResetIcon className="w-6 h-6 mr-2 fill-[#ff9966]" />
          {showCamera ? "Return" : "Retake"}
        </button>
      )}
    </>
  );
};

export default VideoStep;

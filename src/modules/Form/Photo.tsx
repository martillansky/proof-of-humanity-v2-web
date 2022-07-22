import Button from "components/Button";
import React, { useRef, useState } from "react";
import { useFormContext } from "./context";
import ReactWebcam from "react-webcam";
import useFullscreen from "hooks/useFullscreen";
import { sanitizeImage } from "utils/media";
import { base64ToUint8Array, randomString } from "utils/misc";
import { uploadToIPFS } from "utils/ipfs";
import useUserMedia from "hooks/useUserMedia";
import Uploader from "components/Uploader";
// import Cropper from "react-easy-crop";
// import type { Area, Point } from "react-easy-crop/types";

import FacialFeaturesImage from "assets/images/facial-features.jpg";
import NotFrontFacingImage from "assets/images/not-front-facing.jpg";
import GlassesImage from "assets/images/glasses.jpg";
import SunglassesImage from "assets/images/sunglasses.jpg";
import HijabImage from "assets/images/hijab.jpg";
import NiqabImage from "assets/images/niqab.jpg";
import BWImage from "assets/images/b&w.jpg";
import MaskImage from "assets/images/mask.jpg";

interface RuleImageProps {
  src: string;
}

const RuleImage: React.FC<RuleImageProps> = ({ src }) => (
  <img className="w-32 h-32 rounded-full" src={src} alt="test image" />
);

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

const Photo: React.FC = () => {
  const { advance, previous, photoUriState } = useFormContext();
  const {
    cameraPermission,
    userMediaError,
    currentCamera,
    facingMode,
    onUserMedia,
    onUserMediaError,
    switchCamera,
  } = useUserMedia();
  const [photoUri, setPhotoUri] = photoUriState;
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [camera, setCamera] = useState<ReactWebcam | null>(null);
  const [loading, setLoading] = useState(false);
  const { fullscreen, toggleFullscreen, exitFullscreen } = useFullscreen();
  const [photo, setPhoto] = useState<ArrayBuffer | null>(null);
  // const [croppedPhoto, setCroppedPhoto] = useState<Uint8Array | null>(null);
  const dndRef = useRef<HTMLInputElement>(null);

  const [fileNames, setFileNames] = useState<string[]>([]);

  // const [rotation, setRotation] = useState(0);
  // const [zoom, setZoom] = useState(0);
  // const [maxZoom, setMaxZoom] = useState(3);
  // const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  // const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const cameraOpen = cameraEnabled && cameraPermission && !userMediaError;
  // const toBeCropped = photo && photoUri && !croppedPhoto;

  const takePhoto = () => {
    if (fullscreen) exitFullscreen();
    if (!camera) return;

    const photo = camera.getScreenshot();
    if (!photo) return;

    const buffer = base64ToUint8Array(photo.split(",")[1]);

    setPhoto(buffer);
    setPhotoUri(URL.createObjectURL(new Blob([buffer], { type: "buffer" })));
    setCameraEnabled(false);
  };

  const retakePhoto = () => {
    setLoading(false);
    setPhoto(new ArrayBuffer(0));
    setPhotoUri("");

    // this.setState({
    //   loading: false,
    //   photo: null,
    //   image: "",
    //   cameraEnabled: true,
    //   croppedImage: null,
    //   croppedAreaPixels: null,
    //   zoom: 1,
    //   crop: { x: 0, y: 0 },
    //   rotation: 0,
    // });
  };

  const uploadPhoto = async (photo: Uint8Array) => {
    try {
      setLoading(true);
      const sanitized = await sanitizeImage(Buffer.from(photo));
      const filename = randomString(46);
      const fileUri = await uploadToIPFS(`${filename}.jpg`, sanitized);
      setLoading(false);
      setPhotoUri(fileUri);
    } catch (err) {
      // if (err === "image_grayscale") message.error(this.props.i18n.t("submit_profile_image_grayscale"), 5);
      // else message.error("There was an error parsing your image, please try again", 5);
      // retakePhoto();
    }
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
        <RuleImage src={FacialFeaturesImage} />
        <RuleImage src={NotFrontFacingImage} />
        <RuleImage src={GlassesImage} />
        <RuleImage src={SunglassesImage} />
        <RuleImage src={HijabImage} />
        <RuleImage src={NiqabImage} />
        <RuleImage src={BWImage} />
        <RuleImage src={MaskImage} />
      </div>

      {/* {!toBeCropped && ( */}

      <span className="text-3xl font-bold my-8">Take photo with camera</span>
      {cameraOpen && (
        <div className="relative flex justify-center">
          <ReactWebcam
            style={{ width: "100%", display: "block" }}
            ref={setCamera}
            mirrored={false}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            forceScreenshotSourceSize
            videoConstraints={{
              width: { min: 640, ideal: 1920 },
              height: { min: 480, ideal: 1080 },
              facingMode,
              // deviceId: IS_MOBILE ? undefined : currentCamera,
            }}
            onCanPlayThrough={() => false}
            onClick={(event) => event.preventDefault()}
            onUserMedia={onUserMedia}
            onUserMediaError={onUserMediaError}
          />
          <div className="absolute bottom-4 grid grid-cols-3 gap-2">
            <CameraButton onClick={switchCamera}>SWITCH</CameraButton>
            <CameraButton onClick={takePhoto}>TAKE</CameraButton>
            <CameraButton
              onClick={fullscreen ? exitFullscreen : toggleFullscreen}
            >
              FULLSCREEN
            </CameraButton>
          </div>
        </div>
      )}

      <span className="text-3xl font-bold my-8">Or upload an image</span>
      <Uploader
        className="w-full flex justify-center p-2 border-dashed border-2 border-sky-500 rounded"
        type="image"
        onDrop={async (received) => {
          const file = received[0];
          const blob = new Blob([file], { type: file.type });
          setPhoto(await blob.arrayBuffer());
          setPhotoUri(URL.createObjectURL(blob));
          setCameraEnabled(false);
        }}
      >
        <p>Drag 'n drop some files here, or click to select files</p>
      </Uploader>

      {/* )} */}

      {/* {toBeCropped && (
      <div className="flex flex-col">
        <span className="text-3xl font-bold my-8">Crop your photo</span>
        <span>Make sure your face is centered and not rotated.</span>

        <div className="relative w-full h-64 bg-black">
          <Cropper
            // image={photoUri}
            image={
              "https://imgs.search.brave.com/2fT_gZMtfemrg_p2J7SHbaMNc-xtTMuet8U3RFoZegQ/rs:fit:1000:562:1/g:ce/aHR0cHM6Ly9wb2xp/dGljc2FuZHdhci5j/b20vdXBsb2Fkcy80/ZDlhZWUxZWIyYjQy/ZDVhYzUzYTI4OGNl/OTcwNWIxMzAzZTUy/NjRlMTAwMHg1NjIx/Ny5qcGVn"
            }
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            maxZoom={maxZoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={(croppedArea) => {
              if (croppedArea.width > 256 && croppedArea.height > 256)
                setCroppedArea(croppedArea);
              else console.error("Size error");
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

        <div className="flex flex-col">
          <span>Rotation</span>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={rotation}
            onChange={(event) => setRotation(parseInt(event.target.value))}
          />
        </div>
      </div>
      )} */}

      <img className="border" src={photoUri} />

      <div className="m-4 grid grid-cols-2 gap-2">
        <Button onClick={previous}>Previous</Button>
        <Button onClick={advance}>Advance</Button>
      </div>
    </>
  );
};

export default Photo;

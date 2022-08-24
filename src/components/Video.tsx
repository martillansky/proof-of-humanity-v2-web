import React from "react";
import Popup from "reactjs-popup";

interface VideoProps {
  className?: string;
  uri: string;
  rounded?: boolean;
  previewed?: boolean;
}

const Video: React.FC<VideoProps> = ({ className, uri, previewed }) =>
  previewed ? (
    <Popup modal trigger={<video className={className} src={uri} />}>
      {(close) => (
        <>
          <div className="backdrop" onClick={close} />
          <video
            className="fixed absolute-centered max-h-screen rounded z-30"
            src={uri}
            controls
            onEnded={close}
          />
        </>
      )}
    </Popup>
  ) : (
    <video className={className} src={uri} controls />
  );

export default Video;

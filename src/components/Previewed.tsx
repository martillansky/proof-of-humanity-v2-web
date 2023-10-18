"use client";

import Popup from "reactjs-popup";

interface ImageProps {
  uri: string;
  isVideo?: boolean;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
}

export default function Previewed({
  uri,
  trigger,
  isVideo = false,
}: ImageProps) {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <>
          <div className="backdrop" onClick={close}>
            {!isVideo && (
              <div
                className="relative min-h-screen w-full bg-auto bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${uri})` }}
              />
            )}
          </div>
          {isVideo && (
            <video
              className="fixed absolute-centered max-h-screen rounded z-30"
              src={uri}
              controls
              onEnded={close}
            />
          )}
        </>
      )}
    </Popup>
  );
}

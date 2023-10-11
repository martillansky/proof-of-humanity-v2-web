import { RefObject, useEffect, useState } from "react";
import screenfull from "screenfull";
import { off, on } from "utils/events";

export interface FullScreenOptions {
  video?: RefObject<
    HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitExitFullscreen?: () => void;
    }
  >;
  onClose?: (error?: Error) => void;
}

const useFullscreen = (
  ref: RefObject<Element>,
  options: FullScreenOptions = {}
) => {
  const { video, onClose = () => {} } = options;
  const [isFullscreen, setIsFullscreen] = useState(
    !!((document as any).webkitIsFullscreen || (document as any).mozFullScreen)
  );

  useEffect(() => {
    if (!isFullscreen) return;
    if (!ref.current) return;

    const onWebkitEndFullscreen = () => {
      if (video?.current)
        off(video.current, "webkitendfullscreen", onWebkitEndFullscreen);
      onClose();
    };

    const onChange = () => {
      if (screenfull.isEnabled) {
        setIsFullscreen(screenfull.isFullscreen);
        if (!screenfull.isFullscreen) onClose();
      }
    };

    if (screenfull.isEnabled) {
      try {
        screenfull.request(ref.current);
        setIsFullscreen(true);
      } catch (error: any) {
        onClose(error);
        setIsFullscreen(false);
      }
      screenfull.on("change", onChange);
    } else if (video && video.current && video.current.webkitEnterFullscreen) {
      video.current.webkitEnterFullscreen();
      on(video.current, "webkitendfullscreen", onWebkitEndFullscreen);
      setIsFullscreen(true);
    } else {
      onClose();
      setIsFullscreen(false);
    }

    return () => {
      setIsFullscreen(false);
      if (screenfull.isEnabled) {
        try {
          screenfull.off("change", onChange);
          screenfull.exit();
        } catch {}
      } else if (video && video.current && video.current.webkitExitFullscreen) {
        off(video.current, "webkitendfullscreen", onWebkitEndFullscreen);
        video.current.webkitExitFullscreen();
      }
    };
  }, [isFullscreen, video, ref]);

  return {
    isFullscreen,
    setFullscreen: setIsFullscreen,
    toggleFullscreen: () => setIsFullscreen((o) => !o),
  };
};

export default useFullscreen;

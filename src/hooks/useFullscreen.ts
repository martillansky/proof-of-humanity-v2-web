import { useState } from "react";

const useFullscreen = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    // webkitRequest();
    setFullscreen(true);
  };

  const exitFullscreen = () => {
    // webkitExitFullscreen();
    setFullscreen(false);
  };

  return { fullscreen, toggleFullscreen, exitFullscreen };
};

export default useFullscreen;

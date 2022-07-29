import React from "react";

interface BackdropProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ onClose, children }) => (
  <div
    className="fixed
               top-0 left-0 h-screen z-10 w-full
               flex justify-center items-center
               bg-slate-800/30 backdrop-blur"
    onClick={onClose}
  >
    {children}
  </div>
);

export default Backdrop;

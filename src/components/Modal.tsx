import React from "react";
import Popup from "reactjs-popup";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element) | undefined;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ trigger, children }) => (
  <Popup modal trigger={trigger} closeOnEscape={false}>
    {(close) => (
      <>
        <div
          className="fixed
                     top-0 left-0 h-screen z-10 w-full
                     bg-slate-400/50"
          onClick={close}
        />
        <div
          className="fixed
                     p-4
                     top-1/4 left-1/4 w-1/2 max-h-1/2 z-30
                     bg-white
                     rounded"
        >
          {children}
        </div>
      </>
    )}
  </Popup>
);

export default Modal;

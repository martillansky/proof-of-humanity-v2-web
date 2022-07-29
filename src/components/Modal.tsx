import React from "react";
import Popup from "reactjs-popup";
import Backdrop from "./Backdrop";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ trigger, children, open, onClose }) => (
  <Popup modal trigger={trigger} closeOnEscape={false} open={open}>
    {(close) => (
      <>
        <Backdrop
          onClose={() => {
            close();
            if (onClose) onClose();
          }}
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

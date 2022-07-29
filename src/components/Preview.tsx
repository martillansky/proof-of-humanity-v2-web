import React from "react";
import Popup from "reactjs-popup";
import Backdrop from "./Backdrop";

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element) | undefined;
  children: React.ReactNode;
}

const Preview: React.FC<PreviewProps> = ({ trigger, children }) => (
  <Popup trigger={trigger} modal nested>
    {(close) => <Backdrop onClose={close}>{children}</Backdrop>}
  </Popup>
);

export default Preview;

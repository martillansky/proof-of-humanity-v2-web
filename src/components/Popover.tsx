import Popup from "reactjs-popup";

interface PopoverInterface {
  trigger: JSX.Element;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverInterface> = ({ trigger, children }) => (
  <Popup trigger={trigger} position="bottom right" arrow={false}>
    <div className="w-48 mt-1 bg-white rounded shadow-md shadow-shade-500/50">
      {children}
    </div>
  </Popup>
);

export default Popover;

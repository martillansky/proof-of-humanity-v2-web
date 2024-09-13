import Popover from "components/Popover";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => (
  <Popover
    trigger={
      <button className="w-64 p-2 border text-primaryText rounded border-stroke bg-whiteBackground">{title}</button>
    }
  >
    <div className="flex flex-col bg-whiteBackground text-primaryText">{children}</div>
  </Popover>
);

export default Dropdown;

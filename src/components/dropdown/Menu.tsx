import Popover from "components/Popover";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => (
  <Popover
    trigger={
      <button className="w-64 mx-2 p-2 border rounded bg-white">{title}</button>
    }
  >
    <div className="flex flex-col">{children}</div>
  </Popover>
);

export default Dropdown;

import cn from "classnames";

interface DropdownItemProps {
  icon?: React.ReactNode;
  selected: boolean;
  name: string;
  onSelect: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  selected,
  name,
  onSelect,
}) => (
  <span
    className={cn(
      "p-2 text-md cursor-pointer rounded flex items-center",
      selected ? "bg-whiteBackground" : "hover:bg-primaryBackground"
    )}
    onClick={onSelect}
  >
    {icon}
    {name}
  </span>
);

export default DropdownItem;

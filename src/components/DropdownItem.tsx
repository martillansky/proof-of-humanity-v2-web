import cn from "classnames";
import React from "react";

interface DropdownItemProps {
  selected: boolean;
  name: string;
  onSelect: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  selected,
  name,
  onSelect,
}) => (
  <span className={cn({ "bg-orange-100": selected })} onClick={onSelect}>
    {name}
  </span>
);

export default DropdownItem;

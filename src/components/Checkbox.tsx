import React from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  handler: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, checked, handler }) => (
  <input id={id} type="checkbox" checked={checked} onChange={handler} />
);

export default Checkbox;

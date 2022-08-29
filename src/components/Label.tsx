import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => (
  <legend className="mt-8 mb-2 text-[#ff9966] text-sm font-semibold uppercase">
    {children}
  </legend>
);

export default Label;

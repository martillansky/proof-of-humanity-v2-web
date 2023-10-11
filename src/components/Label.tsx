import cn from "classnames";
import React from "react";

interface LabelProps {
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, className }) => (
  <legend
    className={cn("mt-8 mb-2 text-theme font-medium uppercase", className)}
  >
    {children}
  </legend>
);

export default Label;

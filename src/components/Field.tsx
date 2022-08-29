import cn from "classnames";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import Label from "./Label";

type FieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    textarea?: boolean;
    label?: string;
  };

const Field: React.FC<FieldProps> = ({
  label,
  textarea = false,
  className,
  ...props
}) => (
  <div className="w-full flex flex-col">
    {label && <Label>{label}</Label>}
    <div className="w-full bordered">
      {textarea ? (
        <textarea
          className={cn(
            "block w-full px-4 py-2 border-none background rounded-sm transition ease-in-out font-semibold",
            "focus:ring-0",
            className
          )}
          {...props}
        />
      ) : (
        <input
          className={cn(
            "block w-full px-4 py-2 border-none background rounded-sm font-semibold",
            "focus:ring-0 focus:border-2 focus:border-blue-500",
            className
          )}
          {...props}
        />
      )}
    </div>
  </div>
);

export default Field;

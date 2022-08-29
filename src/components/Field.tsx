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
}) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div className="w-full flex flex-col">
      {label && <Label>{label}</Label>}
      <div
        className={cn("w-full bordered", {
          "ring-2 ring-offset-2 ring-[#ff9966]/60": focused,
        })}
      >
        {textarea ? (
          <textarea
            className={cn(
              "block w-full px-4 py-2 border-none bg-white bg-opacity-90 bg-blend-lighten rounded-sm transition ease-in-out font-semibold",
              "focus:ring-0",
              className
            )}
            {...props}
          />
        ) : (
          <input
            className={cn(
              "block w-full px-4 py-2 border-none bg-white bg-opacity-90 bg-blend-overlay rounded-sm font-semibold",
              "focus-visible:outline-none",
              className
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        )}
      </div>
    </div>
  );
};

export default Field;

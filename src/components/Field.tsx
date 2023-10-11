import cn from "classnames";
import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import Label from "./Label";

type FieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    textarea?: boolean;
    label?: string;
  };

function Field({ label, textarea = false, className, ...props }: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full flex flex-col">
      {label && <Label>{label}</Label>}
      <div
        className={cn("w-full bordered", {
          "ring-2 ring-offset-2 ring-theme/60": focused,
        })}
      >
        {textarea ? (
          <textarea
            className={cn(
              "block w-full px-4 py-2 border-none bg-white bg-opacity-90 bg-blend-lighten rounded-sm transition ease-in-out font-medium",
              "focus:ring-0",
              className
            )}
            {...props}
          />
        ) : (
          <input
            className={cn(
              "block w-full px-4 py-2 border-none bg-white bg-opacity-90 bg-blend-overlay rounded-sm font-medium",
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
}

export default Field;

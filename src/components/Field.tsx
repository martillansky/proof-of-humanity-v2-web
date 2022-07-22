import React from "react";

type FieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    textarea?: boolean;
    label?: string;
  };

const Field: React.FC<FieldProps> = ({ label, textarea = false, ...props }) => (
  <div className="w-full flex flex-col">
    {label && <span className="mt-4 mb-2 text-lg">{label}</span>}
    {textarea ? (
      <textarea className="p-2 border rounded" {...props} />
    ) : (
      <input className="p-2 border rounded" {...props} />
    )}
  </div>
);

export default Field;

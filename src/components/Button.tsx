import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    className="p-2 bg-blue-500 rounded-full text-white font-bold"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;

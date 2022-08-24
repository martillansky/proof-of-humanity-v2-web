import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col border rounded shadow">
      <div
        className="p-4 flex justify-between overflow-hidden text--500 font-bold cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        <span className="text-xl">+</span>
      </div>
      {open && children}
    </div>
  );
};

export default Accordion;

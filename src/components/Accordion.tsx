import React, { useState } from "react";
import MinusIcon from "assets/svg/MinusMinor.svg";
import PlusIcon from "assets/svg/PlusMinor.svg";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col text-black">
      <div
        className="p-4 flex justify-between overflow-hidden border bg-white font-bold cursor-pointer shadow rounded-sm"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        {open ? <MinusIcon className="w-6" /> : <PlusIcon className="w-6" />}
      </div>
      {open && children}
    </div>
  );
};

export default Accordion;

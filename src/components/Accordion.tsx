import cn from "classnames";
import React, { useState } from "react";
import MinusIcon from "assets/svg/MinusMinor.svg";
import PlusIcon from "assets/svg/PlusMinor.svg";

interface AccordionProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  className,
  title,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex flex-col text-black", className)}>
      <div
        className="paper p-4 flex justify-between overflow-hidden font-bold cursor-pointer"
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

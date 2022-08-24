import cn from "classnames";
import React, { Fragment } from "react";

interface StepsProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  list: string[];
}

const Steps: React.FC<StepsProps> = ({ current, setCurrent, list }) => (
  <div className="w-full flex items-center cursor-default select-none">
    {list.map((item, i) => (
      <Fragment key={i}>
        <div className="m-1 flex items-center">
          <div
            className={cn(
              "h-6 rounded-full centered text-sm whitespace-nowrap",
              {
                "w-6 border border-slate-200 text-slate-400 font-bold":
                  current < i,
                "px-2 gradient text-white font-bold uppercase": current === i,
                "w-6 gradient text-white font-bold cursor-pointer": current > i,
              }
            )}
            onClick={() => current > i && setCurrent(i)}
          >
            {`${i + 1}${current === i ? `. ${item}` : ""}`}
          </div>
        </div>
        {i !== list.length - 1 && (
          <div
            className={cn(
              "h-px w-full",
              current > i ? "gradient" : "bg-slate-200"
            )}
          />
        )}
      </Fragment>
    ))}
  </div>
);

export default Steps;

import cn from "classnames";
import React, { Fragment } from "react";

interface StepsProps {
  current: number;
  list: string[];
}

const Steps: React.FC<StepsProps> = ({ current, list }) => (
  <div className="w-full flex items-center">
    {list.map((item, i) => (
      <Fragment key={i}>
        <div className="m-2 flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center mr-2",
              current === i ? "bg-blue-500 text-white font-bold" : "border"
            )}
          >
            {i + 1}
          </div>
          <span className={cn({})}>{item}</span>
        </div>
        {i !== list.length - 1 && <div className="border-b w-full" />}
      </Fragment>
    ))}
  </div>
);

export default Steps;

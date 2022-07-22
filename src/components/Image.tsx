import cn from "classnames";
import React from "react";
import Preview from "./Preview";

interface ImageProps {
  uri: string;
  rounded?: boolean;
  previewed?: boolean;
}

const Image: React.FC<ImageProps> = ({ uri, rounded, previewed }) => {
  const image = (
    <div
      className={cn(
        "mb-2 flex items-center justify-center h-32 w-32 overflow-hidden mx-auto",
        { "rounded-full": rounded, "cursor-pointer": previewed }
      )}
    >
      <img className="h-min w-min" src={uri} />
    </div>
  );

  if (!previewed) return image;

  return (
    <Preview trigger={image}>
      <img src={uri} />
    </Preview>
  );
};

export default Image;

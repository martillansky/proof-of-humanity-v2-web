import cn from "classnames";
import React from "react";
import Preview from "./Preview";

interface ImageProps {
  className?: string;
  uri: string;
  rounded?: boolean;
  previewed?: boolean;
}

const Image: React.FC<ImageProps> = ({
  className,
  uri,
  rounded,
  previewed,
}) => {
  const image = (
    <div
      className={cn(
        "w-32 h-32 bg-no-repeat bg-cover bg-center rounded-sm",
        { "rounded-full": rounded, "cursor-pointer": previewed },
        className
      )}
      style={{ backgroundImage: `url('${uri}')` }}
    />
  );

  if (!previewed) return image;

  return (
    <Preview trigger={image}>
      <img className="max-h-screen rounded" src={uri} />
    </Preview>
  );
};

export default Image;

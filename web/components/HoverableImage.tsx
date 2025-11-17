import Image, { ImageProps } from "next/image";
import { useRef } from "react";

interface HoverableImageProps extends ImageProps {
  desctiption: string;
}

export default function HoverableImage({
  desctiption,
  ...props
}: HoverableImageProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="overflow-auto absolute top-0 right-0 left-0 bottom-0 bg-background/60 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col p-10">
        <div>{desctiption}</div>
      </div>
      <Image {...props} />
    </div>
  );
}

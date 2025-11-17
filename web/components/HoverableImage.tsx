import Image from "next/image";
import { useRef } from "react";

type HoverableImageProps = {
  src: string;
  desctiption: string;
  title: string;
  width: number;
  height: number;
};

export default function HoverableImage({
  src,
  title,
  desctiption,
  width,
  height,
}: HoverableImageProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="overflow-auto absolute top-0 right-0 left-0 bottom-0 bg-background/60 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col p-10">
        <div>{desctiption}</div>
      </div>
      <Image
        src={src}
        width={width}
        height={height}
        alt={title}
        objectFit="cover"
      />
    </div>
  );
}

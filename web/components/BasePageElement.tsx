import { cn } from "@/lib/utils";
import Image from "next/image";

export type BaseProps = {
  className?: string | undefined;
};

type BaseElementProps = {
  className?: string;
  onClick?: () => void;
  imageSrc: string;
  imageHeight: number;
  imageWidth: number;
  imageAlt: string;
};

export default function BasePageElement({
  onClick,
  className,
  imageSrc,
  imageWidth,
  imageHeight,
  imageAlt,
}: BaseElementProps) {
  return (
    <div onClick={onClick} className={cn("cursor-pointer", className)}>
      <Image
        src={imageSrc}
        width={imageWidth}
        height={imageHeight}
        alt={imageAlt}
        className="transition-transform hover:scale-120"
        objectFit="cover"
      />
    </div>
  );
}

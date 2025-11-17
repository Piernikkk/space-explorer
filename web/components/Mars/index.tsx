import { cn } from "@/lib/utils";
import BasePageElement, { BaseProps } from "../BasePageElement";

export default function Mars({ className }: BaseProps) {
  return (
    <BasePageElement
      imageSrc="/mars.png"
      imageAlt="mars"
      imageHeight={200}
      imageWidth={200}
      className={className}
    />
  );
}

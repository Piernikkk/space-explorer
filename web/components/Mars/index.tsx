"use client";
import BasePageElement, { BaseProps } from "../BasePageElement";
import { useDialogs } from "@/lib/dialogManager";

export default function Mars({ className }: BaseProps) {
  const dialogs = useDialogs();

  return (
    <BasePageElement
      imageSrc="/mars.png"
      imageAlt="mars"
      imageHeight={200}
      imageWidth={200}
      className={className}
      onClick={() => dialogs.show("Mars")}
    />
  );
}

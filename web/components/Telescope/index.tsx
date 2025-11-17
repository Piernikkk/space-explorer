"use client";
import { useDialogs } from "@/lib/dialogManager";
import BasePageElement, { BaseProps } from "../BasePageElement";
import { cn } from "@/lib/utils";

export default function Telescope({ className }: BaseProps) {
  const dialogs = useDialogs();

  return (
    <BasePageElement
      onClick={() => dialogs.show("Telescope")}
      className={cn("cursor-pointer", className)}
      imageSrc="/telescope.png"
      imageAlt="telescope"
      imageHeight={100}
      imageWidth={222}
    />
  );
}

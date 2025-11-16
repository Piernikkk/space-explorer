"use client";
import { useDialogs } from "@/lib/dialogManager";
import Image from "next/image";

export default function SpaceShip() {
  const dialogs = useDialogs();

  return (
    <div onClick={() => dialogs.show("SpaceShipDialog", { astro: ["shuj"] })} className="cursor-pointer">
      <Image
        src={"/iss.png"}
        width={250}
        height={250}
        alt="spaceship"
        className="transition-transform hover:scale-120"
      />
    </div>
  );
}

import Mars from "@/components/Mars";
import SpaceShip from "@/components/Spaceship";
import Telescope from "@/components/Telescope";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="relative z-1 flex min-h-screen min-w-screen flex-col items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link href={"/"}>
          <Button variant={"outline"} size={"icon-lg"}>
            <IconArrowLeft />
          </Button>
        </Link>
      </div>
      <SpaceShip className="absolute top-[40%]" />
      <Telescope className="absolute bottom-0 right-0" />
      <Mars className="absolute bottom-10 left-20" />
    </div>
  );
}

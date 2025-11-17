import SpaceShip from "@/components/Spaceship";
import Telescope from "@/components/Telescope";

export default function MainPage() {
  return (
    <div className="relative z-1 flex min-h-screen min-w-screen flex-col items-center justify-center">
      <SpaceShip className="absolute top-[40%]" />
      <Telescope className="absolute bottom-0 right-0" />
    </div>
  );
}

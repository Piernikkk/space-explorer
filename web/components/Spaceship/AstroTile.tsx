import { TAstro } from "@/lib/api/astros";

export default function AstroTile({ name, craft }: TAstro) {
  return (
    <div className="p-5 px-3 rounded bg-card/70 backdrop-blur-md flex flex-col gap-2">
      <div className="font-bold text-lg">{name}</div>
      <div className="font-semibold">Spaceship: {craft}</div>
    </div>
  );
}

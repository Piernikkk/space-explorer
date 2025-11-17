import { AstrosRes } from "@/lib/providers/types";

export default function AstroTile({
  name,
  craft,
}: AstrosRes["people"][number]) {
  return (
    <div className="p-5 px-3 rounded bg-card/70 backdrop-blur-md flex flex-col gap-2">
      <div className="font-bold text-lg">{name}</div>
      <div className="font-semibold">Spaceship: {craft}</div>
    </div>
  );
}

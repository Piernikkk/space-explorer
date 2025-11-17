import { AstrosRes } from "@/lib/providers/types";
import { components } from "@/types/api";

type SolTileProps = components["schemas"]["SolData"] & {
  sol: string;
};

export default function SolTile({
  Northern_season,
  Southern_season,
  AT,
  sol,
  PRE,
  HWS,
}: SolTileProps) {
  return (
    <div className="p-5 px-3 rounded bg-card/70 backdrop-blur-md flex flex-col gap-2">
      <div className="font-bold text-xl">Sol: {sol}</div>
      <div className="flex gap-2 pt-1">
        <div className="font-bold">Temperature:</div>
        <div>Min: {AT?.mn}°F</div>
        <div>Max: {AT?.mx}°F</div>
        <div>Avg: {AT?.av}°F</div>
      </div>
      <div className="flex gap-2">
        <div className="font-bold">Pressure:</div>
        <div>Min: {PRE?.mn.toFixed()} Pa</div>
        <div>Max: {PRE?.mx.toFixed()} Pa</div>
        <div>Avg: {PRE?.av.toFixed()} Pa</div>
      </div>
      <div className="flex gap-2">
        <div className="font-bold">Wind:</div>
        <div>Min: {HWS?.mn.toFixed()} ms/s</div>
        <div>Max: {HWS?.mx.toFixed()} ms/s</div>
        <div>Avg: {HWS?.av.toFixed()} ms/s</div>
      </div>
    </div>
  );
}

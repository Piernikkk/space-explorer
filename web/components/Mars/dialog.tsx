import { DialogProps } from "@/lib/dialogManager/types";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { MarsWeatherAton } from "@/lib/atoms/marsWeatherAtom";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { $api } from "@/lib/providers/api";
import { useEffect } from "react";
import SolTile from "./SolTile";
import { components } from "@/types/api";

export default function MarsDialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & DialogProps<"Mars">) {
  const [weather, setWeather] = useAtom(MarsWeatherAton);

  const { data: weatherres } = useQuery(
    $api.queryOptions(
      "get",
      "/api/mars_weather",
      {},
      {
        enabled: weather == null,
      },
    ),
  );

  useEffect(() => {
    if (!weatherres) {
      return;
    }
    setWeather(weatherres);
  }, [weatherres]);

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-3xl h-150 max-h-150 dark:bg-background/50 bg-background/70 backdrop-blur-sm overflow-hidden flex flex-col">
        <DialogTitle>Mars Weather</DialogTitle>
        <div className="flex flex-col w-full flex-1">
          <div className="flex flex-col gap-2 max-h-120 py-2 overflow-auto">
            {weather?.sols &&
              Object.values(weather.sols).map((sol, i) => {
                const name = Object.keys(weather.sols)[i];
                return <SolTile {...sol} sol={name} key={name} />;
              })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

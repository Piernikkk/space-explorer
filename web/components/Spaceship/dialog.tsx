import { DialogProps } from "@/lib/dialogManager/types";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AstrosAtom } from "@/lib/atoms/astrosAtom";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import AstroTile from "./AstroTile";
import { Combobox } from "../ui/combobox";
import { Button } from "../ui/button";
import { IconFilterOff } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { $api } from "@/lib/providers/api";

export default function ShpaceshipDialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> &
  DialogProps<"SpaceShipDialog">) {
  const [astros, setAstros] = useAtom(AstrosAtom);

  const { data: astrosres } = useQuery(
    $api.queryOptions(
      "get",
      "/api/astros",
      {},
      {
        enabled: astros == null,
      },
    ),
  );

  useEffect(() => {
    if (!astrosres) {
      return;
    }
    setAstros(astrosres.people);
  }, [astrosres]);

  const spaceships = useMemo(() => {
    if (!astros) return [];
    const crafts = astros.map((a) => a.craft);
    const craftsSet = [...new Set(crafts)];

    return craftsSet.map((c) => ({
      value: c.toLowerCase(),
      label: c,
    }));
  }, [astros]);

  const [filter, setFilter] = useState("");

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-3xl h-150 max-h-150 dark:bg-background/50 bg-background/70 backdrop-blur-sm overflow-hidden flex flex-col">
        <DialogTitle>Spaceship</DialogTitle>
        <div className="flex flex-col w-full flex-1">
          <div className="flex justify-between items-center pb-2">
            <div className="font-bold">People currently in space:</div>
            <div className="flex gap-1">
              <Button variant={"outline"} onClick={() => setFilter("")}>
                <IconFilterOff />
              </Button>
              <Combobox
                selectLabel="Filter spaceship"
                data={spaceships}
                value={filter}
                setValue={setFilter}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 max-h-120 py-2 overflow-auto">
            {astros
              ?.filter((f) =>
                filter != "" ? f.craft.toLowerCase() == filter : f,
              )
              ?.map((a) => (
                <AstroTile key={a.name} {...a} />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

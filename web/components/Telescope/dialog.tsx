"use client";
import { DialogProps } from "@/lib/dialogManager/types";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { useAtom } from "jotai";
import { APODAtom } from "@/lib/atoms/apodAtom";
import { useQuery } from "@tanstack/react-query";
import { $api } from "@/lib/providers/api";
import { useEffect, useState } from "react";
import HoverableImage from "../HoverableImage";

export default function TelescopeDialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> &
  DialogProps<"Telescope">) {
  const [apod, setApod] = useAtom(APODAtom);

  const { data: apodres } = useQuery(
    $api.queryOptions(
      "get",
      "/api/apod",
      {},
      {
        enabled: apod == null,
      },
    ),
  );

  useEffect(() => {
    if (!apodres) {
      return;
    }
    setApod(apodres);
  }, [apodres]);

  const [loading, setLoading] = useState(true);

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-3xl h-150 max-h-150 dark:bg-background/50 bg-background/70 backdrop-blur-sm overflow-hidden flex flex-col">
        <DialogTitle>Astronomy Picture of the Day</DialogTitle>
        <div className="flex flex-col w-full h-full flex-1 justify-center items-center gap-4">
          {loading && <div className="text-6xl">Loading...</div>}
          {apod?.hdurl && (
            <HoverableImage
              src={apod.hdurl}
              width={600}
              height={200}
              alt={apod?.title}
              desctiption={apod.explanation}
              onLoad={() => setLoading(false)}
            />
          )}
          <div className="text-bold">{apod?.title}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

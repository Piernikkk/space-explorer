import { DialogProps } from "@/lib/dialogManager/types";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export default function SpaceShipDialog({
  name,
  payload,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & DialogProps<"SpaceShipDialog">) {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-3xl h-150 max-h-150 p-0 dark:bg-background/50 bg-background/70 backdrop-blur-sm overflow-hidden">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <div className="flex w-full h-full max-h-150">asdfasdfasdf</div>
      </DialogContent>
    </Dialog>
  );
}

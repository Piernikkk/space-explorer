import { DialogProps } from "@/lib/dialogManager/types";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export default function MarsDialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & DialogProps<"Mars">) {}

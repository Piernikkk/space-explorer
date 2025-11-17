import ShpaceshipDialog from "@/components/Spaceship/dialog";
import { DialogComponents, DialogDefinition } from "./types";
import TelescopeDialog from "@/components/Telescope/dialog";
import MarsDialog from "@/components/Mars/dialog";

export type Dialogs = {
  SpaceShipDialog: DialogDefinition<{
    payload: undefined;
    returnValue: undefined;
  }>;
  Telescope: DialogDefinition<{
    payload: undefined;
    returnValue: undefined;
  }>;
  Mars: DialogDefinition<{
    payload: undefined;
    returnValue: undefined;
  }>;
};

export const DialogBindings: DialogComponents = {
  SpaceShipDialog: ShpaceshipDialog,
  Telescope: TelescopeDialog,
  Mars: MarsDialog,
};

import ShpaceshipDialog from "@/components/Spaceship/dialog";
import { DialogComponents, DialogDefinition } from "./types";

export type Dialogs = {
  SpaceShipDialog: DialogDefinition<{
    payload: undefined;
    returnValue: undefined;
  }>;
};

export const DialogBindings: DialogComponents = {
  SpaceShipDialog: ShpaceshipDialog,
};

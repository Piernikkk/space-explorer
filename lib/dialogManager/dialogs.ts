import SpaceShipDialog from "@/components/SpaceShip/dialog";
import { DialogComponents, DialogDefinition } from "./types";

export type Dialogs = {
  SpaceShipDialog: DialogDefinition<{
    payload: {
      astro: string[];
    };
    returnValue: undefined;
  }>;
};

export const DialogBindings: DialogComponents = {
  SpaceShipDialog: SpaceShipDialog,
};

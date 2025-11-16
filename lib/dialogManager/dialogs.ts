import ShpaceshipDialog from "@/components/Spaceship/dialog";
import { DialogComponents, DialogDefinition } from "./types";
import { AstrosRes } from "../api/astros";

export type Dialogs = {
  SpaceShipDialog: DialogDefinition<{
    payload: {
      astro: AstrosRes;
    };
    returnValue: undefined;
  }>;
};

export const DialogBindings: DialogComponents = {
  SpaceShipDialog: ShpaceshipDialog,
};

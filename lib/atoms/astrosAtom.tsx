import { atom } from "jotai";
import { AstrosRes } from "../api/astros";

export const AstrosAtom = atom<AstrosRes | null>(null);

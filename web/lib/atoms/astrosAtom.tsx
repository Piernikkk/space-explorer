import { atom } from "jotai";
import { AstrosRes } from "../providers/types";

export const AstrosAtom = atom<AstrosRes["people"] | null>(null);

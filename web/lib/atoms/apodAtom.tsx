import { atom } from "jotai";
import { APODRes } from "../providers/types";

export const APODAtom = atom<APODRes | null>(null);

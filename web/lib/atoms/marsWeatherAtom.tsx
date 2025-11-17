import { atom } from "jotai";
import { MarsWeatherRes } from "../providers/types";

export const MarsWeatherAton = atom<MarsWeatherRes | null>(null);

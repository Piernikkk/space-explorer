import { useMemo } from "react";
import axios from "axios";
import { apis } from "../config";

export default function useAstros() {
  const astros = useMemo(
    () =>
      axios.create({
        baseURL: apis.astros,
      }),
    [],
  );

  return astros;
}

export type TAstro = {
  craft: string;
  name: string;
};

export type AstrosRes = TAstro[];

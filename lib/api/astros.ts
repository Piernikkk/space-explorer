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

"use client";

import { useEffect } from "react";

const STORAGE_KEY = "maddem_novedades_vistas";

export default function MarcarNovedadesVistas({
  ids,
}: {
  ids: string[];
}) {
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(ids)
      );
    } catch {
      // No hacemos nada si localStorage no está disponible.
    }
  }, [ids]);

  return null;
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "maddem_novedades_vistas";

export default function NovedadesBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadNovedades() {
      try {
        const response = await fetch("/api/novedades");

        if (!response.ok) {
          return;
        }

        const novedades: { id: string }[] =
          await response.json();

        const vistasRaw =
          localStorage.getItem(STORAGE_KEY);

        const vistas: string[] = vistasRaw
          ? JSON.parse(vistasRaw)
          : [];

        const nuevas = novedades.filter(
          (novedad) => !vistas.includes(novedad.id)
        );

        setCount(nuevas.length);
      } catch {
        setCount(0);
      }
    }

    loadNovedades();
  }, []);

  return (
    <Link
      href="/novedades"
      aria-label={
        count > 0
          ? `${count} novedades nuevas`
          : "Novedades"
      }
      className="relative mt-1 flex h-9 w-9 items-center justify-center text-white"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>

      {count > 0 && (
        <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#f39a1e] px-1 text-[9px] font-semibold leading-none text-[#111]">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
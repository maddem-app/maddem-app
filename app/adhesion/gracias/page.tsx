"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function GraciasPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/estado");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* CONTENIDO */}
        <section className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
          {/* CHECK */}
          <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-[5px] border-[#f39a1e]">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 27L22 37L41 16"
                stroke="#f39a1e"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* TÍTULO */}
          <h1 className="mt-7 text-[30px] font-medium tracking-tight text-[#f39a1e]">
            ¡Gracias!
          </h1>

          <p className="mt-2 max-w-[280px] text-[18px] leading-[27px] text-white">
            Tu adhesión como Empresa Fundadora fue recibida correctamente.
          </p>

          {/* LÍNEA */}
          <div className="mt-9 h-px w-[225px] bg-[#f39a1e]" />

          {/* MENSAJE */}
          <div className="mt-8 flex max-w-[285px] items-start gap-5 text-left">
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1 shrink-0"
            >
              <circle
                cx="21"
                cy="21"
                r="14"
                stroke="#f39a1e"
                strokeWidth="2"
              />

              <path
                d="M21 13V21L26 24"
                stroke="#f39a1e"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M21 4V8M21 34V38M4 21H8M34 21H38"
                stroke="#f39a1e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <p className="text-[14px] leading-[21px] text-white/80">
              En 12 horas su empresa aparecerá en el listado de Empresas
              Fundadoras.
            </p>
          </div>
        </section>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function NovedadesPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="flex items-start justify-between px-5 pt-5">
          <Link href="/estado" aria-label="Inicio">
            <div className="text-[24px] font-medium leading-none">
              <span className="text-[#f39a1e]">MAD</span>
              <span className="text-white">deM</span>
            </div>

            <div className="mt-1 text-[10px] leading-[12px] tracking-wide text-white/90">
              MONUMENTO AL DEPORTE
              <br />
              DE MONTAÑA
            </div>
          </Link>

          <Link
            href="/menu"
            aria-label="Volver al menú"
            className="mt-1 flex h-9 w-9 items-center justify-center text-white"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Link>
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 px-5 pb-28 pt-7">
          <h1 className="text-[17px] font-medium tracking-wide text-white">
            NOVEDADES
          </h1>

          <p className="mt-3 text-[14px] leading-[21px] text-white/70">
            En este espacio encontrarás las novedades más recientes sobre el
            avance del MADdeM, desde el inicio de la construcción hasta su
            instalación e inauguración.
          </p>

          {/* NOVEDAD ACTUAL */}
          <article className="mt-6 rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-wide text-[#f39a1e]">
                ETAPA FUNDADORA
              </span>

              <span className="text-[10px] text-white/40">
                AGOSTO 2026
              </span>
            </div>

            <h2 className="mt-4 text-[16px] font-medium text-white">
              El proyecto se encuentra en la etapa fundadora
            </h2>

            <p className="mt-2 text-[13px] leading-[20px] text-white/65">
              La convocatoria a Empresas Fundadoras está abierta. En esta
              etapa se reúnen los aportes necesarios para hacer realidad el
              MADdeM.
            </p>
          </article>
        </section>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
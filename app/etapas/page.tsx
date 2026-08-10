import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function EtapasPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col pb-24">
        {/* HEADER */}
        <header className="flex items-start justify-between px-5 pt-7">
          <Link href="/menu" className="block">
            <div className="text-[25px] leading-none text-[#f39a1e]">
              MADdeM
            </div>

            <div className="mt-1 text-[10px] leading-[12px] tracking-wide text-white/90">
              MONUMENTO AL DEPORTE
              <br />
              DE ALTA MONTAÑA
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
        <section className="flex-1 px-5 pb-8 pt-7">
          <h1 className="text-[17px] font-medium tracking-wide text-white">
            ETAPAS DEL PROYECTO
          </h1>

          <p className="mt-3 text-[14px] leading-[21px] text-white/70">
            La realización del MADdeM comprende distintas etapas, desde el
            acopio de materiales hasta su emplazamiento definitivo.
          </p>

          <div className="mt-6 space-y-3">
            {/* ETAPA 1 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[14px] text-[#f39a1e]">
                  01
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    ACOPIO DE MATERIALES
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Selección, adquisición y acopio de los materiales
                    necesarios para la realización de la obra.
                  </p>
                </div>
              </div>
            </article>

            {/* ETAPA 2 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[14px] text-[#f39a1e]">
                  02
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    REALIZACIÓN DE LA OBRA
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Construcción y desarrollo del MADdeM de acuerdo con el
                    diseño y las características de la obra.
                  </p>
                </div>
              </div>
            </article>

            {/* ETAPA 3 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[14px] text-[#f39a1e]">
                  03
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    CIMIENTOS Y ANCLAJES
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Preparación de los cimientos y de los anclajes necesarios
                    para recibir la obra en el lugar destinado.
                  </p>
                </div>
              </div>
            </article>

            {/* ETAPA 4 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[14px] text-[#f39a1e]">
                  04
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    EMPLAZAMIENTO DE LA OBRA
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Traslado, instalación y emplazamiento definitivo del
                    MADdeM en su ubicación.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>

      {/* BOTTOM NAV */}
      <BottomNav active="menu" />
    </main>
  );
}
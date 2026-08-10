import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function ComoAdherirPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="flex h-[82px] items-start justify-between px-5 pt-5">
          <Link href="/menu" className="block">
            <div className="text-[28px] font-light leading-none tracking-tight text-white">
              MAD
              <span className="text-[#f39a1e]">deM</span>
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
        <section className="flex-1 px-5 pb-24 pt-7">
          <h1 className="text-[17px] font-medium tracking-wide text-white">
            ¿CÓMO ADHERIR?
          </h1>

          <p className="mt-3 text-[14px] leading-[21px] text-white/75">
            Convertite en Empresa Fundadora del MADdeM y formá parte de la
            creación de un símbolo permanente para Villa La Angostura.
          </p>

          <div className="mt-6 space-y-3">
            {/* PASO 1 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[15px] text-[#f39a1e]">
                  1
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    Completá el formulario
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Ingresá los datos de tu empresa y de la persona de
                    contacto.
                  </p>
                </div>
              </div>
            </article>

            {/* PASO 2 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[15px] text-[#f39a1e]">
                  2
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    Definí tu aporte
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Indicá el aporte con el que querés acompañar la
                    realización del MADdeM.
                  </p>
                </div>
              </div>
            </article>

            {/* PASO 3 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[15px] text-[#f39a1e]">
                  3
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    Enviá tu solicitud
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Revisá los datos y enviá el formulario de adhesión.
                  </p>
                </div>
              </div>
            </article>

            {/* PASO 4 */}
            <article className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f39a1e] text-[15px] text-[#f39a1e]">
                  4
                </div>

                <div>
                  <h2 className="text-[14px] font-medium text-white">
                    Tu empresa aparecerá en el listado
                  </h2>

                  <p className="mt-1 text-[12px] leading-[18px] text-white/65">
                    Dentro de las próximas 12 horas, tu empresa aparecerá en
                    el listado de Empresas Fundadoras.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* BOTÓN */}
          <Link
            href="/adhesion"
            className="mt-5 flex h-[44px] w-full items-center justify-center rounded-md bg-[#e9951c] text-[12px] font-medium text-[#111]"
          >
            ADHERIR COMO EMPRESA FUNDADORA
          </Link>
        </section>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
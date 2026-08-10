import Link from "next/link";

export default function NovedadesPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="flex items-start justify-between px-5 pt-6">
          <Link href="/menu" className="block">
            <div className="text-[24px] leading-none">
              <span className="font-semibold text-white">MAD</span>
              <span className="font-normal text-[#f39a1e]">deM</span>
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
        <nav className="fixed bottom-0 left-1/2 z-20 flex h-[68px] w-full max-w-md -translate-x-1/2 border-t border-[#27313a] bg-[#020b14]">
          <NavItem icon="state" label="Estado" href="/estado" />
          <NavItem icon="companies" label="Empresas" href="/empresas" />
          <NavItem icon="destination" label="Destino" href="/destino" />
          <NavItem active icon="menu" label="Menú" href="/menu" />
        </nav>
      </div>
    </main>
  );
}

function NavItem({
  active = false,
  icon,
  label,
  href,
}: {
  active?: boolean;
  icon: "state" | "companies" | "destination" | "menu";
  label: string;
  href: string;
}) {
  const color = active ? "#f39a1e" : "#ffffff";

  return (
    <Link
      href={href}
      className="flex flex-1 flex-col items-center justify-center gap-1"
      style={{ color }}
    >
      {icon === "state" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19V10" />
          <path d="M10 19V6" />
          <path d="M16 19V12" />
          <path d="M22 19V3" />
        </svg>
      )}

      {icon === "companies" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="7" r="3" />
          <path d="M6 20c0-4 2.5-6 6-6s6 2 6 6" />
          <circle cx="5" cy="10" r="2" />
          <circle cx="19" cy="10" r="2" />
        </svg>
      )}

      {icon === "destination" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20l7-12 3 5 3-5 3 12" />
          <path d="M8 20h8" />
        </svg>
      )}

      {icon === "menu" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )}

      <span className="text-[9px]">{label}</span>
    </Link>
  );
}
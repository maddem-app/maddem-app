import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="flex items-start justify-between px-5 pt-5">
          <div>
            <div className="text-[24px] font-medium leading-none">
              <span className="text-[#f39a1e]">MAD</span>
              <span className="text-white">deM</span>
            </div>

            <div className="mt-1 text-[10px] leading-[12px] tracking-wide text-white/90">
              MONUMENTO AL DEPORTE
              <br />
              DE MONTAÑA
            </div>
          </div>

          {/* CERRAR */}
          <Link
            href="/estado"
            aria-label="Cerrar menú"
            className="mt-1 flex h-9 w-9 items-center justify-center text-[#f39a1e]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </Link>
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 px-5 pb-24">
          <h1 className="mb-5 mt-6 text-[16px] font-medium tracking-wide text-white">
            MENÚ PRINCIPAL
          </h1>

          <div className="overflow-hidden rounded-lg border border-[#27313a] bg-[#06121d]/80">
            <MenuItem
              href="/estado"
              icon="state"
              label="Estado del proyecto"
            />

            <MenuItem
              href="/como-adherir"
              icon="how"
              label="¿Cómo adherir?"
            />

            <MenuItem
              href="/destino"
              icon="destination"
              label="Destino de los aportes"
            />

            <MenuItem
              href="/etapas"
              icon="stages"
              label="Etapas del proyecto"
            />

            <MenuItem
              href="/novedades"
              icon="news"
              label="Novedades"
            />

            <MenuItem
              href="/maddem"
              icon="maddem"
              label="MADdeM"
            />

            <MenuItem
              href="/premio-maddem"
              icon="award"
              label="Premio MADdeM"
            />

            <MenuItem
              href="/andres-zerneri"
              icon="artist"
              label="Andrés Zerneri"
            />

            <MenuItem
              href="/preguntas"
              icon="questions"
              label="Preguntas frecuentes"
            />

            <MenuItem
              href="/contacto"
              icon="contact"
              label="Contacto"
            />

            <MenuItem
              href="/certificado"
              icon="certificate"
              label="Certificado de Empresa Fundadora"
            />
          </div>

          {/* DESADHERIR */}
          <Link
            href="/desadhesion"
            className="mt-3 flex h-[49px] items-center rounded-lg border border-[#27313a] bg-[#06121d]/80 px-4 text-[#ef4b32]"
          >
            <div className="mr-4 flex w-[30px] justify-center">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="7" r="3" />
                <path d="M3 20c0-4 2.5-6 6-6 2.1 0 3.8.6 4.9 1.8" />
                <path d="M16 14l5 5" />
                <path d="M21 14l-5 5" />
              </svg>
            </div>

            <span className="text-[13px] font-medium">
              Desadherir Empresa Fundadora
            </span>
          </Link>
        </section>

       <BottomNav active="menu" />
      </div>
    </main>
  );
}

function MenuItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon:
    | "state"
    | "how"
    | "destination"
    | "stages"
    | "news"
    | "maddem"
    | "award"
    | "artist"
    | "questions"
    | "contact"
    | "certificate";
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-[48px] items-center border-b border-[#27313a] px-4 last:border-b-0"
    >
      <div className="mr-4 flex w-[30px] justify-center text-[#f39a1e]">
        {/* ESTADO */}
        {icon === "state" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19V11" />
            <path d="M10 19V7" />
            <path d="M16 19V4" />
            <path d="M22 19V9" />
          </svg>
        )}

        {/* COMO ADHERIR */}
        {icon === "how" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 12l3 3 6-6" />
            <path d="M5 8c-2 0-3 1.5-3 3.5S3 15 5 15h2" />
            <path d="M19 8c2 0 3 1.5 3 3.5S21 15 19 15h-2" />
            <path d="M7 8c1-3 4-5 5-5s4 2 5 5" />
          </svg>
        )}

        {/* DESTINO */}
        {icon === "destination" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path d="M17.5 6.5L21 3" />
            <path d="M18 3h3v3" />
          </svg>
        )}

        {/* ETAPAS */}
        {icon === "stages" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 19V5" />
            <path d="M5 5h14l-3 4 3 4H5" />
          </svg>
        )}

        {/* NOVEDADES */}
        {icon === "news" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16v14H4z" />
            <path d="M7 8h10" />
            <path d="M7 12h10" />
            <path d="M7 16h6" />
          </svg>
        )}

        {/* MADdeM */}
        {icon === "maddem" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 18L12 5l9 13" />
            <path d="M7 18l5-7 5 7" />
            <path d="M9.5 12.5l2-3 2 3" />
          </svg>
        )}

        {/* PREMIO MADdeM */}
        {icon === "award" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M9 12l-2 9 5-3 5 3-2-9" />
            <path d="M12 5v6" />
            <path d="M9 8h6" />
          </svg>
        )}

        {/* ANDRÉS ZERNERI */}
        {icon === "artist" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="7" r="3.5" />
            <path d="M4 21c0-5 3-8 8-8s8 3 8 8" />
          </svg>
        )}

        {/* PREGUNTAS */}
        {icon === "questions" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.8c-1.1 1-1.8 1.4-1.8 2.7" />
            <path d="M12 17h.01" />
          </svg>
        )}

        {/* CONTACTO */}
        {icon === "contact" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M4 7l8 6 8-6" />
          </svg>
        )}

        {/* CERTIFICADO */}
        {icon === "certificate" && (
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="9" r="6" />
            <path d="M9 14l-1 7 4-2 4 2-1-7" />
            <path d="M10 9l1.5 1.5L14 8" />
          </svg>
        )}
      </div>

      <span className="flex-1 text-[13px] text-white/90">{label}</span>

      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f39a1e"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function NavItem({
  href,
  active = false,
  icon,
  label,
}: {
  href: string;
  active?: boolean;
  icon: "state" | "companies" | "destination" | "menu";
  label: string;
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
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M4 19V11" />
          <path d="M10 19V7" />
          <path d="M16 19V4" />
          <path d="M22 19V9" />
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
import Link from "next/link";

export default function BottomNav({
  active,
}: {
  active: "estado" | "empresas" | "novedades" | "menu";
}) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-[68px] w-full max-w-md -translate-x-1/2 border-t border-[#27313a] bg-[#020b14]">
      <NavItem
        href="/menu"
        icon="menu"
        label="Menú"
        active={active === "menu"}
      />

      <NavItem
        href="/novedades"
        icon="news"
        label="Novedades"
        active={active === "novedades"}
      />

      <NavItem
        href="/estado"
        icon="state"
        label="Estado"
        active={active === "estado"}
      />

      <NavItem
        href="/empresas"
        icon="companies"
        label="Empresas"
        active={active === "empresas"}
      />
    </nav>
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
  icon: "state" | "companies" | "news" | "menu";
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
          strokeLinejoin="round"
        >
          <circle cx="12" cy="7" r="3" />
          <path d="M6 20c0-4 2.5-6 6-6s6 2 6 6" />
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

      {icon === "news" && (
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
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
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
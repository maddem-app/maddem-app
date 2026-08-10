import Link from "next/link";

export default function BottomNav({
  active,
}: {
  active: "estado" | "empresas" | "destino" | "menu";
}) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-[68px] w-full max-w-md -translate-x-1/2 border-t border-[#27313a] bg-[#020b14]">
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

      <NavItem
        href="/destino"
        icon="destination"
        label="Destino"
        active={active === "destino"}
      />

      <NavItem
        href="/menu"
        icon="menu"
        label="Menú"
        active={active === "menu"}
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
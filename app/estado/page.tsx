import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import NovedadesBell from "@/components/NovedadesBell";
import BottomNav from "@/components/BottomNav";

export default async function EstadoPage() {
  const supabase = await createSupabaseServerClient();

  const [{ count }, { data: campaign }] = await Promise.all([
    supabase
      .from("companies")
      .select("*", { count: "exact", head: true })
      .eq("active", true),

    supabase
      .from("campaign_settings")
      .select("objective_amount, remaining_amount")
      .eq("id", 1)
      .single(),
  ]);

  const companiesCount = count ?? 0;
  const objectiveAmount = campaign?.objective_amount ?? 0;
  const remainingAmount = campaign?.remaining_amount ?? 0;

  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="flex items-start justify-between px-5 pt-7">
          <div>
            <div className="text-[25px] font-light leading-[22px] tracking-[-0.08em]">
              MAD
              <span className="text-[#f39a1e]">deM</span>
            </div>

            <div className="mt-1 text-[10px] leading-[12px] tracking-wide text-white/90">
              MONUMENTO AL DEPORTE
              <br />
              DE MONTAÑA
            </div>
          </div>

          {/* CAMPANA */}
<NovedadesBell />
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 px-5 pb-24">
          <h1 className="mb-5 text-[16px] font-medium tracking-wide text-white">
            ESTADO DEL PROYECTO
          </h1>

          <div className="space-y-3">
            {/* EMPRESAS */}
            <article className="flex min-h-[91px] items-center rounded-lg border border-[#2b3540] bg-[#06121d]/80 px-4">
              <div className="mr-5 flex w-[54px] justify-center text-[#f39a1e]">
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="12" r="6" />
                  <path d="M13 35c0-6 4.5-10 11-10s11 4 11 10v4H13z" />
                  <circle cx="9" cy="18" r="4" />
                  <path d="M3 37v-3c0-4 2.5-7 6-7 2 0 3.5.5 4.8 1.8" />
                  <circle cx="39" cy="18" r="4" />
                  <path d="M45 37v-3c0-4-2.5-7-6-7-2 0-3.5.5-4.8 1.8" />
                </svg>
              </div>

              <div>
                <p className="text-[14px] text-white/90">
                  Empresas adheridas
                </p>

                <p className="mt-1 text-[29px] leading-none text-[#f39a1e]">
                  {companiesCount}
                </p>
              </div>
            </article>

            {/* OBJETIVO */}
            <article className="flex min-h-[91px] items-center rounded-lg border border-[#2b3540] bg-[#06121d]/80 px-4">
              <div className="mr-5 flex w-[54px] justify-center text-[#f39a1e]">
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="24" r="15" />
                  <circle cx="24" cy="24" r="8" />
                  <circle cx="24" cy="24" r="2.5" />
                  <path d="M31 17l8-8" />
                  <path d="M34 9h5v5" />
                </svg>
              </div>

              <div>
                <p className="text-[14px] text-white/90">
                  Objetivo económico
                </p>

                <p className="mt-1 text-[25px] leading-none text-white">
                  USD{" "}
                  <span className="text-[#f39a1e]">
                    {Number(objectiveAmount).toLocaleString("es-AR")}
                  </span>
                </p>
              </div>
            </article>

            {/* PENDIENTE */}
            <article className="flex min-h-[106px] items-center rounded-lg border border-[#2b3540] bg-[#06121d]/80 px-4">
              <div className="mr-5 flex w-[54px] justify-center text-[#f39a1e]">
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 39V28" />
                  <path d="M8 28l9-9 7 7 10-13" />
                  <path d="M29 13h8v8" />
                  <path d="M13 39h26" />
                  <path d="M18 39V29" />
                  <path d="M25 39V27" />
                  <path d="M32 39V20" />
                </svg>
              </div>

              <div>
                <p className="max-w-[160px] text-[14px] leading-[19px] text-white/90">
                  Pendiente para iniciar
                  <br />
                  la construcción
                </p>

                <p className="mt-1 text-[25px] leading-none text-white">
                  USD{" "}
                  <span className="text-[#f39a1e]">
                    {Number(remainingAmount).toLocaleString("es-AR")}
                  </span>
                </p>
              </div>
            </article>
          </div>

          {/* BOTÓN */}
          <Link
            href="/adhesion"
            className="mt-4 flex h-[43px] w-full items-center justify-center rounded-md bg-[#e9951c] text-[12px] font-medium text-[#111]"
          >
            ADHERIR COMO EMPRESA FUNDADORA
          </Link>
        </section>

        <BottomNav active="estado" />
      </div>
    </main>
  );
}

function NavItem({
  active = false,
  icon,
  label,
}: {
  active?: boolean;
  icon: "state" | "companies" | "destination" | "menu";
  label: string;
}) {
  const color = active ? "#f39a1e" : "#ffffff";

  return (
    <button
      type="button"
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
        >
          <circle cx="12" cy="12" r="8" />
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
    </button>
  );
}
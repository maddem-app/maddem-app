import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import NovedadesBell from "@/components/NovedadesBell";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function EmpresasPage() {
  const { data, error } = await supabase
    .from("companies")
    .select("id, name, description, logo_url")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const companies = data.map((company) => {
    let logoUrl = "";

    if (company.logo_url) {
      const { data: logoData } = supabase.storage
        .from("company-logos")
        .getPublicUrl(company.logo_url);

      logoUrl = logoData.publicUrl;
    }

    return {
      ...company,
      logoUrl,
    };
  });

  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="flex h-[82px] items-start justify-between px-5 pt-5">
          <Link href="/estado" className="flex flex-col">
            <div className="text-[29px] font-semibold leading-none tracking-tight text-[#f39a1e]">
              MAD
              <span className="text-white">deM</span>
            </div>

            <div className="mt-1 text-[10px] leading-[12px] tracking-wide text-white/90">
              MONUMENTO AL DEPORTE
              <br />
              DE MONTAÑA
            </div>
          </Link>

         {/* CAMPANA */}
<NovedadesBell />
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 px-5 pb-28">
          <h1 className="mb-4 text-[16px] font-medium tracking-wide text-white">
            EMPRESAS FUNDADORAS
          </h1>

          <div className="space-y-1">
            {companies.length === 0 ? (
              <div className="rounded-lg border border-[#2b3540] bg-[#06121d]/80 p-5 text-sm text-white/60">
                Todavía no hay empresas adheridas.
              </div>
            ) : (
              companies.map((company) => (
                <article
                  key={company.id}
                  className="flex min-h-[78px] items-center rounded-lg border border-[#182531] bg-[#06121d]/80 px-2"
                >
                  {/* LOGO */}
                  <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center overflow-hidden rounded-md">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-[9px] text-white/30">
                        SIN LOGO
                      </div>
                    )}
                  </div>

                  {/* DATOS */}
                  <div className="min-w-0 flex-1 px-3">
                    <h2 className="truncate text-[13px] font-medium text-white">
                      {company.name}
                    </h2>

                    {company.description && (
                      <p className="mt-1 text-[10px] leading-[14px] text-white/65">
                        {company.description}
                      </p>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>

          {/* FRASE */}
          <p className="mx-auto mt-4 max-w-[270px] text-center text-[12px] leading-[18px] text-[#f39a1e]">
            Juntos dejamos una huella que
            <br />
            inspirará a las próximas generaciones.
          </p>
        </section>

        {/* BOTTOM NAV */}
        <BottomNav active="empresas" />
      </div>
    </main>
  );
}
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getNovedadImageUrl } from "@/lib/novedades";
import MarcarNovedadesVistas from "@/components/MarcarNovedadesVistas";
import BottomNav from "@/components/BottomNav";

type Novedad = {
  id: string;
  title: string;
  content: string;
  published_at: string;
  image_1: string | null;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(new Date(date))
    .replace(".", "")
    .toUpperCase();
}

function getExcerpt(content: string) {
  const clean = content.replace(/\s+/g, " ").trim();

  if (clean.length <= 150) {
    return clean;
  }

  return `${clean.slice(0, 150).trim()}...`;
}

export default async function NovedadesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: novedades, error } = await supabase
    .from("novedades")
    .select("id, title, content, published_at, image_1")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const novedadesIds = (novedades ?? []).map(
    (novedad) => novedad.id
  );

  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <MarcarNovedadesVistas ids={novedadesIds} />

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
        <section className="flex-1 px-5 pb-28 pt-8">
          <h1 className="text-[27px] font-medium tracking-wide text-white">
            NOVEDADES
          </h1>

          <p className="mt-4 text-[14px] leading-[21px] text-white/70">
            En este espacio encontrarás las novedades más recientes sobre el
            avance del MADdeM, desde el inicio de la construcción hasta su
            instalación e inauguración.
          </p>

          {/* LISTADO */}
          <div className="mt-7 space-y-5">
            {!novedades || novedades.length === 0 ? (
              <div className="rounded-xl border border-[#2b3540] bg-[#06121d]/80 p-6 text-center">
                <p className="text-sm text-white/50">
                  Todavía no hay novedades publicadas.
                </p>
              </div>
            ) : (
              novedades.map((novedad: Novedad) => (
                <Link
                  key={novedad.id}
                  href={`/novedades/${novedad.id}`}
                  className="block overflow-hidden rounded-xl border border-[#2b3540] bg-[#06121d]/80 transition-opacity hover:opacity-90"
                >
                  {novedad.image_1 && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-[#020b14]">
                      <img
                        src={getNovedadImageUrl(novedad.image_1) ?? ""}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex justify-end">
                      <span className="text-[10px] tracking-wide text-white/40">
                        {formatDate(novedad.published_at)}
                      </span>
                    </div>

                    <h2 className="mt-3 text-[19px] font-medium leading-[25px] text-white">
                      {novedad.title}
                    </h2>

                    <p className="mt-2 text-[13px] leading-[20px] text-white/65">
                      {getExcerpt(novedad.content)}
                    </p>

                    <p className="mt-4 text-[11px] tracking-wide text-[#f39a1e]">
                      VER NOVEDAD
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
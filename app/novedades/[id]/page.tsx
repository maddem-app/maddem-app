import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getNovedadImageUrl } from "@/lib/novedades";
import BottomNav from "@/components/BottomNav";

type Novedad = {
  id: string;
  title: string;
  content: string;
  published_at: string;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NovedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: novedad, error } = await supabase
    .from("novedades")
    .select(
      "id, title, content, published_at, image_1, image_2, image_3, image_4"
    )
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error || !novedad) {
    notFound();
  }

  const images = [
  novedad.image_1,
  novedad.image_2,
  novedad.image_3,
  novedad.image_4,
]
  .filter((image): image is string => Boolean(image))
  .map((image) => getNovedadImageUrl(image))
  .filter((image): image is string => Boolean(image));

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
            href="/novedades"
            aria-label="Volver a novedades"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
        </header>

        {/* CONTENIDO */}
        <article className="flex-1 px-5 pb-28 pt-8">
          {/* PORTADA */}
          {images.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-[#2b3540] bg-[#06121d]">
              <img
                src={images[0]}
                alt=""
                className="block aspect-[16/9] w-full object-cover"
              />
            </div>
          )}

          {/* FECHA */}
          <p className="mt-5 text-[10px] tracking-wide text-white/40">
            {formatDate(novedad.published_at).toUpperCase()}
          </p>

          {/* TITULO */}
          <h1 className="mt-3 text-[25px] font-medium leading-[31px] text-white">
            {novedad.title}
          </h1>

          {/* CONTENIDO */}
          <div className="mt-5 whitespace-pre-line text-[14px] leading-[23px] text-white/70">
            {novedad.content}
          </div>

          {/* GALERÍA */}
          {images.length > 1 && (
            <div className="mt-8 space-y-4">
              {images.slice(1).map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-xl border border-[#2b3540] bg-[#06121d]"
                >
                  <img
                    src={image}
                    alt=""
                    className="block w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* VOLVER */}
          <Link
            href="/novedades"
            className="mt-9 inline-flex items-center gap-2 text-[12px] tracking-wide text-[#f39a1e]"
          >
            <span>←</span>
            <span>VOLVER A NOVEDADES</span>
          </Link>
        </article>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
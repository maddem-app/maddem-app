"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

type Novedad = {
  id: string;
  title: string;
  content: string;
  published_at: string;
  published: boolean;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  created_at: string;
};

const EMPTY_FORM = {
  title: "",
  content: "",
  publishedAt: "",
  published: false,
};

export default function NovedadesAdmin() {
  const supabase = createSupabaseBrowserClient();

  const [novedades, setNovedades] = useState<Novedad[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [published, setPublished] = useState(false);

  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadNovedades();
  }, []);

  async function loadNovedades() {
    setLoading(true);
    setError("");

    const { data, error: novedadesError } = await supabase
      .from("novedades")
      .select(
        "id, title, content, published_at, published, image_1, image_2, image_3, image_4, created_at"
      )
      .order("published_at", {
        ascending: false,
      });

    if (novedadesError) {
      setError(novedadesError.message);
      setLoading(false);
      return;
    }

    setNovedades(data ?? []);
    setLoading(false);
  }

  function resetForm() {
    setEditingId(null);
    setTitle(EMPTY_FORM.title);
    setContent(EMPTY_FORM.content);
    setPublishedAt(EMPTY_FORM.publishedAt);
    setPublished(EMPTY_FORM.published);
    setImages([null, null, null, null]);

    for (let i = 1; i <= 4; i++) {
      const input = document.getElementById(
        `news-image-${i}`
      ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }
    }
  }

  function handleImageChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;

    setImages((current) => {
      const next = [...current];
      next[index] = file;
      return next;
    });
  }

  function handleEdit(novedad: Novedad) {
    setEditingId(novedad.id);
    setTitle(novedad.title);
    setContent(novedad.content);

    // Solo mostramos la fecha, sin hora.
    setPublishedAt(
      new Date(novedad.published_at)
        .toISOString()
        .slice(0, 10)
    );

    setPublished(novedad.published);
    setImages([null, null, null, null]);

    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function uploadImage(file: File): Promise<string> {
    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg";

    const path = `${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    return path;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const uploadedPaths: string[] = [];

    try {
      if (!title.trim()) {
        throw new Error("El título es obligatorio.");
      }

      if (!content.trim()) {
        throw new Error("El contenido es obligatorio.");
      }

      let imagePaths: (string | null)[] = [
        null,
        null,
        null,
        null,
      ];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];

        if (!file) {
          continue;
        }

        const path = await uploadImage(file);

        uploadedPaths.push(path);
        imagePaths[i] = path;
      }

      // La publicación usa solamente fecha.
      // Mediodía evita desplazamientos por zona horaria.
      const publishedAtValue = publishedAt
        ? `${publishedAt}T12:00:00`
        : new Date().toISOString();

      if (editingId) {
        const current = novedades.find(
          (item) => item.id === editingId
        );

        if (!current) {
          throw new Error(
            "No se encontró la novedad."
          );
        }

        const finalImages = [
          imagePaths[0] ?? current.image_1,
          imagePaths[1] ?? current.image_2,
          imagePaths[2] ?? current.image_3,
          imagePaths[3] ?? current.image_4,
        ];

        const {
          data: updated,
          error: updateError,
        } = await supabase
          .from("novedades")
          .update({
            title: title.trim(),
            content: content.trim(),
            published_at: publishedAtValue,
            published,
            image_1: finalImages[0],
            image_2: finalImages[1],
            image_3: finalImages[2],
            image_4: finalImages[3],
          })
          .eq("id", editingId)
          .select(
            "id, title, content, published_at, published, image_1, image_2, image_3, image_4, created_at"
          )
          .single();

        if (updateError) {
          throw new Error(updateError.message);
        }

        setNovedades((current) =>
          current.map((item) =>
            item.id === editingId ? updated : item
          )
        );

        resetForm();

        setMessage(
          "Novedad actualizada correctamente."
        );

        return;
      }

      const {
        data: inserted,
        error: insertError,
      } = await supabase
        .from("novedades")
        .insert({
          title: title.trim(),
          content: content.trim(),
          published_at: publishedAtValue,
          published,
          image_1: imagePaths[0],
          image_2: imagePaths[1],
          image_3: imagePaths[2],
          image_4: imagePaths[3],
        })
        .select(
          "id, title, content, published_at, published, image_1, image_2, image_3, image_4, created_at"
        )
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      setNovedades((current) => [
        inserted,
        ...current,
      ]);

      resetForm();

      setMessage(
        "Novedad creada correctamente."
      );
    } catch (err) {
      if (uploadedPaths.length > 0) {
        await supabase.storage
          .from("news-images")
          .remove(uploadedPaths);
      }

      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al guardar la novedad."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublished(
    novedad: Novedad
  ) {
    setError("");
    setMessage("");

    const nextPublished = !novedad.published;

    const {
      data: updated,
      error: updateError,
    } = await supabase
      .from("novedades")
      .update({
        published: nextPublished,
      })
      .eq("id", novedad.id)
      .select(
        "id, title, content, published_at, published, image_1, image_2, image_3, image_4, created_at"
      )
      .single();

    if (updateError || !updated) {
      setError(
        "No pudimos cambiar el estado de la novedad."
      );
      return;
    }

    setNovedades((current) =>
      current.map((item) =>
        item.id === novedad.id ? updated : item
      )
    );

    setMessage(
      nextPublished
        ? "Novedad publicada correctamente."
        : "Novedad despublicada correctamente."
    );
  }

  async function handleDelete(
    novedad: Novedad
  ) {
    const confirmed = window.confirm(
      `¿Eliminar la novedad "${novedad.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    const imagePaths = [
      novedad.image_1,
      novedad.image_2,
      novedad.image_3,
      novedad.image_4,
    ].filter(
      (path): path is string => Boolean(path)
    );

    const { error: deleteError } =
      await supabase
        .from("novedades")
        .delete()
        .eq("id", novedad.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    if (imagePaths.length > 0) {
      await supabase.storage
        .from("news-images")
        .remove(imagePaths);
    }

    setNovedades((current) =>
      current.filter(
        (item) => item.id !== novedad.id
      )
    );

    setMessage(
      "Novedad eliminada correctamente."
    );
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleDateString(
      "es-AR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  }

  return (
    <div className="space-y-10">
      {/* FORMULARIO */}
      <section>
        <h2 className="text-xl font-medium text-white">
          {editingId
            ? "Editar novedad"
            : "Nueva novedad"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <div>
            <label
              htmlFor="news-title"
              className="text-sm text-white/80"
            >
              Título
            </label>

            <input
              id="news-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Ej. Bienvenidos, Familia Taraborelli"
              className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="news-content"
              className="text-sm text-white/80"
            >
              Contenido
            </label>

            <textarea
              id="news-content"
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              placeholder="Escribí el contenido de la novedad..."
              rows={7}
              className="mt-2 w-full resize-y rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="news-date"
              className="text-sm text-white/80"
            >
              Fecha de publicación
            </label>

            <input
              id="news-date"
              type="date"
              value={publishedAt}
              onChange={(event) =>
                setPublishedAt(event.target.value)
              }
              className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
            />
          </div>

          {/* FOTOS */}
          <div>
            <p className="text-sm text-white/80">
              Imágenes
            </p>

            <div className="mt-3 space-y-3">
              {[0, 1, 2, 3].map((index) => {
                const label =
                  index === 0
                    ? "Portada"
                    : `Foto ${index + 1}`;

                return (
                  <div key={index}>
                    <label
                      htmlFor={`news-image-${
                        index + 1
                      }`}
                      className="text-xs text-white/50"
                    >
                      {label}
                    </label>

                    <input
                      id={`news-image-${
                        index + 1
                      }`}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) =>
                        handleImageChange(
                          index,
                          event
                        )
                      }
                      className="mt-1 block w-full cursor-pointer rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-sm text-white/70"
                    />

                    {images[index] && (
                      <p className="mt-1 text-xs text-white/40">
                        {images[index]?.name}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {editingId && (
              <p className="mt-2 text-xs text-white/40">
                Si no seleccionás una nueva imagen,
                se conserva la actual.
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-center gap-3 border-t border-[#2b3540] pt-5">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) =>
                setPublished(
                  event.target.checked
                )
              }
              className="h-5 w-5 appearance-none rounded-sm border border-[#f39a1e] bg-transparent checked:bg-[#f39a1e]"
            />

            <span className="text-sm text-white/80">
              Publicar novedad
            </span>
          </label>

          {error && (
            <p className="rounded-md border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p className="rounded-md border border-green-900/50 bg-green-950/30 px-4 py-3 text-sm text-green-400">
              {message}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-[#e9951c] px-6 py-3 text-sm font-medium text-[#111] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "GUARDANDO..."
                : editingId
                  ? "GUARDAR CAMBIOS"
                  : "GUARDAR NOVEDAD"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-md border border-[#2b3540] px-6 py-3 text-sm text-white/70 disabled:opacity-50"
              >
                CANCELAR
              </button>
            )}
          </div>
        </form>
      </section>

      {/* LISTADO */}
      <section className="border-t border-[#2b3540] pt-8">
        <h2 className="text-xl font-medium text-white">
          Novedades
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-white/50">
            Cargando novedades...
          </p>
        ) : novedades.length === 0 ? (
          <div className="mt-4 rounded-lg border border-[#2b3540] bg-[#06121d] p-6 text-white/60">
            Todavía no hay novedades.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {novedades.map((novedad) => (
              <article
                key={novedad.id}
                className="rounded-lg border border-[#2b3540] bg-[#06121d] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-medium text-white">
                      {novedad.title}
                    </h3>

                    <p className="mt-1 text-xs text-white/40">
                      {formatDate(
                        novedad.published_at
                      )}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-5 text-white/60">
                      {novedad.content}
                    </p>

                    <p className="mt-3 text-xs">
                      <span
                        className={
                          novedad.published
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {novedad.published
                          ? "PUBLICADA"
                          : "NO PUBLICADA"}
                      </span>
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(novedad)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-[#f39a1e] text-[#f39a1e]"
                      aria-label={`Editar ${novedad.title}`}
                      title="Editar novedad"
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleTogglePublished(
                          novedad
                        )
                      }
                      className={
                        novedad.published
                          ? "rounded-md border border-yellow-500/60 px-3 py-2 text-[11px] font-medium text-yellow-400"
                          : "rounded-md border border-green-500/60 px-3 py-2 text-[11px] font-medium text-green-400"
                      }
                    >
                      {novedad.published
                        ? "DESPUBLICAR"
                        : "PUBLICAR"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(novedad)
                      }
                      className="rounded-md border border-red-500/50 px-3 py-2 text-[11px] font-medium text-red-400"
                    >
                      ELIMINAR
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
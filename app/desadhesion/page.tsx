"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function DesadhesionPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!accepted) {
      setError("Debés aceptar la declaración para continuar.");
      return;
    }

    if (!reason.trim()) {
      setError("El motivo de la solicitud es obligatorio.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/desadhesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          contactName: contactName.trim(),
          phone: phone.trim(),
          reason: reason.trim(),
          accepted,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "No pudimos enviar la solicitud. Intentá nuevamente."
        );
        setLoading(false);
        return;
      }

      router.push("/desadhesion/solicitud-enviada");
    } catch (error) {
      console.error("DESADHESIÓN ERROR:", error);
      setError("No pudimos enviar la solicitud. Intentá nuevamente.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="px-5 pt-7">
          <div>
            <div className="text-[25px] font-light leading-[22px] tracking-[-0.08em]">
              MAD
              <span className="text-[#f39a1e]">deM</span>
            </div>

            <div className="mt-1 text-[9px] leading-[11px] tracking-wide text-white/90">
              MONUMENTO AL DEPORTE
              <br />
              DE ALTA MONTAÑA
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 px-5 pb-24 pt-8">
          <h1 className="text-[18px] font-medium text-white">
            Solicitar desadhesión
          </h1>

          <p className="mt-2 max-w-[310px] text-[13px] leading-[19px] text-white/70">
            Si necesitás solicitar la desadhesión de tu empresa como Empresa
            Fundadora del MADdeM, completá el siguiente formulario.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* EMPRESA */}
            <div>
              <label className="text-[12px] text-white/85">
                Nombre de la empresa{" "}
                <span className="text-[#f39a1e]">*</span>
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Hotel Correntoso"
                className="mt-1 h-9 w-full rounded-md border border-[#27313a] bg-transparent px-3 text-[12px] text-white outline-none placeholder:text-white/35 focus:border-[#f39a1e]"
              />
            </div>

            {/* CONTACTO */}
            <div>
              <label className="text-[12px] text-white/85">
                Nombre de quien solicita{" "}
                <span className="text-[#f39a1e]">*</span>
              </label>

              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nombre y apellido"
                className="mt-1 h-9 w-full rounded-md border border-[#27313a] bg-transparent px-3 text-[12px] text-white outline-none placeholder:text-white/35 focus:border-[#f39a1e]"
              />
            </div>

            {/* TELÉFONO */}
            <div>
              <label className="text-[12px] text-white/85">
                Teléfono{" "}
                <span className="text-[#f39a1e]">*</span>
              </label>

              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+54 9 11 1234 5678"
                className="mt-1 h-9 w-full rounded-md border border-[#27313a] bg-transparent px-3 text-[12px] text-white outline-none placeholder:text-white/35 focus:border-[#f39a1e]"
              />
            </div>

            {/* MOTIVO */}
            <div>
              <label className="text-[12px] text-white/85">
                Motivo de la solicitud{" "}
                <span className="text-[#f39a1e]">*</span>
              </label>

              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Contanos brevemente el motivo de la solicitud."
                rows={5}
                className="mt-1 w-full resize-none rounded-md border border-[#27313a] bg-transparent px-3 py-2 text-[12px] leading-[18px] text-white outline-none placeholder:text-white/35 focus:border-[#f39a1e]"
              />
            </div>

            {/* DECLARACIÓN */}
            <label className="flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 appearance-none rounded-sm border border-[#f39a1e] bg-transparent checked:bg-[#f39a1e]"
              />

              <span className="text-[12px] leading-[18px] text-white/75">
                Declaro que solicito formalmente la desadhesión de mi empresa
                como Empresa Fundadora del MADdeM y que la información
                proporcionada es correcta.
              </span>
            </label>

            {/* ERROR */}
            {error && (
              <p className="text-[11px] leading-[16px] text-red-400">
                {error}
              </p>
            )}

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-10 w-full items-center justify-between rounded-md bg-[#f39a1e] px-4 text-[13px] font-medium text-[#020b14] disabled:opacity-60"
            >
              <span>
                {loading ? "ENVIANDO..." : "SOLICITAR DESADHESIÓN"}
              </span>

              <span className="text-[21px] leading-none">›</span>
            </button>
          </form>
        </section>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
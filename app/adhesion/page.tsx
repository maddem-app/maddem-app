"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

export default function AdhesionPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [donation, setDonation] = useState("");
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

    setLoading(true);

    const donationValue = Number(
      donation.replace(/\./g, "").replace(",", ".")
    );

    // 1. Guardar la adhesión en Supabase
    const { data: company, error: insertError } = await supabase
      .from("companies")
      .insert({
        name,
        contact_name: contactName,
        email,
        phone,
        donation_nominal: donationValue,
        adhesion_accepted: true,
        adhesion_at: new Date().toISOString(),
        active: true,
      })
      .select("id")
      .single();

    if (insertError || !company) {
      console.error("SUPABASE INSERT ERROR:", {
  message: insertError?.message,
  details: insertError?.details,
  hint: insertError?.hint,
  code: insertError?.code,
});
      setError("No pudimos registrar la adhesión. Intentá nuevamente.");
      setLoading(false);
      return;
    }

    // 2. Enviar el correo de notificación
    try {
      const response = await fetch("/api/adhesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: company.id,
          name,
          contactName,
          email,
          phone,
          donation,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error(result);
        setError(
          "La adhesión fue registrada, pero no pudimos enviar la notificación. Intentá nuevamente."
        );
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
      setError(
        "La adhesión fue registrada, pero no pudimos enviar la notificación. Intentá nuevamente."
      );
      setLoading(false);
      return;
    }

    // 3. Todo correcto → pantalla de agradecimiento
    router.push("/adhesion/gracias");
  }

  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="px-5 pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[27px] leading-none">
                <span className="font-medium text-[#f39a1e]">MAD</span>
                <span className="font-light text-[#f39a1e]">deM</span>
              </div>

              <div className="mt-1 text-[9px] leading-[11px] tracking-wide text-white/90">
                MONUMENTO AL DEPORTE
                <br />
                DE ALTA MONTAÑA
              </div>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 px-5 pb-24 pt-8">
          <h1 className="text-[18px] font-medium text-white">
            Adherir como Empresa Fundadora
          </h1>

          <p className="mt-2 max-w-[310px] text-[13px] leading-[19px] text-white/70">
            Sumá tu empresa al proyecto MADdeM y sé parte de esta obra para
            las generaciones futuras.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            {/* EMPRESA */}
            <div>
              <label className="text-[12px] text-white/85">
                Nombre de la empresa <span className="text-[#f39a1e]">*</span>
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
                Contacto <span className="text-[#f39a1e]">*</span>
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

            {/* EMAIL */}
            <div>
              <label className="text-[12px] text-white/85">
                Correo electrónico{" "}
                <span className="text-[#f39a1e]">*</span>
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@empresa.com"
                className="mt-1 h-9 w-full rounded-md border border-[#27313a] bg-transparent px-3 text-[12px] text-white outline-none placeholder:text-white/35 focus:border-[#f39a1e]"
              />
            </div>

            {/* TELÉFONO */}
            <div>
              <label className="text-[12px] text-white/85">
                Teléfono <span className="text-[#f39a1e]">*</span>
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

            {/* APORTE */}
            <div>
              <label className="text-[12px] text-white/85">
                Aporte que desea realizar (USD){" "}
                <span className="text-[#f39a1e]">*</span>
              </label>

              <div className="mt-1 flex h-9 overflow-hidden rounded-md border border-[#27313a]">
                <div className="flex w-12 items-center justify-center border-r border-[#27313a] text-[12px] text-white">
                  U$S
                </div>

                <input
                  type="text"
                  required
                  value={donation}
                  onChange={(e) => setDonation(e.target.value)}
                  placeholder="Ej. 1.000"
                  className="min-w-0 flex-1 bg-transparent px-3 text-[12px] text-white outline-none placeholder:text-white/35"
                />
              </div>
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
                Declaro que la información proporcionada es correcta y que
                deseo adherir como Empresa Fundadora del MADdeM.
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
              <span>{loading ? "ENVIANDO..." : "ENVIAR ADHESIÓN"}</span>

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
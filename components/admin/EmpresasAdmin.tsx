"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

type Company = {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  donation_nominal: number;
  sort_order: number;
  active: boolean;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
};

export default function EmpresasAdmin({
  initialCompanies,
}: {
  initialCompanies: Company[];
}) {
  const supabase = createSupabaseBrowserClient();

  const [companies, setCompanies] = useState(initialCompanies);

  const [editingCompanyId, setEditingCompanyId] =
    useState<string | null>(null);

  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [donationNominal, setDonationNominal] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  const [objectiveAmount, setObjectiveAmount] = useState("26000");
  const [remainingAmount, setRemainingAmount] = useState("26000");

  const [loading, setLoading] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCampaignSettings() {
      const { data, error: settingsError } = await supabase
        .from("campaign_settings")
        .select("objective_amount, remaining_amount")
        .eq("id", 1)
        .single();

      if (settingsError) {
        setError(settingsError.message);
        setLoadingSettings(false);
        return;
      }

      setObjectiveAmount(String(data.objective_amount));
      setRemainingAmount(String(data.remaining_amount));
      setLoadingSettings(false);
    }

    loadCampaignSettings();
  }, [supabase]);

  function handleLogoChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setLogo(event.target.files?.[0] ?? null);
  }

  function resetForm() {
    setEditingCompanyId(null);
    setName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setDonationNominal("");
    setLogo(null);

    const fileInput = document.getElementById(
      "company-logo"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  }

  function handleEdit(company: Company) {
    setEditingCompanyId(company.id);
    setName(company.name);
    setContactName(company.contact_name ?? "");
    setEmail(company.email ?? "");
    setPhone(company.phone ?? "");
    setDonationNominal(
      String(company.donation_nominal)
    );
    setLogo(null);

    const fileInput = document.getElementById(
      "company-logo"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }

    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    let newFilePath: string | null = null;

    try {
      if (!name.trim()) {
        throw new Error(
          "El nombre de la empresa es obligatorio."
        );
      }

      const donationValue = Number(donationNominal);
      const objectiveValue = Number(objectiveAmount);
      const remainingValue = Number(remainingAmount);

      if (
        !Number.isFinite(donationValue) ||
        donationValue < 0
      ) {
        throw new Error(
          "La donación nominal no es válida."
        );
      }

      if (
        !Number.isFinite(objectiveValue) ||
        objectiveValue < 0
      ) {
        throw new Error(
          "El objetivo de campaña no es válido."
        );
      }

      if (
        !Number.isFinite(remainingValue) ||
        remainingValue < 0
      ) {
        throw new Error(
          "El monto restante no es válido."
        );
      }

      /*
       * ============================================================
       * EDITAR EMPRESA
       * ============================================================
       */

      if (editingCompanyId) {
        const currentCompany = companies.find(
          (company) =>
            company.id === editingCompanyId
        );

        if (!currentCompany) {
          throw new Error(
            "No se encontró la empresa a editar."
          );
        }

        let newLogoPath = currentCompany.logo_url;

        if (logo) {
          const fileExtension =
            logo.name
              .split(".")
              .pop()
              ?.toLowerCase() || "png";

          newFilePath = `${crypto.randomUUID()}.${fileExtension}`;

          const { error: uploadError } =
            await supabase.storage
              .from("company-logos")
              .upload(
                newFilePath,
                logo,
                {
                  cacheControl: "3600",
                  upsert: false,
                }
              );

          if (uploadError) {
            throw new Error(
              uploadError.message
            );
          }

          newLogoPath = newFilePath;
        }

        const {
          data: updatedCompany,
          error: updateError,
        } = await supabase
          .from("companies")
          .update({
            name: name.trim(),
            contact_name:
              contactName.trim() || null,
            email: email.trim() || null,
            phone: phone.trim() || null,
            logo_url: newLogoPath,
            donation_nominal: donationValue,
          })
          .eq("id", editingCompanyId)
          .select(
            "id, name, description, logo_url, donation_nominal, sort_order, active, contact_name, email, phone"
          )
          .single();

        if (updateError) {
          if (newFilePath) {
            await supabase.storage
              .from("company-logos")
              .remove([newFilePath]);
          }

          throw new Error(
            updateError.message
          );
        }

        const {
          error: settingsError,
        } = await supabase
          .from("campaign_settings")
          .update({
            objective_amount: objectiveValue,
            remaining_amount: remainingValue,
          })
          .eq("id", 1);

        if (settingsError) {
          throw new Error(
            settingsError.message
          );
        }

        if (
          newFilePath &&
          currentCompany.logo_url &&
          currentCompany.logo_url !== newFilePath
        ) {
          await supabase.storage
            .from("company-logos")
            .remove([
              currentCompany.logo_url,
            ]);
        }

        setCompanies((current) =>
          current.map((company) =>
            company.id === editingCompanyId
              ? updatedCompany
              : company
          )
        );

        resetForm();

        setMessage(
          "Empresa actualizada correctamente."
        );

        return;
      }

      /*
       * ============================================================
       * NUEVA EMPRESA
       * ============================================================
       */

      if (!logo) {
        throw new Error(
          "Tenés que seleccionar un logo."
        );
      }

      const fileExtension =
        logo.name
          .split(".")
          .pop()
          ?.toLowerCase() || "png";

      newFilePath = `${crypto.randomUUID()}.${fileExtension}`;

      const { error: uploadError } =
        await supabase.storage
          .from("company-logos")
          .upload(
            newFilePath,
            logo,
            {
              cacheControl: "3600",
              upsert: false,
            }
          );

      if (uploadError) {
        throw new Error(
          uploadError.message
        );
      }

      const {
        data: insertedCompany,
        error: insertError,
      } = await supabase
        .from("companies")
        .insert({
          name: name.trim(),
          contact_name:
            contactName.trim() || null,
          email: email.trim() || null,
          phone: phone.trim() || null,
          logo_url: newFilePath,
          donation_nominal: donationValue,
          sort_order: companies.length,
          active: true,
        })
        .select(
          "id, name, description, logo_url, donation_nominal, sort_order, active, contact_name, email, phone"
        )
        .single();

      if (insertError) {
        await supabase.storage
          .from("company-logos")
          .remove([newFilePath]);

        throw new Error(
          insertError.message
        );
      }

      const {
        error: settingsError,
      } = await supabase
        .from("campaign_settings")
        .update({
          objective_amount: objectiveValue,
          remaining_amount: remainingValue,
        })
        .eq("id", 1);

      if (settingsError) {
        throw new Error(
          settingsError.message
        );
      }

      setCompanies((current) => [
        ...current,
        insertedCompany,
      ]);

      resetForm();

      setMessage(
        "Empresa y estado de campaña actualizados correctamente."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al guardar."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(company: Company) {
    setError("");
    setMessage("");

    const { error: updateError } =
      await supabase
        .from("companies")
        .update({
          active: !company.active,
        })
        .eq("id", company.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setCompanies((current) =>
      current.map((item) =>
        item.id === company.id
          ? {
              ...item,
              active: !item.active,
            }
          : item
      )
    );

    setMessage(
      company.active
        ? "Empresa desactivada."
        : "Empresa activada."
    );
  }

  return (
    <div className="space-y-10">
      {/* FORMULARIO */}
      <section>
        <h2 className="text-xl font-medium text-white">
          {editingCompanyId
            ? "Editar empresa"
            : "Nueva empresa"}
        </h2>

        {loadingSettings ? (
          <p className="mt-4 text-sm text-white/50">
            Cargando estado de campaña...
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="company-name"
                className="text-sm text-white/80"
              >
                Nombre de la empresa
              </label>

              <input
                id="company-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Ej. Hotel Correntoso"
                className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contact-name"
                className="text-sm text-white/80"
              >
                Nombre de la persona que hizo la adhesión
              </label>

              <input
                id="contact-name"
                type="text"
                value={contactName}
                onChange={(event) =>
                  setContactName(event.target.value)
                }
                placeholder="Ej. Juan Pérez"
                className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
              />
            </div>

            <div>
              <label
                htmlFor="company-email"
                className="text-sm text-white/80"
              >
                Correo electrónico
              </label>

              <input
                id="company-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Ej. contacto@empresa.com"
                className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
              />
            </div>

            <div>
              <label
                htmlFor="company-phone"
                className="text-sm text-white/80"
              >
                Teléfono
              </label>

              <input
                id="company-phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Ej. 2944 123456"
                className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
              />
            </div>

            <div>
              <label
                htmlFor="company-donation"
                className="text-sm text-white/80"
              >
                Donación nominal (USD)
              </label>

              <input
                id="company-donation"
                type="number"
                min="0"
                step="1"
                value={donationNominal}
                onChange={(event) =>
                  setDonationNominal(
                    event.target.value
                  )
                }
                placeholder="Ej. 1000"
                className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="company-logo"
                className="text-sm text-white/80"
              >
                Logo de la empresa
              </label>

              <input
                id="company-logo"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleLogoChange}
                className="mt-2 block w-full cursor-pointer rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-sm text-white/80"
              />

              {logo && (
                <p className="mt-2 text-xs text-white/50">
                  {logo.name}
                </p>
              )}

              {editingCompanyId && !logo && (
                <p className="mt-2 text-xs text-white/40">
                  Si no seleccionás un archivo, se conserva el logo actual.
                </p>
              )}
            </div>

            <div className="border-t border-[#2b3540] pt-5">
              <h3 className="text-lg font-medium text-white">
                Estado de la campaña
              </h3>

              <div className="mt-4 space-y-5">
                <div>
                  <label
                    htmlFor="objective-amount"
                    className="text-sm text-white/80"
                  >
                    Monto del objetivo (USD)
                  </label>

                  <input
                    id="objective-amount"
                    type="number"
                    min="0"
                    step="1"
                    value={objectiveAmount}
                    onChange={(event) =>
                      setObjectiveAmount(
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="remaining-amount"
                    className="text-sm text-white/80"
                  >
                    Restante al objetivo (USD)
                  </label>

                  <input
                    id="remaining-amount"
                    type="number"
                    min="0"
                    step="1"
                    value={remainingAmount}
                    onChange={(event) =>
                      setRemainingAmount(
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-4 py-3 text-white outline-none focus:border-[#f39a1e]"
                    required
                  />

                  <p className="mt-2 text-xs text-white/40">
                    Este monto se actualiza manualmente.
                  </p>
                </div>
              </div>
            </div>

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
                disabled={loading}
                className="rounded-md bg-[#e9951c] px-6 py-3 text-sm font-medium text-[#111] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "GUARDANDO..."
                  : editingCompanyId
                    ? "GUARDAR CAMBIOS"
                    : "GUARDAR EMPRESA"}
              </button>

              {editingCompanyId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="rounded-md border border-[#2b3540] px-6 py-3 text-sm text-white/70 disabled:opacity-50"
                >
                  CANCELAR
                </button>
              )}
            </div>
          </form>
        )}
      </section>

      {/* LISTADO */}
      <section>
        <h2 className="text-xl font-medium text-white">
          Empresas adheridas
        </h2>

        <div className="mt-4 space-y-3">
          {companies.length === 0 ? (
            <div className="rounded-lg border border-[#2b3540] bg-[#06121d] p-6 text-white/60">
              Todavía no hay empresas adheridas.
            </div>
          ) : (
            companies.map((company) => (
              <article
                key={company.id}
                className="flex items-center justify-between rounded-lg border border-[#2b3540] bg-[#06121d] p-4"
              >
                <div className="min-w-0">
                  <h3 className="font-medium text-white">
                    {company.name}
                  </h3>

                  {company.contact_name && (
                    <p className="mt-1 text-sm text-white/70">
                      {company.contact_name}
                    </p>
                  )}

                  {company.email && (
                    <p className="mt-1 text-sm text-white/60">
                      {company.email}
                    </p>
                  )}

                  {company.phone && (
                    <p className="mt-1 text-sm text-white/60">
                      {company.phone}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-white/50">
                    Donación nominal: USD{" "}
                    {company.donation_nominal.toLocaleString(
                      "es-AR"
                    )}
                  </p>

                  <p className="mt-2 text-xs">
                    <span
                      className={
                        company.active
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {company.active
                        ? "ACTIVA"
                        : "INACTIVA"}
                    </span>
                  </p>
                </div>

                <div className="ml-4 flex shrink-0 flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(company)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#f39a1e] text-[#f39a1e]"
                    aria-label={`Editar ${company.name}`}
                    title="Editar empresa"
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
                      handleToggle(company)
                    }
                    className="rounded-md border border-[#f39a1e] px-4 py-2 text-xs text-[#f39a1e]"
                  >
                    {company.active
                      ? "Desactivar"
                      : "Activar"}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
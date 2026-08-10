import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import EmpresasAdmin from "@/components/admin/EmpresasAdmin";

export default async function AdminEmpresasPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: companies, error } = await supabase
    .from("companies")
    .select(
  "id, name, description, logo_url, donation_nominal, sort_order, active, contact_name, email, phone"

)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-[#020b14] px-6 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-[#f39a1e]">
          Empresas Fundadoras
        </h1>

        <p className="mt-2 text-white/60">
          Administración de empresas adheridas.
        </p>

        <EmpresasAdmin initialCompanies={companies ?? []} />
      </div>
    </main>
  );
}
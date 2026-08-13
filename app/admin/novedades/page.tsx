import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import NovedadesAdmin from "@/components/admin/NovedadesAdmin";

export default async function AdminNovedadesPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#020b14] px-6 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-[#f39a1e]">
          Novedades
        </h1>

        <p className="mt-2 text-white/60">
          Administración de novedades del MADdeM.
        </p>

        <NovedadesAdmin />
      </div>
    </main>
  );
}
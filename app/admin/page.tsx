import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#020b14] px-6 py-8 text-white">
      <h1 className="text-2xl font-semibold text-[#f39a1e]">
        MADdeM
      </h1>

      <p className="mt-2 text-white/70">
        Panel de administración
      </p>

      <p className="mt-8 text-sm text-white/60">
        Sesión iniciada como:
      </p>

      <p className="mt-1 text-white">
        {user.email}
      </p>
    </main>
  );
}
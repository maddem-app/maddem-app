"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase-client";

export default function AdminLogout() {
  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();

    await supabase.auth.signOut();

    window.location.href = "/admin/login";
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-md border border-[#2b3540] px-4 py-2 text-sm text-white/70 hover:text-white"
    >
      CERRAR SESIÓN
    </button>
  );
}
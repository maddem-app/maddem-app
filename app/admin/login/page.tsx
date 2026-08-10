"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020b14] px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-[#2b3540] bg-[#06121d] p-6"
      >
        <h1 className="text-2xl font-semibold text-[#f39a1e]">
          MADdeM
        </h1>

        <p className="mt-1 text-sm text-white/70">
          Administración
        </p>

        <div className="mt-8">
          <label className="text-sm text-white/80">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-3 py-3 text-white outline-none"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm text-white/80">
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border border-[#2b3540] bg-[#020b14] px-3 py-3 text-white outline-none"
            required
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-[#e9951c] py-3 text-sm font-medium text-[#111] disabled:opacity-50"
        >
          {loading ? "INGRESANDO..." : "INGRESAR"}
        </button>
      </form>
    </main>
  );
}
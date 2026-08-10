import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      {/* LOGO */}
      <div className="flex justify-center pt-12">
        <Image
          src="/maddem/logo-maddem.png"
          alt="MADdeM"
          width={90}
          height={90}
          className="h-auto w-[90px]"
        />
      </div>

      {/* CONTENIDO */}
      <section className="flex flex-1 flex-col items-center justify-center pb-16 text-center">
        <p className="text-[16px] font-medium tracking-[0.02em] text-[#f39a1e]">
          MADdeM
        </p>

        <h1 className="mt-3 text-[22px] font-light">
          Contacto
        </h1>

        <p className="mt-5 max-w-[290px] text-[14px] leading-[21px] text-white/70">
          Para consultas, información o para conocer más sobre el proyecto,
          podés comunicarte con nosotros.
        </p>

        <Link
          href="mailto:maddem.app@outlook.com"
          className="mt-8 rounded-lg border border-[#f39a1e] px-6 py-3 text-[13px] text-[#f39a1e] transition-opacity hover:opacity-80"
        >
          maddem.app@outlook.com
        </Link>
      </section>

      {/* BOTTOM NAV */}
      <BottomNav active="menu" />
    </main>
  );
}
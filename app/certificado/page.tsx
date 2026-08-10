import Image from "next/image";
import BottomNav from "@/components/BottomNav";

export default function CertificadoPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* CONTENIDO */}
        <section className="flex flex-1 flex-col items-center px-4 pb-24 pt-8">
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-[#f39a1e]">
            Empresa Fundadora
          </p>

          <h1 className="mt-3 text-center text-[21px] font-light">
            Certificado
          </h1>

          <p className="mt-3 max-w-[300px] text-center text-[13px] leading-[19px] text-white/65">
            El reconocimiento que acredita la adhesión como Empresa
            Fundadora del MADdeM.
          </p>

          {/* CERTIFICADO */}
          <div className="mt-7 w-full overflow-hidden rounded-lg border border-[#27313a]">
            <Image
              src="/maddem/certificado.png"
              alt="Certificado de Empresa Fundadora del MADdeM"
              width={808}
              height={730}
              className="h-auto w-full"
              priority
            />
          </div>

          <p className="mt-5 text-center text-[11px] leading-[17px] text-white/45">
            El certificado forma parte del reconocimiento institucional
            otorgado a las Empresas Fundadoras.
          </p>
        </section>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
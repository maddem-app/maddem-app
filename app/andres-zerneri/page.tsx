import Image from "next/image";
import BottomNav from "@/components/BottomNav";

export default function AndresZerneriPage() {
  return (
    <main className="min-h-screen bg-[#02080d] text-white pb-24">
      {/* HERO */}
      <section className="relative w-full">
        <Image
          src="/maddem/andres-zerneri.png"
          alt="Andrés Zerneri trabajando en una escultura"
          width={1024}
          height={1536}
          className="h-auto w-full object-cover"
          priority
        />
      </section>

      {/* INTRODUCCIÓN */}
      <section className="px-6 pt-10 pb-8">
        <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#e88a18]">
          MADdeM
        </p>

        <h1 className="text-3xl font-light leading-tight">
          Andrés Zerneri
        </h1>

        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#e88a18]">
          Arte, memoria y compromiso
        </p>

        <div className="mt-6 h-px w-16 bg-[#e88a18]" />

        <p className="mt-6 text-[15px] leading-7 text-white/80">
          Artista visual, gestor cultural y creador de obras que dialogan
          con la identidad, la memoria y los valores de nuestra comunidad.
        </p>
      </section>

      {/* JUANA */}
      <section className="border-t border-white/10 px-6 py-8">
        <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-[#e88a18]">
          Una trayectoria
        </p>

        <h2 className="text-xl font-light leading-snug">
          Juana, la escultura en bronce más grande de Argentina
        </h2>

        <p className="mt-4 text-[15px] leading-7 text-white/75">
          Sobre este monumental Juana, de más de 10 metros de altura y
          25 toneladas de bronce, se ha convertido en un símbolo de
          resiliencia y fortaleza para todo el país.
        </p>
      </section>

      {/* PINTURA */}
      <section className="border-t border-white/10 px-6 py-8">
        <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-[#e88a18]">
          Pintura y expresión
        </p>

        <h2 className="text-xl font-light leading-snug">
          Una búsqueda constante a través del arte
        </h2>

        <p className="mt-4 text-[15px] leading-7 text-white/75">
          Autor de numerosas obras pictóricas. En la paz y armonía de la
          Patagonia encuentra un lugar donde profundizar en la figura
          humana y en la búsqueda constante del sentido a través del arte.
        </p>
      </section>

      {/* ROMA */}
      <section className="border-t border-white/10 px-6 py-8">
        <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-[#e88a18]">
          Presencia internacional
        </p>

        <h2 className="text-xl font-light leading-snug">
          Exposición permanente en Roma, Italia
        </h2>

        <p className="mt-4 text-[15px] leading-7 text-white/75">
          Sus obras integran la colección permanente del Contact Gallery
          de Roma, un espacio de arte contemporáneo que proyecta su trabajo
          a nivel internacional.
        </p>
      </section>

      {/* GESTIÓN CULTURAL */}
      <section className="border-t border-white/10 px-6 py-8">
        <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-[#e88a18]">
          Gestión y cultura
        </p>

        <h2 className="text-xl font-light leading-snug">
          Gestor y referente cultural
        </h2>

        <ul className="mt-5 space-y-3 text-[14px] leading-6 text-white/75">
          <li className="border-l border-[#e88a18] pl-4">
            Coordinador General de Cultura de la Provincia del Neuquén.
          </li>

          <li className="border-l border-[#e88a18] pl-4">
            Subsecretario de Cultura de la Municipalidad de Villa La
            Angostura.
          </li>

          <li className="border-l border-[#e88a18] pl-4">
            Creador y director del MAC (Museo de Arte Contemporáneo)
            Conrad Meier.
          </li>

          <li className="border-l border-[#e88a18] pl-4">
            Diplomatura en Gestión Cultural (Universidad Nacional de
            Córdoba).
          </li>

          <li className="border-l border-[#e88a18] pl-4">
            Autor de la tesis: “Gestión cultural y desarrollo local:
            modelos para una política sostenible”.
          </li>
        </ul>
      </section>

      {/* CIERRE ANDRÉS */}
      <section className="border-t border-white/10 px-6 py-10 text-center">
        <div className="mx-auto h-px w-16 bg-[#e88a18]" />

        <p className="mt-7 text-lg font-light leading-8 text-white/90">
          Su trayectoria refleja una vida dedicada al arte y a la cultura,
          con la convicción de que crear es también construir comunidad.
        </p>
      </section>

      {/* DIEGO */}
      <section className="mx-6 mb-8 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-7">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#e88a18]">
          Coordinación general del proyecto
        </p>

        <h2 className="mt-3 text-2xl font-light">
          Diego Carrizo
        </h2>

        <p className="mt-4 text-[14px] leading-6 text-white/70">
          Coordinación, desarrollo y articulación de los aspectos técnicos,
          tecnológicos, institucionales y operativos del proyecto MADdeM.
        </p>
      </section>

      {/* NAVEGACIÓN */}
      <BottomNav active="menu" />
    </main>
  );
}
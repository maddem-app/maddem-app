"use client";

import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

function InstagramIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.2 2.4 3.4 5.4 3.4 9s-1.2 6.6-3.4 9" />
      <path d="M12 3c-2.2 2.4-3.4 5.4-3.4 9s1.2 6.6 3.4 9" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.2 3.8l3 2.4-1.8 3.1c1 2.1 2.3 3.5 4.4 4.5l3.1-1.8 2.4 3c.6.8.5 1.9-.2 2.5l-1.3 1.1c-.7.6-1.7.8-2.6.5-5.7-1.8-9.8-5.9-11.6-11.6-.3-.9-.1-1.9.5-2.6l1.1-1.3c.6-.7 1.7-.8 2.5-.2z" />
    </svg>
  );
}

function PhoneContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const phone = "+54 11 3613 6130";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Si el navegador no permite copiar, no hacemos nada.
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Mostrar teléfono de Andrés Zerneri"
        title="Teléfono de Andrés Zerneri"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[25px] w-[25px] items-center justify-center text-[#e88a18]"
      >
        <PhoneIcon />
      </button>

      {isOpen && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-lg border border-white/10 bg-[#06121d] px-4 py-3 shadow-xl">
          <span className="whitespace-nowrap text-[13px] text-white/90">
            {phone}
          </span>

          <button
            type="button"
            aria-label="Copiar teléfono"
            title="Copiar teléfono"
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center text-[16px] text-[#e88a18]"
          >
            {copied ? "✓" : "⧉"}
          </button>
        </div>
      )}
    </div>
  );
}

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

      {/* CONTACTO ANDRÉS */}
      <section className="border-t border-white/10 px-6 py-8">
        <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-[#e88a18]">
          Contacto
        </p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-5 text-[#e88a18]">
          <a
            href="https://www.instagram.com/andreszerneri/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Andrés Zerneri"
            title="Instagram de Andrés Zerneri"
            className="flex items-center gap-2"
          >
            <InstagramIcon />
            <span className="text-[13px] text-white/80">Andrés Zerneri</span>
          </a>

          <a
            href="https://www.instagram.com/zerneriobras/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Obras"
            title="Instagram de Obras"
            className="flex items-center gap-2"
          >
            <InstagramIcon />
            <span className="text-[13px] text-white/80">Obras</span>
          </a>

          <div className="flex items-center gap-5">
            <PhoneContact />

            <a
              href="https://andreszerneri.com.ar"
              target="_blank"
              rel="noreferrer"
              aria-label="Sitio web de Andrés Zerneri"
              title="andreszerneri.com.ar"
              className="flex items-center gap-2"
            >
              <GlobeIcon />
              <span className="text-[13px] text-white/80">
                andreszerneri.com.ar
              </span>
            </a>
          </div>
        </div>
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

        <a
          href="tel:+541134490093"
          className="mt-4 inline-block text-[13px] text-[#e88a18]"
        >
          11 3449-0093
        </a>
      </section>

      {/* NAVEGACIÓN */}
      <BottomNav active="menu" />
    </main>
  );
}
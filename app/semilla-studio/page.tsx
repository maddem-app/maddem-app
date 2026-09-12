"use client";

import Image from "next/image";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

function MailIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="28"
      height="28"
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

function InstagramIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle
        cx="17.5"
        cy="6.7"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function PhoneContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const phone = "+54 11 3449 0093";

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
        aria-label="Mostrar teléfono de Semilla Studio"
        title="Teléfono de Semilla Studio"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center text-[#e88a18]"
      >
        <PhoneIcon />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-lg border border-white/10 bg-[#06121d] px-4 py-3 shadow-xl">
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

export default function SemillaStudioPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white pb-24">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* LOGO */}
        <div className="flex justify-center pt-3">
          <Image
            src="/images/semilla/logo.png"
            alt="Semilla Studio"
            width={180}
            height={180}
            className="h-auto w-[180px]"
          />
        </div>

        {/* CONTENIDO */}
        <section className="flex flex-1 flex-col items-center px-6 pt-12 text-center">
          <p className="max-w-[310px] text-[15px] leading-7 text-white/75">
            Una iniciativa desarrollada con compromiso y de manera ad honorem
            para acompañar la creación del MADdeM.
          </p>

          {/* CONTACTO */}
          <div className="mt-14 flex items-center gap-8 text-[#e88a18]">
            {/* EMAIL */}
            <a
              href="mailto:semillastudio@outlook.com.ar"
              aria-label="Email de Semilla Studio"
              title="Email de Semilla Studio"
              className="flex h-10 w-10 items-center justify-center"
            >
              <MailIcon />
            </a>

            {/* TELÉFONO */}
            <PhoneContact />

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/semillastudio.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Semilla Studio"
              title="@semillastudio.app"
              className="flex h-10 w-10 items-center justify-center"
            >
              <InstagramIcon />
            </a>
          </div>
        </section>

        {/* PIE */}
        <footer className="pb-5 text-center">
          <p className="text-[11px] tracking-[0.12em] text-white/45">
            Semilla Studio · 2026
          </p>
        </footer>

        {/* BOTTOM NAV */}
        <BottomNav active="menu" />
      </div>
    </main>
  );
}
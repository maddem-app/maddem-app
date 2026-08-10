"use client";

import Image from "next/image";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

const images = [
  {
    src: "/maddem/premio-maddem-1.png",
    alt: "Premio MADdeM durante una ceremonia junto al monumento",
  },
  {
    src: "/maddem/premio-maddem-2.png",
    alt: "Estatuillas del Premio MADdeM",
  },
  {
    src: "/maddem/premio-maddem-3.png",
    alt: "MADdeM al amanecer entre las montañas",
  },
];

export default function PremioMaddemPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#05080b] text-white">
      {/* HERO */}
      <section className="px-6 pt-10 pb-14">
        <div className="mx-auto max-w-xl">
          <div className="flex justify-center">
            <Image
              src="/maddem/logo-maddem.png"
              alt="MADdeM"
              width={180}
              height={100}
              className="h-auto w-[150px] object-contain"
              priority
            />
          </div>

          <div className="mt-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#c87532]">
              Premio MADdeM
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight text-[#f3eee6]">
              El MADdeM no termina
              <br />
              el día de su inauguración.
            </h1>

            <p className="mt-5 font-serif text-2xl leading-snug text-[#c87532]">
              Ese día comienza
              <br />
              una tradición.
            </p>
          </div>

          <div className="mx-auto mt-8 h-px w-16 bg-[#c87532]" />

          <p className="mt-8 text-center text-[16px] leading-7 text-[#d7d4cf]">
            Cada año, el <span className="text-[#c87532]">Premio MADdeM</span>{" "}
            reconocerá a personas, instituciones y proyectos que representan
            los valores del deporte de montaña.
          </p>
        </div>
      </section>

      {/* IMAGEN 1 */}
      <section className="px-4">
        <div
          className="relative mx-auto max-w-xl cursor-pointer overflow-hidden rounded-2xl"
          onClick={() => setSelectedImage(images[0].src)}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            width={900}
            height={1200}
            className="h-auto w-full object-cover"
          />

          <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-2 text-[11px] tracking-wide text-white backdrop-blur-sm">
            Tocar para ampliar
          </div>
        </div>
      </section>

      {/* TEXTO 1 */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-xl">
          <h2 className="font-serif text-3xl leading-tight text-[#f3eee6]">
            Reconocer a quienes
            <br />
            hacen grande la montaña.
          </h2>

          <div className="mt-6 h-px w-12 bg-[#c87532]" />

          <p className="mt-6 text-[16px] leading-7 text-[#d7d4cf]">
            El Premio MADdeM nace para poner en valor a quienes, desde
            distintos lugares, construyen la cultura del deporte de montaña.
          </p>

          <p className="mt-5 text-[16px] leading-7 text-[#d7d4cf]">
            Personas, instituciones y proyectos que inspiran, enseñan,
            cuidan, organizan y preservan.
          </p>

          <p className="mt-5 text-[16px] leading-7 text-[#d7d4cf]">
            Una distinción nacida en{" "}
            <span className="text-[#c87532]">Villa La Angostura</span> para
            reconocer esos valores y mantener viva una tradición que pueda
            crecer con cada generación.
          </p>
        </div>
      </section>

      {/* IMAGEN 2 */}
      <section className="px-4">
        <div
          className="relative mx-auto max-w-xl cursor-pointer overflow-hidden rounded-2xl"
          onClick={() => setSelectedImage(images[1].src)}
        >
          <Image
            src={images[1].src}
            alt={images[1].alt}
            width={900}
            height={1200}
            className="h-auto w-full object-cover"
          />

          <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-2 text-[11px] tracking-wide text-white backdrop-blur-sm">
            Tocar para ampliar
          </div>
        </div>
      </section>

      {/* TEXTO 2 */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-xl">
          <p className="text-center text-[11px] uppercase tracking-[0.35em] text-[#c87532]">
            Premio MADdeM
          </p>

          <h2 className="mt-4 text-center font-serif text-3xl leading-tight text-[#f3eee6]">
            Una distinción.
            <br />
            Una historia que comienza.
          </h2>

          <div className="mx-auto mt-7 h-px w-12 bg-[#c87532]" />

          <p className="mt-7 text-center text-[16px] leading-7 text-[#d7d4cf]">
            Cada edición podría tener sus protagonistas.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-[#c87532]/30 px-2 py-5">
              <span className="font-serif text-3xl text-[#c87532]">1°</span>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#d7d4cf]">
                Puesto
              </p>
            </div>

            <div className="rounded-xl border border-[#c87532]/30 px-2 py-5">
              <span className="font-serif text-3xl text-[#c87532]">2°</span>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#d7d4cf]">
                Puesto
              </p>
            </div>

            <div className="rounded-xl border border-[#c87532]/30 px-2 py-5">
              <span className="font-serif text-3xl text-[#c87532]">3°</span>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#d7d4cf]">
                Puesto
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-[16px] leading-7 text-[#d7d4cf]">
            Cada edición podrá construir, con el tiempo, la memoria del Premio MADdeM.
          </p>
        </div>
      </section>

      {/* IMAGEN 3 */}
      <section className="px-4">
        <div
          className="relative mx-auto max-w-xl cursor-pointer overflow-hidden rounded-2xl"
          onClick={() => setSelectedImage(images[2].src)}
        >
          <Image
            src={images[2].src}
            alt={images[2].alt}
            width={900}
            height={1200}
            className="h-auto w-full object-cover"
          />

          <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-2 text-[11px] tracking-wide text-white backdrop-blur-sm">
            Tocar para ampliar
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto h-px w-16 bg-[#c87532]" />

          <h2 className="mt-8 font-serif text-3xl leading-tight text-[#f3eee6]">
            Cada generación tendrá
            <br />
            sus protagonistas.
          </h2>

          <p className="mt-5 font-serif text-2xl leading-snug text-[#c87532]">
            El MADdeM los recordará.
          </p>

          <p className="mx-auto mt-8 max-w-md text-[15px] leading-7 text-[#aaa7a1]">
            Una tradición que nace en Villa La Angostura y que busca reconocer,
            año tras año, a quienes representan los valores del deporte de
            montaña.
          </p>

          <div className="mt-12 flex justify-center">
            <Image
              src="/maddem/logo-maddem.png"
              alt="MADdeM"
              width={140}
              height={80}
              className="h-auto w-[110px] object-contain opacity-90"
            />
          </div>
        </div>
      </section>

      {/* VISOR DE IMAGEN A PANTALLA COMPLETA */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm"
            aria-label="Cerrar imagen"
          >
            ×
          </button>

          <Image
            src={selectedImage}
            alt="Imagen ampliada del Premio MADdeM"
            width={1600}
            height={2200}
            className="max-h-[94vh] w-auto max-w-full object-contain"
          />
        </div>
      )}
      <BottomNav active="menu" />
    </main>
  );
}
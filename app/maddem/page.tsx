"use client";

import Image from "next/image";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

type ImageModalProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

function ImageModal({ src, alt, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm"
        aria-label="Cerrar imagen"
      >
        ×
      </button>

      <div
        className="relative flex h-full w-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

export default function MaddemPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const openImage = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
  };

  return (
    <main className="min-h-screen bg-[#080b0d] text-white">
      {/* HEADER */}
      <section className="px-6 pb-8 pt-10 text-center">
        <div className="mx-auto mb-8 w-[150px]">
          <Image
            src="/maddem/logo-maddem.png"
            alt="MADdeM - Monumento al Deporte de Montaña"
            width={300}
            height={180}
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#c87932]">
          Monumento al Deporte de Montaña
        </p>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight">
          Un símbolo para
          <span className="block text-[#d78a3b]">
            Villa La Angostura.
          </span>
        </h1>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-xl">
          <p className="text-lg leading-8 text-white/85">
            Hay momentos que ocurren una sola vez en la historia de una
            ciudad.
          </p>

          <p className="mt-6 text-lg leading-8 text-white/85">
            El reconocimiento de Villa La Angostura como{" "}
            <span className="font-semibold text-[#d78a3b]">
              Capital Provincial del Deporte de Montaña
            </span>{" "}
            es uno de esos momentos.
          </p>

          <p className="mt-6 text-lg leading-8 text-white/85">
            Esa ley reconoce una identidad que la comunidad construyó durante
            décadas.
          </p>

          <p className="mt-6 text-lg font-medium leading-8 text-[#d78a3b]">
            Pero toda gran capital necesita algo más que un reconocimiento.
            Necesita un símbolo capaz de representar esa identidad durante
            generaciones.
          </p>
        </div>
      </section>

      {/* IMAGEN PRINCIPAL */}
      <section className="px-4 pb-12">
        <button
          type="button"
          onClick={() =>
            openImage(
              "/maddem/maddem-1.png",
              "MADdeM - Monumento al Deporte de Montaña"
            )
          }
          className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl"
        >
          <Image
            src="/maddem/maddem-1.png"
            alt="MADdeM - Monumento al Deporte de Montaña"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-[#d78a3b]">
              MADdeM
            </p>
            <p className="mt-1 text-sm text-white/90">
              Monumento al Deporte de Montaña
            </p>
          </div>
        </button>

        <p className="mt-3 text-center text-xs text-white/40">
          Tocá la imagen para verla en pantalla completa
        </p>
      </section>

      {/* UN SÍMBOLO */}
      <section className="border-y border-white/10 bg-[#0d1114] px-6 py-12">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d78a3b]">
            Una identidad
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            Mucho más que un monumento.
          </h2>

          <p className="mt-6 text-base leading-7 text-white/75">
            El MADdeM nace para representar una identidad que ya existe:
            la relación de Villa La Angostura con la montaña, el deporte,
            el paisaje y las personas que hacen de este lugar un destino
            reconocido.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <p className="font-semibold text-[#d78a3b]">
                Un símbolo
              </p>
              <p className="mt-1 text-white/70">
                para Villa La Angostura.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#d78a3b]">
                Un punto de encuentro
              </p>
              <p className="mt-1 text-white/70">
                para la comunidad y quienes nos visitan.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#d78a3b]">
                Un embajador
              </p>
              <p className="mt-1 text-white/70">
                del deporte de montaña.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#d78a3b]">
                Un legado
              </p>
              <p className="mt-1 text-white/70">
                para las próximas generaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FICHA TÉCNICA */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d78a3b]">
            La obra
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            Diseñada para perdurar.
          </h2>

          <p className="mt-5 text-base leading-7 text-white/70">
            El MADdeM está concebido para integrarse al paisaje patagónico
            y evolucionar junto con él.
          </p>

          {/* IMAGEN TÉCNICA */}
          <button
            type="button"
            onClick={() =>
              openImage(
                "/maddem/maddem-2.png",
                "MADdeM - Dimensiones, material e iluminación"
              )
            }
            className="group relative mt-8 block aspect-[3/4] w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/maddem/maddem-2.png"
              alt="MADdeM - Dimensiones, material e iluminación"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>

          {/* DIMENSIONES */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">
              Dimensiones
            </h3>

            <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
              <div className="flex items-center justify-between py-4">
                <span className="text-white/60">Altura total</span>
                <span className="font-medium">6 metros</span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-white/60">Esfera</span>
                <span className="font-medium">3 metros</span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-white/60">Pedestal</span>
                <span className="text-right font-medium">
                  3 × 3 × 3 metros
                </span>
              </div>
            </div>
          </div>

          {/* MATERIAL */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold">
              Material
            </h3>

            <p className="mt-3 text-base leading-7 text-white/70">
              Acero Corten, elegido por su capacidad de permanecer a la
              intemperie y desarrollar con el tiempo una pátina natural
              de óxido que protege el material.
            </p>

            <p className="mt-3 text-base leading-7 text-white/70">
              Su aspecto evoluciona junto con el paisaje patagónico,
              convirtiendo el paso del tiempo en parte de la obra.
            </p>
          </div>

          {/* ILUMINACIÓN */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold">
              Iluminación
            </h3>

            <p className="mt-3 text-base leading-7 text-white/70">
              Iluminación arquitectónica LED de bajo consumo, pensada para
              realzar el monumento durante la noche y convertirlo en un
              nuevo punto de referencia para Villa La Angostura.
            </p>
          </div>
        </div>
      </section>

      {/* PAISAJE */}
      <section className="px-4 pb-12">
        <button
          type="button"
          onClick={() =>
            openImage(
              "/maddem/maddem-3.png",
              "MADdeM integrado al paisaje de Villa La Angostura"
            )
          }
          className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl"
        >
          <Image
            src="/maddem/maddem-3.png"
            alt="MADdeM integrado al paisaje de Villa La Angostura"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-left">
            <p className="text-2xl font-semibold leading-tight">
              Integrarse al paisaje.
            </p>

            <p className="mt-2 text-sm text-white/75">
              Sin competir con él.
            </p>
          </div>
        </button>
      </section>

      {/* CONCEPTO */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d78a3b]">
            El significado
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            Un lugar con significado.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/80">
            No estamos construyendo solamente una escultura.
          </p>

          <p className="mt-4 text-lg leading-8 text-white/80">
            Estamos construyendo un lugar donde las personas puedan
            encontrarse, reconocerse, fotografiarse y construir recuerdos.
          </p>

          <p className="mt-6 text-lg font-medium leading-8 text-[#d78a3b]">
            Un símbolo capaz de acompañar a Villa La Angostura durante
            generaciones.
          </p>
        </div>
      </section>

      {/* LEY */}
      <section className="border-t border-white/10 bg-[#0d1114] px-6 py-12">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d78a3b]">
            El origen
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            Un reconocimiento oficial.
          </h2>

          <p className="mt-5 text-base leading-7 text-white/75">
            La Ley Provincial N.º 3521 declara a Villa La Angostura
            Capital Provincial del Deporte de Montaña y establece como
            objetivo promover, fomentar y desarrollar las actividades
            deportivas, recreativas y turísticas vinculadas a la práctica
            de deportes de montaña.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white">
            <button
              type="button"
              onClick={() =>
                openImage(
                  "/maddem/Ley%203521.png",
                  "Ley Provincial N.º 3521"
                )
              }
              className="relative block aspect-[0.78] w-full"
            >
              <Image
                src="/maddem/Ley%203521.png"
                alt="Ley Provincial N.º 3521"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-contain"
              />
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-white/40">
            Tocá el documento para verlo completo
          </p>
        </div>
      </section>

      {/* CIERRE */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto mb-7 h-px w-16 bg-[#d78a3b]" />

          <h2 className="text-3xl font-semibold leading-tight">
            Villa La Angostura
            <span className="block text-[#d78a3b]">
              ya tiene una identidad.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Hoy es tiempo de darle un símbolo.
          </p>

          <div className="mx-auto mt-10 w-[120px]">
            <Image
              src="/maddem/logo-maddem.png"
              alt="MADdeM"
              width={240}
              height={144}
              className="h-auto w-full object-contain opacity-90"
            />
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/40">
            Monumento al Deporte de Montaña
          </p>
        </div>
      </section>

      {/* MODAL DE IMAGEN */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
      
      {/* BOTTOM NAV */}
      <BottomNav active="menu" />
    </main>
  );
}
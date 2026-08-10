"use client";

import BottomNav from "@/components/BottomNav";

function ConstructionIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 27L15 16L19 20L28 11"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8L24 4L28 8L24 12"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 27H27"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MaterialsIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10L16 4L28 10L16 16L4 10Z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 16L16 22L28 16"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 22L16 28L28 22"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TransportIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 9H21V22H3V9Z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M21 14H25L29 18V22H21V14Z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="23"
        r="2.5"
        stroke="#F59E0B"
        strokeWidth="1.8"
      />
      <circle
        cx="24"
        cy="23"
        r="2.5"
        stroke="#F59E0B"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="16"
        cy="14"
        r="7"
        stroke="#F59E0B"
        strokeWidth="1.8"
      />
      <path
        d="M13 22H19"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 25H18"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 2V5M16 23V20M4 14H7M25 14H28M7.5 5.5L9.5 7.5M22.5 20.5L24.5 22.5M24.5 5.5L22.5 7.5M9.5 20.5L7.5 22.5"
        stroke="#F59E0B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const destinations = [
  {
    icon: <ConstructionIcon />,
    title: "CONSTRUCCIÓN",
    text: "Mano de obra especializada y ejecución de la obra en Villa La Angostura.",
  },
  {
    icon: <MaterialsIcon />,
    title: "MATERIALES",
    text: "Materiales de alta calidad para garantizar durabilidad y belleza en el tiempo.",
  },
  {
    icon: <TransportIcon />,
    title: "TRASLADO E INSTALACIÓN",
    text: "Transporte seguro e instalación profesional en su ubicación definitiva.",
  },
  {
    icon: <LightIcon />,
    title: "ILUMINACIÓN",
    text: "Sistema de iluminación artística que hará del MADdeM un faro para nuestra comunidad.",
  },
];

export default function DestinoPage() {
  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-24">
        {/* HEADER */}
        <header className="pt-8">
          <div className="text-[25px] leading-none text-[#F59E0B]">
            MADdeM
          </div>

          <div className="mt-1 text-[10px] leading-[1.2] tracking-wide text-white">
            MONUMENTO AL DEPORTE
            <br />
            DE ALTA MONTAÑA
          </div>
        </header>

        {/* TITLE */}
        <section className="mt-8">
          <h1 className="text-[20px] font-normal leading-tight">
            Destino de los aportes
          </h1>

          <p className="mt-2 max-w-[300px] text-[13px] leading-[1.45] text-white/80">
            Cada aporte recibido se destina exclusivamente a la realización
            del MADdeM.
          </p>
        </section>

        {/* DESTINATIONS */}
        <section className="mt-6 overflow-hidden rounded-xl border border-[#6b3b0b]">
          <div className="px-4 py-3 text-center text-[14px] font-medium tracking-wide">
            DESTINO DE LOS APORTES
          </div>

          <div className="divide-y divide-[#27313a]">
            {destinations.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 px-4 py-4"
              >
                <div className="flex w-12 shrink-0 items-center justify-center">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h2 className="text-[12px] font-medium tracking-wide">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-[12px] leading-[1.35] text-white/80">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="mt-6 px-2 text-center">
          <p className="text-[14px] leading-[1.4] text-[#F59E0B]">
            Reportes periódicos y actualizaciones
            <br />
            para todas las Empresas Fundadoras.
          </p>
        </section>
      </div>

      {/* BOTTOM NAV */}
      <BottomNav active="destino" />
    </main>
  );
}
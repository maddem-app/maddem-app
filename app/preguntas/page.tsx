import BottomNav from "@/components/BottomNav";

export default function PreguntasFrecuentesPage() {
  const faqs = [
    {
      question: "¿Para adherirme tengo que transferir el dinero?",
      answer:
        "No. Durante la etapa fundadora, la adhesión consiste en realizar una donación nominal: la empresa declara el aporte con el que se compromete a acompañar el proyecto. Una vez alcanzado el objetivo económico total, comenzará el proceso de solicitar a cada Empresa Fundadora el depósito del aporte comprometido.",
    },
    {
      question: "¿Qué significa ser Empresa Fundadora?",
      answer:
        "Significa formar parte de las empresas que hicieron posible la realización del MADdeM desde su etapa inicial. La condición de Empresa Fundadora quedará vinculada para siempre a la historia del monumento.",
    },
    {
      question: "¿Dónde quedará registrado mi aporte?",
      answer:
        "Además del certificado digital que recibirá cada Empresa Fundadora al finalizar el proyecto, los tres lados secundarios del pedestal estarán destinados a placas con los nombres de las empresas fundadoras. La cara principal del pedestal quedará reservada para la identidad del monumento.",
    },
    {
      question: "¿Qué significa que mi empresa figure en el monumento?",
      answer:
        "El MADdeM está pensado para convertirse en un símbolo y embajador de Villa La Angostura. Ser Empresa Fundadora significa que el nombre de tu empresa quedará asociado físicamente a ese patrimonio y podrá ser reconocido por quienes visiten el monumento durante generaciones.",
    },
    {
      question: "¿A dónde va destinado mi aporte?",
      answer:
        "Los aportes permiten hacer posible las distintas etapas necesarias para la realización del MADdeM: construcción, materiales, traslado, instalación e iluminación.",
    },
    {
      question: "¿Cómo puedo saber cuánto falta para iniciar la construcción?",
      answer:
        "La pantalla Estado del Proyecto muestra en tiempo real la cantidad de Empresas Fundadoras, el objetivo económico y el monto pendiente para iniciar la construcción.",
    },
    {
      question: "¿Cómo conoceré los avances?",
      answer:
        "En Novedades se comunicarán los avances y acontecimientos más importantes del proyecto a medida que se produzcan.",
    },
    {
      question: "¿Qué es el Premio MADdeM?",
      answer:
        "El Premio MADdeM será una distinción anual destinada a reconocer a personas, instituciones y proyectos que representen los valores del deporte de montaña. El premio comenzará una vez realizado el MADdeM y formará parte de las acciones que acompañarán su desarrollo a lo largo del tiempo.",
    },
    {
      question: "¿Qué recibirá mi empresa por ser Empresa Fundadora?",
      answer:
        "Al finalizar el proyecto, cada Empresa Fundadora recibirá un certificado digital que acreditará su condición de Empresa Fundadora del MADdeM. Además, su nombre formará parte de las placas instaladas en el pedestal del monumento.",
    },
    {
      question: "¿Puedo retirar mi adhesión?",
      answer:
        "Sí. La solicitud puede realizarse desde la opción Desadhesión del menú.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020b14] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* HEADER */}
        <header className="flex items-start justify-between px-5 pb-5 pt-6">
          <div>
            <div className="text-[25px] leading-none tracking-tight">
              <span className="font-semibold text-[#f39a1e]">MAD</span>
              <span className="font-normal text-white">deM</span>
            </div>

            <div className="mt-1 text-[10px] leading-[12px] tracking-wide text-white/90">
              MONUMENTO AL DEPORTE
              <br />
              DE MONTAÑA
            </div>
          </div>

          {/* Campana */}
          <button
            type="button"
            aria-label="Notificaciones"
            className="mt-1 flex h-9 w-9 items-center justify-center text-white"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
          </button>
        </header>

        {/* CONTENIDO */}
        <section className="flex-1 px-5 pb-24">
          <h1 className="mb-5 text-[16px] font-medium tracking-wide text-white">
            PREGUNTAS FRECUENTES
          </h1>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border border-[#2b3540] bg-[#06121d]/80"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-[14px] text-white/90">
                  <span className="pr-4">{faq.question}</span>

                  <span className="shrink-0 text-[22px] font-light leading-none text-[#f39a1e] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-[#2b3540] px-4 py-4 text-[12px] leading-[18px] text-white/65">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* BOTTOM NAV */}
<BottomNav active="menu" />
      </div>
    </main>
  );
}

function NavItem({
  active = false,
  icon,
  label,
}: {
  active?: boolean;
  icon: "state" | "companies" | "destination" | "menu";
  label: string;
}) {
  const color = active ? "#f39a1e" : "#ffffff";

  return (
    <button
      type="button"
      className="flex flex-1 flex-col items-center justify-center gap-1"
      style={{ color }}
    >
      {icon === "state" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 20V10" />
          <path d="M12 20V5" />
          <path d="M19 20v-8" />
        </svg>
      )}

      {icon === "companies" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="7" r="3" />
          <path d="M6 20c0-4 2.5-6 6-6s6 2 6 6" />
          <circle cx="5" cy="10" r="2" />
          <circle cx="19" cy="10" r="2" />
        </svg>
      )}

      {icon === "destination" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20l7-12 3 5 3-5 3 12" />
          <path d="M8 20h8" />
        </svg>
      )}

      {icon === "menu" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )}

      <span className="text-[9px]">{label}</span>
    </button>
  );
}
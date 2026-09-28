"use client";
/* Carrossel de serviços com contato por WhatsApp já com o nome do serviço */
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Scissors, Syringe, CarTaxiFront, Hotel, Clock } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsappLink } from "../../lib/whatsapp";

const services = [
  { title: "Banho & Tosa", description: "Inclui banho com produtos específicos para o tipo de pelagem e pele do animal, corte de unhas, limpeza das orelhas e tosa personalizada (higiênica ou estilizada).", duration: "1h", icon: Scissors },
  { title: "Consulta Veterinária", description: "Oferece atendimento clínico básico ou especializado para cuidar da saúde do animal. Inclui diagnóstico de doenças, aplicação de vacinas obrigatórias.", duration: "1h", icon: Syringe },
  { title: "Táxi Pet", description: "Serviço de transporte para levar e buscar os pets no petshop, clínicas veterinárias ou outros locais. Ideal para tutores que não têm tempo ou transporte adequado para locomover os animais.", duration: "2h", icon: CarTaxiFront },
  { title: "Hotel para pets", description: "Serviço de hospedagem para animais de estimação, ideal para quando os tutores precisam viajar ou se ausentar por alguns dias. Os pets ficam acomodados em espaços seguros, confortáveis.", duration: "1h", icon: Hotel },
];

export function Services() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", slidesToScroll: 1, breakpoints: { "(min-width: 768px)": { slidesToScroll: 3 } } });

  return (
    <section className="bg-white py-16" aria-labelledby="servicos-title" aria-roledescription="carrossel">
      <div className="container mx-auto px-4">
        <h2 id="servicos-title" className="text-4xl font-bold mb-12">Serviços</h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="flex">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3">
                    <article className="bg-[#1e293b] text-white rounded-2xl p-6 space-y-4 h-full flex flex-col">
                      <div className="flex-1 flex gap-3">
                        <Icon className="w-8 h-8 shrink-0" aria-hidden="true" />
                        <div>
                          <h3 className="font-bold text-xl my-1">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          <span><span className="sr-only">Duração: </span>{item.duration}</span>
                        </div>
                        <a target="_blank" rel="noopener noreferrer"
                          href={whatsappLink(`Olá, vim pelo site e gostaria de mais informações sobre ${item.title}.`)}
                          className="flex items-center justify-center gap-2 hover:bg-red-700 px-4 py-1 rounded-md duration-300"
                          aria-label={`Falar sobre ${item.title} pelo WhatsApp (abre em nova aba)`}>
                          <WhatsappLogo className="w-5 h-5" aria-hidden="true" />
                          Entrar em contato
                        </a>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
          <button type="button" aria-label="Serviços anteriores" className="bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute left-3 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10" onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft className="w-6 h-6 text-gray-700" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Próximos serviços" className="bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute -right-6 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10" onClick={() => emblaApi?.scrollNext()}>
            <ChevronRight className="w-6 h-6 text-gray-700" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
/* Fim de services.tsx */

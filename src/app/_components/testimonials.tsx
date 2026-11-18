"use client";
/* Carrossel de depoimentos, sem loop e acessível por teclado; enquanto o site for demonstração, eles aparecem marcados como ilustrativos */
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import tutor1 from "../../../public/tutor1.png";
import tutor2 from "../../../public/tutor2.png";
import { site } from "../../config/site";
import { useCarrossel } from "./use-carrossel";

const testimonials = [
  { content: "Desde que comecei a levar a Luna para banho e tosa aqui, ela nunca esteve tão feliz! O atendimento é impecável, os profissionais são super cuidadosos e sempre deixam minha peluda linda e cheirosa. Recomendo de olhos fechados!", author: "Mariana Souza", role: "Tutora da Luna (Golden Retriever)", image: tutor2 },
  { content: "O serviço de hotel para pets foi uma experiência incrível! Precisei viajar e fiquei tranquilo sabendo que o Thor estava sendo bem cuidado. Recebi fotos e atualizações diárias, e ele voltou para casa super feliz! Sem dúvida, o melhor petshop da região.", author: "Rafael", role: "Tutor do Thor (Bulldog Francês)", image: tutor1 },
  { content: "Meus gatos nunca gostaram de sair de casa, mas o atendimento nesse petshop fez toda a diferença. A equipe é muito paciente e cuidadosa, e o serviço de banho especializado para felinos foi maravilhoso! Agora sei onde confiar o cuidado deles.", author: "Camila Fernandes", role: "Tutora da Mel e do Max", image: tutor2 },
];

export function Testimonials() {
  const [emblaRef, c] = useCarrossel({});

  return (
    <section className="bg-[#FFD449] py-16" aria-labelledby="depoimentos-title" aria-roledescription="carrossel">
      <div className="container mx-auto px-4">
        <h2 id="depoimentos-title" className="text-4xl font-bold text-center mb-4">Depoimentos dos nossos clientes</h2>
        {site.isDemo && <p className="text-center mb-8 text-sm">Depoimentos ilustrativos deste site de demonstração.</p>}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="flex">
              {testimonials.map((item, i) => (
                <li key={item.author} inert={c.foraDaTela(i)} className="flex-[0_0_100%] min-w-0 px-3">
                  <figure className="bg-[#1e293b] text-white rounded-2xl p-6 h-full flex flex-col items-center text-center space-y-4">
                    <div className="relative w-24 h-24">
                      <Image src={item.image} alt="" fill sizes="96px" className="object-cover rounded-full" />
                    </div>
                    <blockquote className="text-gray-200">{item.content}</blockquote>
                    <figcaption>
                      <p className="font-bold">{item.author}</p>
                      <p className="text-sm text-gray-300">{item.role}</p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
          <p aria-live="polite" className="sr-only">{c.posicao}</p>
          <button data-carrossel="anterior" type="button" aria-label="Depoimento anterior" disabled={!c.podeVoltar} className="disabled:opacity-40 disabled:cursor-not-allowed bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute left-3 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10" onClick={c.voltar}>
            <ChevronLeft className="w-6 h-6 text-gray-700" aria-hidden="true" />
          </button>
          <button data-carrossel="proximo" type="button" aria-label="Próximo depoimento" disabled={!c.podeAvancar} className="disabled:opacity-40 disabled:cursor-not-allowed bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute -right-6 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10" onClick={c.avancar}>
            <ChevronRight className="w-6 h-6 text-gray-700" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
/* Fim de testimonials.tsx */

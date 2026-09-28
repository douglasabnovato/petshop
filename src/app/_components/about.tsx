/* Sobre: fotos, diferenciais e contatos (texto antes em inglês; endereço agora leva ao mapa) */
import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import about1Img from "../../../public/about-1.png";
import about2Img from "../../../public/about-2.png";
import { whatsappLink } from "../../lib/whatsapp";
import { site } from "../../config/site";

export function About() {
  return (
    <section className="bg-[#FDF6ec] py-16" aria-labelledby="sobre-title">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative" data-aos="fade-up-right" data-aos-delay="300">
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden">
              <Image src={about1Img} alt="Cachorro recebendo carinho da equipe" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover hover:scale-110 duration-300" />
            </div>
            <div className="absolute w-40 h-40 right-4 -bottom-8 border-4 overflow-hidden rounded-lg border-white">
              <Image src={about2Img} alt="" fill sizes="160px" />
            </div>
          </div>

          <div className="space-y-6 mt-10" data-aos="fade-up-left" data-aos-delay="300">
            <h2 id="sobre-title" className="text-4xl font-bold">Sobre</h2>
            <p>
              Quem nunca amou um animal ainda não despertou uma parte da própria alma. Acreditamos nisso e em oferecer, com
              facilidade, o que faz bem para o corpo e para o coração do seu pet: serviços cuidadosos, atendimento atencioso e
              um espaço seguro.
            </p>
            <ul className="space-y-4">
              {["Aberto desde 2006.", "Equipe com mais de 10 veterinários.", "Qualidade é nossa prioridade."].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="text-red-700" aria-hidden="true" />{t}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <a target="_blank" rel="noopener noreferrer" href={whatsappLink()} className="bg-[#C0392B] text-white flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md">
                <WhatsappLogo className="w-5 h-5 text-white" aria-hidden="true" />
                Contato via WhatsApp
                <span className="sr-only">(abre em nova aba)</span>
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md underline">
                <MapPin className="w-5 h-5 text-black" aria-hidden="true" />
                Endereço da loja
                <span className="sr-only">(abre o mapa em nova aba)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* Fim de about.tsx */

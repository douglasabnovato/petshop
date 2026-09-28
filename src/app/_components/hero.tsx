/* Hero: chamada principal com contato por WhatsApp (contraste AA no botão e no texto) */
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import dogImg from "../../../public/hero-dog.webp";
import catImg from "../../../public/cat-hero.png";
import { whatsappLink } from "../../lib/whatsapp";

export function Hero() {
  return (
    <section className="bg-[#C0392B] text-white relative overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden="true">
        <Image src={dogImg} alt="" fill sizes="100vw" priority className="object-cover opacity-60 lg:hidden" />
        <div className="absolute inset-0 bg-black opacity-50 md:hidden" />
      </div>

      <div className="container mx-auto pt-16 pb-16 md:pb-0 px-4 relative">
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 id="hero-title" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Seu pet merece cuidado, carinho e atenção especial.
            </h1>
            <p className="lg:text-lg">
              Oferecemos os melhores serviços para garantir o bem-estar e a felicidade do seu amigo de quatro patas.
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={whatsappLink()}
              className="bg-green-700 hover:bg-green-800 px-5 py-2 rounded-md font-semibold flex items-center justify-center w-fit gap-2"
            >
              <WhatsappLogo className="w-5 h-5" aria-hidden="true" />
              Contato via WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            <div className="mt-8">
              <p className="text-sm mb-4">
                <b className="bg-black text-white px-2 py-1 rounded-md">5%</b> de desconto na primeira compra.
              </p>
              <div className="flex mt-4">
                <div className="w-32 hidden lg:block">
                  <Image src={catImg} alt="" sizes="128px" className="object-fill" />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block h-full relative min-h-[420px]">
            <Image src={dogImg} alt="Cachorro sorridente" className="object-contain" fill sizes="(max-width: 768px) 0vw, 50vw" priority />
          </div>
        </article>
      </div>
    </section>
  );
}
/* Fim de hero.tsx */

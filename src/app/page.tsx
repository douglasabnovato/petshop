/* Página inicial: hero, sobre, serviços, perguntas frequentes, depoimentos e rodapé */
import { About } from "./_components/about";
import { Faq } from "./_components/faq";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Testimonials } from "./_components/testimonials";

export default function Home() {
  return (
    <>
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <Faq />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
/* Fim de page.tsx */

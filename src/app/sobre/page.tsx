/* Página Sobre (antes só um título "Pagina sobre") */
import type { Metadata } from "next";
import Link from "next/link";
import { About } from "../_components/about";
import { Footer } from "../_components/footer";

export const metadata: Metadata = { title: "Sobre nós" };

export default function Sobre() {
  return (
    <>
      <main id="conteudo">
        <nav className="container mx-auto px-4 py-4"><Link href="/" className="underline">← Voltar ao início</Link></nav>
        <h1 className="sr-only">Sobre nós</h1>
        <About />
      </main>
      <Footer />
    </>
  );
}
/* Fim de sobre/page.tsx */

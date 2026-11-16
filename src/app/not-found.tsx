/* Página 404 em português, com volta ao início. Na exportação estática vira o out/404.html que o GitHub Pages serve
   (antes era a página padrão do Next, em inglês e sem link). Componente de servidor, como pede a documentação do Next */
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "./_components/footer";

export const metadata: Metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <>
      <main id="conteudo" className="container mx-auto px-4 py-16 space-y-6">
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p>O endereço que você abriu não existe ou mudou de lugar.</p>
        <Link href="/" className="inline-block underline">Voltar ao início</Link>
      </main>
      <Footer />
    </>
  );
}
/* Fim de not-found.tsx */

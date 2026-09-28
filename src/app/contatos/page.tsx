/* Página de contatos com WhatsApp, e-mail, telefone, endereço e horário (antes só um título) */
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../_components/footer";
import { site } from "../../config/site";
import { whatsappLink } from "../../lib/whatsapp";

export const metadata: Metadata = { title: "Contatos" };

export default function Contatos() {
  return (
    <>
      <main id="conteudo" className="container mx-auto px-4 py-10 space-y-6">
        <Link href="/" className="underline">← Voltar ao início</Link>
        <h1 className="text-4xl font-bold">Contatos</h1>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div><dt className="font-semibold">WhatsApp</dt><dd><a className="underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.phoneDisplay}<span className="sr-only"> (abre em nova aba)</span></a></dd></div>
          <div><dt className="font-semibold">E-mail</dt><dd><a className="underline" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
          <div><dt className="font-semibold">Endereço</dt><dd>{site.address} — <a className="underline" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">ver no mapa<span className="sr-only"> (abre em nova aba)</span></a></dd></div>
          <div><dt className="font-semibold">Horário</dt><dd>{site.openingHours}</dd></div>
        </dl>
      </main>
      <Footer />
    </>
  );
}
/* Fim de contatos/page.tsx */

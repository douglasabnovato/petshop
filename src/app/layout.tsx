/* Layout raiz: idioma pt-BR, metadados de SEO/redes sociais, dados estruturados PetStore, fonte Geist local (sem depender do Google Fonts no build) */
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AosInit } from "./_components/aos-init";
import { site } from "../config/site";
import { jsonLdScript, petStoreJsonLd } from "../lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — cuidado, carinho e atenção para o seu pet`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, locale: "pt_BR", type: "website", images: ["/foto-hero.webp"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded">
          Pular para o conteúdo
        </a>
        {children}
        <AosInit />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(petStoreJsonLd()) }} />
      </body>
    </html>
  );
}
/* Fim de layout.tsx */

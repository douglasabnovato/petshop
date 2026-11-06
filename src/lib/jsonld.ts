/* Dados estruturados (schema.org PetStore) montados a partir de config/site.ts; o mesmo conteúdo visível na página */
import { site } from "../config/site";

type Site = typeof site;

/* Objeto JSON-LD do pet shop: nome, contato, endereço e horário */
export function petStoreJsonLd(s: Site = site) {
  const sameAs = s.social.map((r) => r.url).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: s.name,
    description: s.description,
    url: s.url,
    telephone: `+${s.whatsapp}`,
    email: s.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.addressParts.street,
      addressLocality: s.addressParts.city,
      addressRegion: s.addressParts.region,
      addressCountry: s.addressParts.country,
    },
    openingHours: [...s.openingHoursSchema],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/* Texto seguro para <script type="application/ld+json">: "\\u003c" escapado para não fechar a tag */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
/* Fim de jsonld.ts */

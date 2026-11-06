/* Testes dos dados estruturados (PetStore) e das perguntas frequentes */
import { describe, it, expect } from "vitest";
import { jsonLdScript, petStoreJsonLd } from "../src/lib/jsonld";
import { faq } from "../src/config/faq";
import { site } from "../src/config/site";

describe("petStoreJsonLd", () => {
  it("usa o tipo PetStore e os dados de config/site.ts", () => {
    const d = petStoreJsonLd();
    expect(d["@type"]).toBe("PetStore");
    expect(d.name).toBe(site.name);
    expect(d.telephone).toBe(`+${site.whatsapp}`);
    expect(d.address.addressLocality).toBe("Campo Grande");
  });
  it("horário no formato do schema.org (Mo-Sa 08:00-18:00)", () => {
    for (const h of petStoreJsonLd().openingHours) expect(h).toMatch(/^(Mo|Tu|We|Th|Fr|Sa|Su)(-(Mo|Tu|We|Th|Fr|Sa|Su))? \d{2}:\d{2}-\d{2}:\d{2}$/);
  });
  it("só lista redes com URL e escapa < no script", () => {
    expect("sameAs" in petStoreJsonLd()).toBe(false);
    const comRede = petStoreJsonLd({ ...site, social: [{ name: "Instagram", url: "https://instagram.com/x" }] } as unknown as typeof site);
    expect(comRede.sameAs).toEqual(["https://instagram.com/x"]);
    expect(jsonLdScript({ a: "</script>" })).not.toContain("</script>");
  });
});

describe("faq", () => {
  it("tem de 4 a 8 perguntas com id único, pergunta terminando em ? e resposta", () => {
    expect(faq.length).toBeGreaterThanOrEqual(4);
    expect(faq.length).toBeLessThanOrEqual(8);
    expect(new Set(faq.map((f) => f.id)).size).toBe(faq.length);
    for (const f of faq) {
      expect(f.pergunta.endsWith("?")).toBe(true);
      expect(f.resposta.length).toBeGreaterThan(20);
    }
  });
});
/* Fim de conteudo.test.ts */

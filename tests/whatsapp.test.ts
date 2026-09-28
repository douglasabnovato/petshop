/* Testes do link do WhatsApp e dos dados do site */
import { describe, it, expect } from "vitest";
import { whatsappLink } from "../src/lib/whatsapp";
import { site } from "../src/config/site";

describe("whatsappLink", () => {
  it("codifica acentos, espaços e & na mensagem", () => {
    const url = new URL(whatsappLink("Olá! Banho & tosa"));
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toBe("Olá! Banho & tosa");
    expect(url.toString()).not.toContain(" ");
  });
  it("número só com dígitos, com DDI", () => {
    expect(site.whatsapp).toMatch(/^55\d{10,11}$/);
  });
});
/* Fim de whatsapp.test.ts */

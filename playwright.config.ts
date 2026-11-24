/* Playwright: testes no Chromium contra o site exportado (out/) servido em /petshop/; a porta vem de PORT (padrão 4174).
   Com BASE_URL (por exemplo, https://douglasabnovato.github.io/petshop/), os testes rodam contra esse endereço e o servidor local não sobe */
import { defineConfig } from "@playwright/test";

const porta = Number(process.env.PORT || 4174);
const externa = process.env.BASE_URL;
const baseURL = externa ? (externa.endsWith("/") ? externa : `${externa}/`) : `http://localhost:${porta}/petshop/`;

export default defineConfig({
  testDir: "e2e",
  testMatch: "*.e2e.ts",
  reporter: "list",
  use: { baseURL, browserName: "chromium" },
  webServer: externa
    ? undefined
    : { command: "node e2e/servidor.mjs", url: baseURL, reuseExistingServer: !process.env.CI, env: { PORT: String(porta) } },
});
/* Fim de playwright.config.ts */

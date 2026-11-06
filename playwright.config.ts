/* Playwright: testes no Chromium contra o site exportado (out/) servido em /petshop/ */
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  testMatch: "*.e2e.ts",
  reporter: "list",
  use: { baseURL: "http://localhost:4174/petshop/", browserName: "chromium" },
  webServer: { command: "node e2e/servidor.mjs", url: "http://localhost:4174/petshop/", reuseExistingServer: !process.env.CI },
});
/* Fim de playwright.config.ts */

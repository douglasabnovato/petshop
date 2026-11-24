/* Guarda do alvo (R19 do #42): com BASE_URL, confere antes da rodada que o endereço é o petshop, e não outro site nem a 404 do GitHub Pages */
import type { FullConfig } from "@playwright/test";

export default async function alvo(config: FullConfig) {
  const baseURL = String(config.projects[0]?.use.baseURL ?? "");
  console.log(`Testando contra ${baseURL}`);
  if (!process.env.BASE_URL) return;
  let status = 0;
  let html = "";
  try {
    const r = await fetch(baseURL, { redirect: "follow" });
    status = r.status;
    html = await r.text();
  } catch (erro) {
    throw new Error(`BASE_URL não responde: ${baseURL} (${(erro as Error).message})`);
  }
  if (status !== 200 || !html.includes("<title>Pet Shop Dev")) {
    throw new Error(`BASE_URL não é o petshop: ${baseURL} (status ${status})`);
  }
}
/* Fim de e2e/alvo.setup.ts */

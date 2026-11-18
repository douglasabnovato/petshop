/* Carrosséis de serviços e depoimentos pelo teclado: o Tab não cai em slide fora da tela, os botões param nas pontas e a posição é anunciada */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

/* Mostra os blocos do AOS no estado final, como nos outros testes */
async function semAnimacao(page: Page) {
  await page.addStyleTag({ content: "[data-aos]{opacity:1!important;transform:none!important;transition:none!important}" });
}

const servicos = (page: Page) => page.getByRole("region", { name: "Serviços" });
const depoimentos = (page: Page) => page.getByRole("region", { name: "Depoimentos dos nossos clientes" });

/* Texto do elemento com foco (inclui o texto só para leitor de tela); null quando o foco sai da página */
async function textoDoFoco(page: Page) {
  return page.evaluate(() => {
    const a = document.activeElement as HTMLElement | null;
    if (!a || a === document.body) return null;
    return a.textContent?.trim() || a.getAttribute("aria-label") || a.tagName;
  });
}

test.use({ viewport: { width: 1280, height: 900 } });

test("o Tab percorre a página inteira sem cair em slide fora da tela", async ({ page }) => {
  await page.goto("./");
  /* Na largura de desktop, o slide 4 de serviços (Hotel para pets) começa fora da tela e inert */
  await expect(servicos(page).getByRole("listitem").nth(3)).toHaveAttribute("inert", "");
  const focos: string[] = [];
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press("Tab");
    const t = await textoDoFoco(page);
    if (!t) break;
    focos.push(t);
  }
  expect(focos.length).toBeGreaterThanOrEqual(10);
  /* Sem o inert, o Tab caía no "Entrar em contato" do slide escondido, e o carrossel pulava */
  expect(focos.filter((t) => t.includes("Hotel para pets"))).toEqual([]);
  expect(focos.some((t) => t.includes("Banho & Tosa"))).toBe(true);
});

test("serviços: botões param nas pontas e a posição é anunciada", async ({ page }) => {
  await page.goto("./");
  const regiao = servicos(page);
  const anterior = regiao.getByRole("button", { name: "Serviços anteriores" });
  const proximo = regiao.getByRole("button", { name: "Próximos serviços" });
  const aviso = regiao.locator("[aria-live=polite]");
  await expect(anterior).toBeDisabled();
  await expect(proximo).toBeEnabled();
  await expect(aviso).toHaveText("Slides 1 a 3 de 4");

  /* Só pelo teclado: chega ao "Próximos serviços" com Tab e avança com Enter */
  await anterior.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  let achou = false;
  for (let i = 0; i < 40 && !achou; i++) {
    await page.keyboard.press("Tab");
    achou = await proximo.evaluate((el) => el === document.activeElement);
  }
  expect(achou, "o Tab não chegou ao botão Próximos serviços").toBe(true);
  await page.keyboard.press("Enter");

  await expect(proximo).toBeDisabled();
  await expect(anterior).toBeEnabled();
  await expect(aviso).toHaveText("Slides 2 a 4 de 4");
  /* O botão desabilitado não fica com o foco perdido: ele passa para o "anterior" */
  await expect(anterior).toBeFocused();
  await expect(regiao.getByRole("listitem").nth(3)).not.toHaveAttribute("inert", "");
  await expect(regiao.getByRole("listitem").nth(0)).toHaveAttribute("inert", "");
  await expect(regiao.getByRole("link", { name: /^Entrar em contato sobre Hotel para pets/ })).toBeVisible();
});

test("depoimentos: sem loop, um de cada vez, com a posição anunciada", async ({ page }) => {
  await page.goto("./");
  const regiao = depoimentos(page);
  const anterior = regiao.getByRole("button", { name: "Depoimento anterior" });
  const proximo = regiao.getByRole("button", { name: "Próximo depoimento" });
  const aviso = regiao.locator("[aria-live=polite]");
  await expect(anterior).toBeDisabled();
  await expect(aviso).toHaveText("Slide 1 de 3");
  await expect(regiao.getByRole("listitem").nth(1)).toHaveAttribute("inert", "");

  await proximo.click();
  await expect(aviso).toHaveText("Slide 2 de 3");
  await proximo.click();
  await expect(aviso).toHaveText("Slide 3 de 3");
  await expect(proximo).toBeDisabled();
  await expect(regiao.getByRole("listitem").nth(2)).not.toHaveAttribute("inert", "");
  await expect(regiao.getByRole("listitem").nth(0)).toHaveAttribute("inert", "");
});

test("axe sem violações com os carrosséis no fim", async ({ page }) => {
  await page.goto("./");
  await servicos(page).getByRole("button", { name: "Próximos serviços" }).click();
  await expect(servicos(page).locator("[aria-live=polite]")).toHaveText("Slides 2 a 4 de 4");
  await semAnimacao(page);
  const r = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
});
/* Fim de carrossel.e2e.ts */

/* Fluxo principal no navegador: do início ao WhatsApp em 1 clique e só pelo teclado, navegação entre as páginas, página 404, conteúdo sem JavaScript e celular (375 px), com axe */
import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

/* O WhatsApp é um site de fora: responde uma página local para o teste não sair da máquina */
async function cortarWhatsapp(context: BrowserContext) {
  await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "<title>wa.me</title><p>WhatsApp</p>" }));
}

/* Lê o número e a mensagem que o link do WhatsApp leva */
function mensagem(url: string) {
  const u = new URL(url);
  return { host: u.hostname, numero: u.pathname.slice(1), texto: u.searchParams.get("text") };
}

/* Mostra os blocos do AOS no estado final, para o axe medir o contraste do que a pessoa vê */
async function semAnimacao(page: Page) {
  await page.addStyleTag({ content: "[data-aos]{opacity:1!important;transform:none!important;transition:none!important}" });
}

test.beforeEach(async ({ context }) => {
  await cortarWhatsapp(context);
});

test("do início ao WhatsApp em 1 clique, com a mensagem do site", async ({ page, context }) => {
  await page.goto("./");
  const [aba] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("region", { name: /Seu pet merece cuidado/ }).getByRole("link", { name: /Contato via WhatsApp/ }).click(),
  ]);
  await aba.waitForLoadState();
  const m = mensagem(aba.url());
  expect(m.host).toBe("wa.me");
  expect(m.numero).toMatch(/^55\d{10,11}$/);
  expect(m.texto).toBe("Olá, vim pelo site e gostaria de mais informações.");
});

test("só pelo teclado: o WhatsApp está a até 3 Tabs do topo e abre com Enter", async ({ page, context }) => {
  await page.goto("./");
  let achou = false;
  for (let i = 0; i < 3 && !achou; i++) {
    await page.keyboard.press("Tab");
    const href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement | null)?.href || "");
    achou = href.startsWith("https://wa.me/");
  }
  expect(achou, "o link do WhatsApp não apareceu nas 3 primeiras tabulações").toBe(true);
  const [aba] = await Promise.all([context.waitForEvent("page"), page.keyboard.press("Enter")]);
  await aba.waitForLoadState();
  expect(mensagem(aba.url()).host).toBe("wa.me");
});

test("o contato de um serviço leva o nome do serviço na mensagem", async ({ page, context }) => {
  await page.goto("./");
  /* O nome acessível começa pelo texto visível (WCAG 2.5.3) */
  const link = page.getByRole("link", { name: /^Entrar em contato sobre Banho & Tosa pelo WhatsApp/ });
  await expect(link).toContainText("Entrar em contato");
  const [aba] = await Promise.all([context.waitForEvent("page"), link.click()]);
  await aba.waitForLoadState();
  expect(mensagem(aba.url()).texto).toBe("Olá, vim pelo site e gostaria de mais informações sobre Banho & Tosa.");
});

test("navega do início para Sobre e Contatos pelo rodapé e volta ao início", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("contentinfo").getByRole("link", { name: "Sobre nós" }).click();
  await expect(page).toHaveURL(/\/petshop\/sobre\/$/);
  await expect(page).toHaveTitle(/Sobre nós/);
  await page.getByRole("link", { name: "← Voltar ao início" }).click();
  await expect(page).toHaveURL(/\/petshop\/$/);
  await page.getByRole("contentinfo").getByRole("link", { name: "Contatos e localização" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Contatos" })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: /^\(67\)/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/55\d+\?text=/);
});

test("endereço inexistente mostra a página 404 em português, com volta ao início e sem violações do axe", async ({ page }) => {
  const r = await page.goto("./nao-existe/");
  expect(r?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Página não encontrada" })).toBeVisible();
  const axe = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(axe.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  await page.getByRole("link", { name: "Voltar ao início" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /Seu pet merece cuidado/ })).toBeVisible();
});

test("sem JavaScript (falha ao baixar os scripts), o texto do Sobre continua visível", async ({ page }) => {
  await page.route("**/*.js", (route) => route.abort());
  await page.goto("./sobre/");
  const blocos = page.locator("[data-aos]");
  expect(await blocos.count()).toBeGreaterThan(0);
  /* toBeVisible aceita opacidade 0; por isso o teste lê a opacidade */
  for (const op of await blocos.evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity))) expect(op).toBe("1");
});

test("com JavaScript, o AOS segue animando o bloco do Sobre", async ({ page }) => {
  await page.goto("./sobre/");
  await expect(page.locator("html")).toHaveClass(/aos-ativo/);
  await expect(page.locator("[data-aos]").first()).toHaveClass(/aos-animate/);
});

test("nenhum link tem nome acessível diferente do texto visível (WCAG 2.5.3)", async ({ page }) => {
  for (const rota of ["./", "./sobre/", "./contatos/"]) {
    await page.goto(rota);
    const r = await new AxeBuilder({ page }).withRules(["label-content-name-mismatch"]).analyze();
    expect(r.violations.map((v) => `${rota} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  }
});

/* O app não tem tema escuro próprio (nada aplica a classe .dark e não há prefers-color-scheme); no lugar do "escuro", o celular */
test.describe("celular (375 px)", () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

  for (const rota of ["./", "./sobre/", "./contatos/"]) {
    test(`sem rolagem horizontal e sem violações do axe em ${rota}`, async ({ page }) => {
      await page.goto(rota);
      await semAnimacao(page);
      const largura = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(largura, "a página passa da largura da tela").toBeLessThanOrEqual(375);
      const r = await new AxeBuilder({ page }).withTags(tags).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }

  test("o botão do WhatsApp aparece na primeira tela", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("region", { name: /Seu pet merece cuidado/ }).getByRole("link", { name: /Contato via WhatsApp/ })).toBeInViewport();
  });
});
/* Fim de fluxo.e2e.ts */

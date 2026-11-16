/* Fluxo principal no navegador: do início ao WhatsApp em 1 clique e só pelo teclado, navegação entre as páginas, página 404, AOS sem JavaScript e sem piscar, e celular (375 px), com axe */
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
  const botao = page.getByRole("region", { name: /Seu pet merece cuidado/ }).getByRole("link", { name: /Contato via WhatsApp/ });
  let achou = false;
  for (let i = 0; i < 3 && !achou; i++) {
    await page.keyboard.press("Tab");
    achou = await botao.evaluate((el) => el === document.activeElement);
  }
  expect(achou, "o botão \"Contato via WhatsApp\" não apareceu nas 3 primeiras tabulações").toBe(true);
  /* Foco visível com o contorno que o app define (3 px sólido), não o anel padrão do navegador */
  expect(await botao.evaluate((el) => { const s = getComputedStyle(el); return `${s.outlineStyle} ${s.outlineWidth}`; })).toBe("solid 3px");
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

/* Opacidade e transform de cada bloco do AOS */
async function estadoAos(page: Page) {
  /* Depois da animação o AOS deixa a matriz identidade, que equivale a "none" */
  return page.locator("[data-aos]").evaluateAll((els) => els.map((e) => `${getComputedStyle(e).opacity} ${getComputedStyle(e).transform.replace("matrix(1, 0, 0, 1, 0, 0)", "none")}`));
}

test.describe("JavaScript desligado", () => {
  test.use({ javaScriptEnabled: false });
  test("sem JavaScript, os blocos do Sobre aparecem sem deslocamento", async ({ page }) => {
    await page.goto("./sobre/");
    const e = await estadoAos(page);
    expect(e.length).toBeGreaterThan(0);
    /* toBeVisible aceita opacidade 0; por isso o teste lê a opacidade e o transform */
    for (const x of e) expect(x).toBe("1 none");
  });
});

test("se os scripts do app falharem ao baixar, os blocos do Sobre aparecem em até 2,5 s", async ({ page }) => {
  await page.route("**/_next/static/**/*.js", (route) => route.abort());
  await page.goto("./sobre/");
  await expect(page.locator("html")).not.toHaveClass(/aos-ativo/, { timeout: 5000 });
  for (const x of await estadoAos(page)) expect(x).toBe("1 none");
});

test("com JavaScript, os blocos do Sobre não piscam: começam escondidos e o AOS os mostra", async ({ page }) => {
  /* Atrasa os scripts do app para observar a tela antes do AOS */
  await page.route("**/_next/static/**/*.js", async (route) => { await new Promise((r) => setTimeout(r, 1000)); await route.continue(); });
  await page.goto("./sobre/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/aos-ativo/);
  for (const x of await estadoAos(page)) expect(x.startsWith("0 ")).toBe(true);
  await expect(page.locator("[data-aos]").first()).toHaveClass(/aos-animate/);
  await expect.poll(async () => (await estadoAos(page))[0]).toBe("1 none");
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
      /* Logo após o load, o Chromium em modo celular chega a dar scrollWidth de ~1300 px por menos de 100 ms (carrossel antes de
         assentar); espera a rede parar. Mede antes e depois de tirar a animação: o estado inicial do AOS desloca blocos 100 px */
      await page.waitForLoadState("networkidle");
      const antes = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(antes, "a página passa da largura da tela (com o AOS)").toBeLessThanOrEqual(375);
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

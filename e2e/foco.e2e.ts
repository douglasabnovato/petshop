/* Foco visível nas tabulações e axe (WCAG 2.2 AA, inclui contraste), no navegador real */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

/* Contorno do elemento com foco */
async function focoAtual(page: Page) {
  return page.evaluate(() => {
    const a = document.activeElement as HTMLElement | null;
    if (!a || a === document.body) return null;
    const s = getComputedStyle(a);
    return { nome: a.getAttribute("aria-label") || a.textContent?.trim().slice(0, 40) || a.tagName, estilo: s.outlineStyle, largura: parseFloat(s.outlineWidth) };
  });
}

for (const rota of ["./", "./sobre/", "./contatos/"]) {
  test(`foco visível em todas as tabulações de ${rota}`, async ({ page }) => {
    await page.goto(rota);
    let n = 0;
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      /* Alguns links têm transição de 300 ms (duration-300); espera o contorno chegar ao valor final */
      await page.waitForTimeout(350);
      const f = await focoAtual(page);
      if (!f) break;
      /* "auto" é o anel padrão do navegador, sem contraste garantido no vermelho e no azul-escuro */
      expect(f.estilo, `sem contorno próprio em "${f.nome}"`).toBe("solid");
      expect(f.largura, `contorno fino em "${f.nome}"`).toBeGreaterThanOrEqual(2);
      n++;
    }
    expect(n).toBeGreaterThanOrEqual(3);
  });

  test(`axe sem violações WCAG 2.2 AA em ${rota}`, async ({ page }) => {
    await page.goto(rota);
    /* Espera as animações de entrada (AOS) terminarem para o contraste ser medido no estado final */
    await page.addStyleTag({ content: "[data-aos]{opacity:1!important;transform:none!important;transition:none!important}" });
    const r = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}

/* Fim de foco.e2e.ts */

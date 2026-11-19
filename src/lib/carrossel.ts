/* Funções puras do carrossel (testadas com Vitest) */

/* Texto da posição: "Slide 2 de 3" com um slide na tela, "Slides 1 a 3 de 4" com vários */
export function textoPosicao(visiveis: number[], total: number) {
  if (!visiveis.length || !total) return "";
  const ordem = [...visiveis].sort((a, b) => a - b);
  const primeiro = ordem[0] + 1;
  const ultimo = ordem[ordem.length - 1] + 1;
  return primeiro === ultimo ? `Slide ${primeiro} de ${total}` : `Slides ${primeiro} a ${ultimo} de ${total}`;
}
/* Índices dos slides com pelo menos "limite" da largura dentro da área visível (medidos depois de o carrossel parar) */
export type Faixa = { left: number; right: number };
export function slidesNaTela(area: Faixa, slides: Faixa[], limite = 0.6) {
  return slides.flatMap((s, i) => {
    const largura = s.right - s.left;
    if (largura <= 0) return [];
    const dentro = Math.max(0, Math.min(s.right, area.right) - Math.max(s.left, area.left));
    return dentro / largura >= limite ? [i] : [];
  });
}
/* Fim de carrossel.ts */

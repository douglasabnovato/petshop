/* Funções puras do carrossel (testadas com Vitest) */

/* Texto da posição: "Slide 2 de 3" com um slide na tela, "Slides 1 a 3 de 4" com vários */
export function textoPosicao(visiveis: number[], total: number) {
  if (!visiveis.length || !total) return "";
  const ordem = [...visiveis].sort((a, b) => a - b);
  const primeiro = ordem[0] + 1;
  const ultimo = ordem[ordem.length - 1] + 1;
  return primeiro === ultimo ? `Slide ${primeiro} de ${total}` : `Slides ${primeiro} a ${ultimo} de ${total}`;
}
/* Fim de carrossel.ts */

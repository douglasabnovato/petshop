/* Testes do texto que anuncia a posição do carrossel */
import { describe, it, expect } from "vitest";
import { slidesNaTela, textoPosicao } from "../src/lib/carrossel";

describe("textoPosicao", () => {
  it("um slide na tela: Slide N de M", () => {
    expect(textoPosicao([1], 3)).toBe("Slide 2 de 3");
  });
  it("vários slides na tela, fora de ordem: Slides N a K de M", () => {
    expect(textoPosicao([3, 1, 2], 4)).toBe("Slides 2 a 4 de 4");
  });
  it("sem slides medidos ainda: texto vazio", () => {
    expect(textoPosicao([], 4)).toBe("");
    expect(textoPosicao([0], 0)).toBe("");
  });
});
describe("slidesNaTela", () => {
  const area = { left: 0, right: 300 };
  it("conta só os slides com 60% ou mais dentro da área", () => {
    const slides = [0, 1, 2, 3].map((i) => ({ left: i * 100, right: i * 100 + 100 }));
    expect(slidesNaTela(area, slides)).toEqual([0, 1, 2]);
  });
  it("slide pela metade fica fora; deslocado para a esquerda também", () => {
    const slides = [{ left: -100, right: 0 }, { left: 0, right: 100 }, { left: 250, right: 350 }];
    expect(slidesNaTela(area, slides)).toEqual([1]);
  });
  it("slide sem largura (ainda não medido) fica fora", () => {
    expect(slidesNaTela(area, [{ left: 0, right: 0 }])).toEqual([]);
  });
});
/* Fim de carrossel.test.ts */

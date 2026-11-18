/* Testes do texto que anuncia a posição do carrossel */
import { describe, it, expect } from "vitest";
import { textoPosicao } from "../src/lib/carrossel";

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
/* Fim de carrossel.test.ts */

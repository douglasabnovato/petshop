"use client";
/* Carrossel acessível por teclado: slides fora da tela ficam inert, os botões param nas pontas e um texto anuncia a posição */
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { slidesNaTela, textoPosicao } from "../../lib/carrossel";

/* Tipos tirados do embla-carousel-react, que é a dependência direta */
type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;
type EmblaOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

export function useCarrossel(opcoes: EmblaOptionsType) {
  /* Sem loop: as pontas existem e os botões podem ficar desabilitados */
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...opcoes, loop: false });
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(true);
  /* null antes do JavaScript: sem ele, nenhum slide fica inert */
  const [visiveis, setVisiveis] = useState<number[] | null>(null);
  const [total, setTotal] = useState(0);
  /* Botão que recebe o foco depois do próximo desenho (o outro ainda está desabilitado na hora do evento) */
  const focoPendente = useRef<HTMLButtonElement | null>(null);

  const aoSelecionar = useCallback((api: EmblaCarouselType) => {
    const voltar = api.canScrollPrev();
    const avancar = api.canScrollNext();
    /* O botão que vai ficar desabilitado perderia o foco: o foco vai para o outro (botões irmãos da área do carrossel) */
    const caixa = api.rootNode().parentElement;
    const botao = (nome: string) => caixa?.querySelector<HTMLButtonElement>(`[data-carrossel="${nome}"]`);
    const ativo = document.activeElement;
    if (!avancar && ativo === botao("proximo")) focoPendente.current = botao("anterior") ?? null;
    if (!voltar && ativo === botao("anterior")) focoPendente.current = botao("proximo") ?? null;
    setPodeVoltar(voltar);
    setPodeAvancar(avancar);
  }, []);

  /* Mede pela posição na tela depois de o carrossel parar (settle) ou de remontar (reInit): sem estados no meio da animação
     e sem o mapa vazio do IntersectionObserver logo depois do reInit */
  const aoMudarVisiveis = useCallback((api: EmblaCarouselType) => {
    const slides = api.slideNodes();
    setVisiveis(slidesNaTela(api.rootNode().getBoundingClientRect(), slides.map((s) => s.getBoundingClientRect())));
    setTotal(slides.length);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    /* Estado inicial no próximo quadro, depois de o Embla medir os slides */
    const quadro = requestAnimationFrame(() => {
      aoSelecionar(emblaApi);
      aoMudarVisiveis(emblaApi);
    });
    emblaApi.on("select", aoSelecionar).on("reInit", aoSelecionar);
    emblaApi.on("settle", aoMudarVisiveis).on("reInit", aoMudarVisiveis);
    return () => {
      cancelAnimationFrame(quadro);
      emblaApi.off("select", aoSelecionar).off("reInit", aoSelecionar);
      emblaApi.off("settle", aoMudarVisiveis).off("reInit", aoMudarVisiveis);
    };
  }, [emblaApi, aoSelecionar, aoMudarVisiveis]);

  /* Depois do desenho com os botões novos, move o foco que ficou pendente */
  useEffect(() => {
    if (!focoPendente.current) return;
    focoPendente.current.focus();
    focoPendente.current = null;
  }, [podeVoltar, podeAvancar]);

  /* Como no useEmblaCarousel: a ref do Embla vem à parte, para a regra de refs do React não acusar o resto */
  return [emblaRef, {
    voltar: () => emblaApi?.scrollPrev(),
    avancar: () => emblaApi?.scrollNext(),
    podeVoltar,
    podeAvancar,
    /* inert no slide fora da tela: o Tab não cai nele, e o leitor de tela não o lê */
    foraDaTela: (i: number) => (visiveis ? !visiveis.includes(i) : false),
    posicao: visiveis ? textoPosicao(visiveis, total) : "",
  }] as const;
}
/* Fim de use-carrossel.ts */

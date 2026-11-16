"use client";
/* Inicia o AOS (animação de entrada). A classe aos-ativo no <html> (posta pelo script do layout.tsx) libera o estado
   inicial escondido do AOS; __aosPronto avisa o script que o app chegou. Sem a classe, globals.css mantém os blocos visíveis */
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export function AosInit() {
  useEffect(() => {
    (window as Window & { __aosPronto?: boolean }).__aosPronto = true;
    document.documentElement.classList.add("aos-ativo");
    Aos.init({ duration: 800, once: true });
  }, []);

  return null;
}
/* Fim de aos-init.tsx */

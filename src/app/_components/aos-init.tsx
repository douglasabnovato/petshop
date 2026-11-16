"use client";
/* Inicia o AOS (animação de entrada). A classe aos-ativo no <html> libera o estado inicial escondido do AOS;
   sem ela (sem JavaScript), globals.css mantém os blocos visíveis */
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export function AosInit() {
  useEffect(() => {
    document.documentElement.classList.add("aos-ativo");
    Aos.init({ duration: 800, once: true });
  }, []);

  return null;
}
/* Fim de aos-init.tsx */

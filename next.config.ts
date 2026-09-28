/* next.config.ts · exportação estática para o GitHub Pages (pasta out/ publicada em /petshop); no npm run dev o site continua na raiz */
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const repoBasePath = "/petshop";

/* Monta a configuração conforme a fase: dev sem basePath, build com basePath do repositório */
export default function config(phase: string): NextConfig {
  const basePath = phase === PHASE_DEVELOPMENT_SERVER ? "" : repoBasePath;
  return {
    output: "export",
    basePath,
    assetPrefix: basePath || undefined,
    trailingSlash: true,
    images: { unoptimized: true },
  };
}
/* Fim de next.config.ts */

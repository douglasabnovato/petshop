/* ESLint (configuração plana): regras do Next com Core Web Vitals e TypeScript, mais as recomendadas de acessibilidade do jsx-a11y */
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const config = [
  ...nextVitals,
  ...nextTs,
  /* O eslint-config-next já registra o plugin jsx-a11y; aqui só se ligam as regras recomendadas dele */
  { files: ["**/*.{js,jsx,mjs,ts,tsx}"], rules: jsxA11y.flatConfigs.recommended.rules },
  { ignores: [".next/**", "out/**", "node_modules/**", "test-results/**", "playwright-report/**", "next-env.d.ts"] },
];

export default config;
/* Fim de eslint.config.mjs */

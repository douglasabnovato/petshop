> **Projeto de estudo (N1).** Publicado em https://douglasabnovato.github.io/petshop/ (200 nas 3 páginas em 18/11/2026). Estado e critérios em [docs/MVP.md](docs/MVP.md).

# Petshop Dev

Landing page de um pet shop (projeto de estudo baseado no canal Sujeito Programador): apresentação, serviços com contato direto pelo WhatsApp, depoimentos, marcas e contatos.

## Estado e próximos passos (ciclo de 18/11/2026)

Projeto de estudo (N1). Critérios: 10 de 10 aplicáveis atendidos em 18/11/2026. Finalizado: sim. O site está no GitHub Pages desde 16/11/2026, publicado pelo workflow `CI` na `main`. Com os alertas do Dependabot ligados (#21), há 0 alertas abertos. A `main` está protegida e só recebe mudanças por PR com o check `raiz` verde.

**O que foi feito**

- Ciclo de 18/11/2026 ([#25](https://github.com/douglasabnovato/petshop/pull/25), na sprint; entra na `main` pelo PR da sprint): carrosséis acessíveis por teclado (#14), ESLint no CI e Dependabot semanal (#15), código do template sem uso removido (#22)
- Ciclo de 16/11/2026 ([#20](https://github.com/douglasabnovato/petshop/pull/20), entra na `main` pelo [#19](https://github.com/douglasabnovato/petshop/pull/19)): teste de ponta a ponta do fluxo principal no navegador (WhatsApp em 1 clique e pelo teclado, navegação, celular 375 px, axe), página 404 em português, blocos animados visíveis sem JavaScript, nome acessível do "Entrar em contato" (WCAG 2.5.3), publicação no Pages só com a variável `PAGES_VIA_ACTIONS=true` e dependências atualizadas
- `main` protegida pelo ruleset `principal-protegida` e workflow único com publicação no Pages só na `main` ([#18](https://github.com/douglasabnovato/petshop/pull/18), 10/11/2026)
- Foco visível em duas cores, perguntas frequentes e dados estruturados PetStore, com testes ([#16](https://github.com/douglasabnovato/petshop/pull/16), fecha #8 e #9)
- Versão 1.0: Next 16, links reais de contato, depoimentos marcados como ilustrativos (#6, #7)

**O que queremos fazer**

- [#14](https://github.com/douglasabnovato/petshop/issues/14), [#15](https://github.com/douglasabnovato/petshop/issues/15) e [#22](https://github.com/douglasabnovato/petshop/issues/22): feitas no #25; fecham depois do merge na `main` (próximos passos)
- [#11](https://github.com/douglasabnovato/petshop/issues/11) Publicar no GitHub Pages e [#21](https://github.com/douglasabnovato/petshop/issues/21) Ligar os alertas do Dependabot: cumpridas em 16/11/2026; ficam para o responsável fechar

**Onde está a documentação**

- Estado e critérios: [docs/MVP.md](docs/MVP.md)
- Plano do ciclo, pesquisa e engenharia: [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md#ciclo-de-16112026)
- Publicação passo a passo: [docs/DEPLOY.md](docs/DEPLOY.md)

## 🧠 O que aprendi

> Proposta de 01/11/2026, escrita a partir do código e das dependências. Ajuste com a sua experiência.

- Construir uma landing page com Next.js e Tailwind CSS.
- Criar carrosséis com Embla e animações com AOS.
- Tornar um carrossel acessível por teclado (`inert`, botões nas pontas e `aria-live`).
- Isolar a geração do link do WhatsApp e testá-la com Vitest.

## Publicação

- No ar: https://douglasabnovato.github.io/petshop/ (`curl` deu 200 em `/`, `/sobre/` e `/contatos/` em 18/11/2026)
- Hospedagem: GitHub Pages (gratuito), publicado pelo GitHub Actions a cada push na `main`, com o Pages ligado e a variável `PAGES_VIA_ACTIONS=true` (#11)
- Passo a passo: [docs/DEPLOY.md](docs/DEPLOY.md)

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · Embla Carousel · AOS · fonte Geist local

## Como executar

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # ESLint (regras do Next e de acessibilidade)
npm test        # testes com Vitest
npm run build   # gera out/ (site estático servido em /petshop)
npx playwright install chromium   # uma vez
npx playwright test               # fluxo, 404, foco, carrosséis, axe, FAQ e JSON-LD no navegador (usa o out/; porta em PORT, padrão 4174)
```

## Como personalizar

Todos os dados do negócio ficam em `src/config/site.ts`: nome, WhatsApp (com DDI 55), telefone, e-mail, endereço, link do mapa, horário e redes sociais (redes sem URL não aparecem). Enquanto `isDemo` for `true`, a página mostra que os depoimentos são ilustrativos.

## Publicação gratuita

O site é exportado como HTML estático (`output: 'export'` em `next.config.ts`), pronto para o GitHub Pages. O workflow `CI` roda lint, testes, build e Playwright em todo PR. O job `deploy` publica no Pages só na `main` e só com a variável `PAGES_VIA_ACTIONS=true`; sem ela, fica pulado. O Pages e a variável foram ligados pelo responsável em 16/11/2026 (#11). O Dependabot propõe atualizações toda semana (`.github/dependabot.yml`). Se o nome do repositório ou o endereço mudar, ajuste `repoBasePath` em `next.config.ts` e `site.url` em `src/config/site.ts`. Detalhes em [docs/DEPLOY.md](docs/DEPLOY.md).

## Qualidade

A avaliação atual, com comando, data e resultado de cada critério, está em [docs/MVP.md](docs/MVP.md). A medição da versão 1.0 (Lighthouse e axe, sem data) ficou em [docs/ANALISE.md](docs/ANALISE.md).

Detalhes em [docs/ANALISE.md](docs/ANALISE.md), [docs/ARQUITETURA.md](docs/ARQUITETURA.md) e [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md).

## Fonte

Conteúdo inspirado no canal [Sujeito Programador](https://www.youtube.com/@sujeitoprogramador).

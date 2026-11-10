> **Projeto de estudo.** Estado conferido em 31/10/2026: os endereços que seguem fora do ar foram retirados deste README. Detalhes em [docs/AVALIACAO.md](docs/AVALIACAO.md) e próximos passos em [docs/PLANO-ESTRATEGICO.md](docs/PLANO-ESTRATEGICO.md).

# Petshop Dev

Landing page de um pet shop (projeto de estudo baseado no canal Sujeito Programador): apresentação, serviços com contato direto pelo WhatsApp, depoimentos, marcas e contatos.

## Estado e próximos passos (ciclo de 03/11/2026)

Projeto de estudo (N1). Critérios: 10 de 10 aplicáveis atendidos em 10/11/2026. Finalizado: sim. A `main` está protegida desde 10/11/2026 e só recebe mudanças por PR.

**O que foi feito**

- `main` protegida pelo ruleset `principal-protegida` (critério 10 atende) e workflow único com publicação no Pages só na `main` (10/11/2026)
- Versão 1.0: Next 16, links reais de contato, depoimentos marcados como ilustrativos, axe sem violações (#6, #7)
- Foco visível em duas cores em todas as tabulações, com teste Playwright e axe no CI (PR deste ciclo, fecha #8)
- Perguntas frequentes e dados estruturados PetStore (JSON-LD), com testes (PR deste ciclo, fecha #9)
- CI também nos PRs para `developer/**`, com Playwright 1.65

**O que queremos fazer**

- [#11](https://github.com/douglasabnovato/petshop/issues/11) Publicar no GitHub Pages (responsável liga o Pages; o workflow já está pronto). Hoje o endereço responde 404, por isso não há link publicado aqui
- [#12](https://github.com/douglasabnovato/petshop/issues/12) Pedido de agendamento pelo WhatsApp
- [#13](https://github.com/douglasabnovato/petshop/issues/13) Aviso de aberto agora
- [#14](https://github.com/douglasabnovato/petshop/issues/14) Carrosséis acessíveis por teclado
- [#15](https://github.com/douglasabnovato/petshop/issues/15) ESLint no CI e Dependabot

**Onde está a documentação**

- Estado e critérios: [docs/MVP.md](docs/MVP.md)
- Plano do ciclo, pesquisa e engenharia: [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md#ciclo-de-03112026)

## 🧠 O que aprendi

> Proposta de 01/11/2026, escrita a partir do código e das dependências. Ajuste com a sua experiência.

- Construir uma landing page com Next.js e Tailwind CSS.
- Criar carrosséis com Embla e animações com AOS.
- Compor componentes com Radix e `class-variance-authority`.
- Isolar a geração do link do WhatsApp e testá-la com Vitest.

## Publicação

- Fora do ar desde a conferência de 31/10/2026; para ver o projeto, rode localmente (seção "Como executar").
- Hospedagem prevista: GitHub Pages (gratuito), publicado pelo GitHub Actions a cada push na `main`
- Passo a passo: [docs/DEPLOY.md](docs/DEPLOY.md)

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · Embla Carousel · AOS · fonte Geist local

## Como executar

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # testes com Vitest
npm run build   # gera out/ (site estático servido em /petshop)
npx playwright install chromium   # uma vez
npx playwright test               # foco, axe, FAQ e JSON-LD no navegador (usa o out/)
```

## Como personalizar

Todos os dados do negócio ficam em `src/config/site.ts`: nome, WhatsApp (com DDI 55), telefone, e-mail, endereço, link do mapa, horário e redes sociais (redes sem URL não aparecem). Enquanto `isDemo` for `true`, a página mostra que os depoimentos são ilustrativos.

## Publicação gratuita

O site é exportado como HTML estático (`output: 'export'` em `next.config.ts`), pronto para o GitHub Pages. O workflow `CI` só verifica (testes e build) e não publica; a publicação depende do responsável (#11). Se o nome do repositório ou o endereço mudar, ajuste `repoBasePath` em `next.config.ts` e `site.url` em `src/config/site.ts`. Detalhes em [docs/DEPLOY.md](docs/DEPLOY.md).

## Qualidade (v1.0)

| Medida | Resultado |
|---|---|
| Lighthouse (mobile) | Desempenho 98 · Acessibilidade 100 · Boas práticas 96 · SEO 100 |
| axe-core (WCAG 2.2 AA) | 0 violações em /, /sobre e /contatos |
| `npm audit` | 0 vulnerabilidades |

Detalhes em [docs/ANALISE.md](docs/ANALISE.md), [docs/ARQUITETURA.md](docs/ARQUITETURA.md) e [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md).

## Fonte

Conteúdo inspirado no canal [Sujeito Programador](https://www.youtube.com/@sujeitoprogramador).

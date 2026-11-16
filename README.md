> **Projeto de estudo (N1).** Estado conferido em 16/11/2026: o site ainda não está publicado (o endereço do Pages responde 404). Estado e critérios em [docs/MVP.md](docs/MVP.md).

# Petshop Dev

Landing page de um pet shop (projeto de estudo baseado no canal Sujeito Programador): apresentação, serviços com contato direto pelo WhatsApp, depoimentos, marcas e contatos.

## Estado e próximos passos (ciclo de 16/11/2026)

Projeto de estudo (N1). Critérios: 9 de 10 aplicáveis atendidos em 16/11/2026. Finalizado: sim. O critério 9 está "Parcial" porque os alertas do Dependabot estão desligados, o que só o responsável liga (#21). A `main` está protegida e só recebe mudanças por PR com o check `raiz` verde.

**O que foi feito**

- Ciclo de 16/11/2026 ([#20](https://github.com/douglasabnovato/petshop/pull/20), entra na `main` pelo [#19](https://github.com/douglasabnovato/petshop/pull/19)): teste de ponta a ponta do fluxo principal no navegador (WhatsApp em 1 clique e pelo teclado, navegação, celular 375 px, axe), página 404 em português, blocos animados visíveis sem JavaScript, nome acessível do "Entrar em contato" (WCAG 2.5.3), publicação no Pages só com a variável `PAGES_VIA_ACTIONS=true` e dependências atualizadas
- `main` protegida pelo ruleset `principal-protegida` e workflow único com publicação no Pages só na `main` ([#18](https://github.com/douglasabnovato/petshop/pull/18), 10/11/2026)
- Foco visível em duas cores, perguntas frequentes e dados estruturados PetStore, com testes ([#16](https://github.com/douglasabnovato/petshop/pull/16), fecha #8 e #9)
- Versão 1.0: Next 16, links reais de contato, depoimentos marcados como ilustrativos (#6, #7)

**O que queremos fazer**

- [#11](https://github.com/douglasabnovato/petshop/issues/11) Publicar no GitHub Pages: o responsável liga o Pages e cria a variável `PAGES_VIA_ACTIONS`. Hoje o endereço responde 404, por isso não há link publicado aqui
- [#21](https://github.com/douglasabnovato/petshop/issues/21) Ligar os alertas do Dependabot (responsável)
- [#12](https://github.com/douglasabnovato/petshop/issues/12) Pedido de agendamento pelo WhatsApp
- [#13](https://github.com/douglasabnovato/petshop/issues/13) Aviso de aberto agora
- [#14](https://github.com/douglasabnovato/petshop/issues/14) Carrosséis acessíveis por teclado
- [#15](https://github.com/douglasabnovato/petshop/issues/15) ESLint no CI e Dependabot semanal
- [#22](https://github.com/douglasabnovato/petshop/issues/22) Remover código e arquivos do template sem uso

**Onde está a documentação**

- Estado e critérios: [docs/MVP.md](docs/MVP.md)
- Plano do ciclo, pesquisa e engenharia: [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md#ciclo-de-16112026)
- Publicação passo a passo: [docs/DEPLOY.md](docs/DEPLOY.md)

## 🧠 O que aprendi

> Proposta de 01/11/2026, escrita a partir do código e das dependências. Ajuste com a sua experiência.

- Construir uma landing page com Next.js e Tailwind CSS.
- Criar carrosséis com Embla e animações com AOS.
- Compor componentes com Radix e `class-variance-authority`.
- Isolar a geração do link do WhatsApp e testá-la com Vitest.

## Publicação

- Ainda não publicado: em 16/11/2026 o endereço do Pages respondeu 404. Para ver o projeto, rode localmente (seção "Como executar").
- Hospedagem prevista: GitHub Pages (gratuito), publicado pelo GitHub Actions a cada push na `main`, depois que o responsável ligar o Pages e criar a variável `PAGES_VIA_ACTIONS=true` (#11)
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
npx playwright test               # fluxo, 404, foco, axe, FAQ e JSON-LD no navegador (usa o out/; porta em PORT, padrão 4174)
```

## Como personalizar

Todos os dados do negócio ficam em `src/config/site.ts`: nome, WhatsApp (com DDI 55), telefone, e-mail, endereço, link do mapa, horário e redes sociais (redes sem URL não aparecem). Enquanto `isDemo` for `true`, a página mostra que os depoimentos são ilustrativos.

## Publicação gratuita

O site é exportado como HTML estático (`output: 'export'` em `next.config.ts`), pronto para o GitHub Pages. O workflow `CI` roda testes, build e Playwright em todo PR. O job `deploy` publica no Pages só na `main` e só com a variável `PAGES_VIA_ACTIONS=true`; sem ela, fica pulado. Ligar o Pages e criar a variável é do responsável (#11). Se o nome do repositório ou o endereço mudar, ajuste `repoBasePath` em `next.config.ts` e `site.url` em `src/config/site.ts`. Detalhes em [docs/DEPLOY.md](docs/DEPLOY.md).

## Qualidade (v1.0, medição antiga sem data; a atual está em docs/MVP.md)

| Medida | Resultado |
|---|---|
| Lighthouse (mobile) | Desempenho 98 · Acessibilidade 100 · Boas práticas 96 · SEO 100 |
| axe-core (WCAG 2.2 AA) | 0 violações em /, /sobre e /contatos |
| `npm audit` | 0 vulnerabilidades |

Detalhes em [docs/ANALISE.md](docs/ANALISE.md), [docs/ARQUITETURA.md](docs/ARQUITETURA.md) e [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md).

## Fonte

Conteúdo inspirado no canal [Sujeito Programador](https://www.youtube.com/@sujeitoprogramador).

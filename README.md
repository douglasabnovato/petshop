# Petshop Dev

Landing page de um pet shop (projeto de estudo baseado no canal Sujeito Programador): apresentação, serviços com contato direto pelo WhatsApp, depoimentos, marcas e contatos.

## Em produção

- URL: https://douglasabnovato.github.io/petshop/
- Hospedagem: GitHub Pages (gratuito), publicado pelo GitHub Actions a cada push na `main`
- Passo a passo: [docs/DEPLOY.md](docs/DEPLOY.md)

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · Embla Carousel · AOS · fonte Geist local

## Como executar

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # testes com Vitest
npm run build   # gera out/ (site estático publicado em /petshop)
```

## Como personalizar

Todos os dados do negócio ficam em `src/config/site.ts`: nome, WhatsApp (com DDI 55), telefone, e-mail, endereço, link do mapa, horário e redes sociais (redes sem URL não aparecem). Enquanto `isDemo` for `true`, a página mostra que os depoimentos são ilustrativos.

## Publicação gratuita

O site é exportado como HTML estático (`output: 'export'` em `next.config.ts`) e publicado no GitHub Pages pelo workflow de CI. Se o nome do repositório ou o endereço mudar, ajuste `repoBasePath` em `next.config.ts` e `site.url` em `src/config/site.ts`. Detalhes em [docs/DEPLOY.md](docs/DEPLOY.md).

## Qualidade (v1.0)

| Medida | Resultado |
|---|---|
| Lighthouse (mobile) | Desempenho 98 · Acessibilidade 100 · Boas práticas 96 · SEO 100 |
| axe-core (WCAG 2.2 AA) | 0 violações em /, /sobre e /contatos |
| `npm audit` | 0 vulnerabilidades |

Detalhes em [docs/ANALISE.md](docs/ANALISE.md), [docs/ARQUITETURA.md](docs/ARQUITETURA.md) e [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md).

## Fonte

Conteúdo inspirado no canal [Sujeito Programador](https://www.youtube.com/@sujeitoprogramador).

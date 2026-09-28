# Deploy · Pet Shop Dev

Plano de ação para publicar a landing page do pet shop em hospedagem gratuita.

## 1. Desafio

Publicar, sem custo e com deploy automático, uma landing page em Next.js 16 (App Router) que não tem backend: três páginas (`/`, `/sobre`, `/contatos`), imagens locais e contato pelo WhatsApp.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages com exportação estática do Next (escolhida)** | O site não usa API routes, SSR, middleware nem ISR: todas as rotas são pré-renderizadas. O `next build` gera HTML puro em `out/` e o GitHub Actions publica |
| Vercel Hobby | Funcionaria sem ajuste nenhum, mas é mais uma conta e mais um painel; fica como plano B se um dia o site precisar de servidor (formulário com envio, API) |
| Netlify / Render Static Site | Também servem `out/`, sem vantagem sobre o Pages para um repositório que já está no GitHub |

### O que foi ajustado para produção

| Mudança | Arquivo | Por quê |
|---|---|---|
| `output: 'export'`, `basePath`/`assetPrefix` = `/petshop`, `trailingSlash: true`, `images.unoptimized: true` | `next.config.ts` | O Pages só serve arquivos; o site fica em `/petshop/`; cada rota vira `rota/index.html`; o otimizador de imagens do Next precisa de servidor |
| `basePath` só no build (no `npm run dev` o site continua em `http://localhost:3000/`) | `next.config.ts` | Não mudar o fluxo de desenvolvimento |
| `site.url` = `https://douglasabnovato.github.io/petshop/` | `src/config/site.ts` | Metadados de SEO e a imagem de compartilhamento (`og:image`) apontam para o endereço real |
| Script `start` removido | `package.json` | `next start` não funciona com exportação estática |
| Job `deploy` no CI (Pages por Actions) | `ci/github-actions-ci.yml` → mover para `.github/workflows/ci.yml` | Testes + build a cada push; publicação só na `main` |
| Seção "Em produção" e publicação atualizada | `README.md` | Endereço e hospedagem visíveis |

Verificação feita antes da entrega: `npm ci` limpo, 2 testes passando, `next build` gerando `out/` com as 3 páginas, `npm audit --omit=dev` com 0 vulnerabilidades, e navegação real no Chromium servindo `out/` em `/petshop/`: as 3 páginas respondem 200, os links do rodapé navegam, nenhuma imagem quebrada, console sem erros.

### Limitações do plano gratuito

- O GitHub Pages é gratuito para repositório **público**.
- Limites de uso do Pages: site até 1 GB e cerca de 100 GB de tráfego por mês (sobra para uma landing page).
- Sem servidor: qualquer recurso futuro que precise de backend (formulário que envia e-mail, agendamento) exige outra hospedagem (Vercel Hobby, gratuita).
- Se o repositório tiver outro nome, o endereço muda: ajuste `repoBasePath` em `next.config.ts` e `site.url` em `src/config/site.ts`.

### Pontos de atenção (conteúdo e LGPD)

- O site não coleta dados: o contato é por link do WhatsApp, e-mail e telefone.
- E-mail, telefone e endereço em `src/config/site.ts` ainda são de exemplo; o WhatsApp veio do projeto original. Com `isDemo: true` o rodapé mostra "Site de demonstração" e os depoimentos aparecem como ilustrativos. Troque para `false` só quando os depoimentos forem reais (decisão sua).
- Fotos de tutores e depoimentos são ilustrativos; se usar fotos de clientes reais, tenha a autorização de uso de imagem.

## 3. Solução (passo a passo)

### Etapa 1 · Validar localmente (Git Bash)

1. `cd /c/ambiente-projeto/ser-mvp/petshop`
2. `npm install` (Next 16 exige Node 20.9+; use o Node 22)
3. `npm test` (esperado: 2 testes passando)
4. `npm run build` (esperado: pasta `out/` com `index.html`, `sobre/`, `contatos/` e `404.html`)
5. `npm run dev` e conferir `http://localhost:3000/`, `/sobre` e `/contatos`.

### Etapa 2 · Subir para o GitHub (branch `main`)

1. Limpeza opcional do scaffold do shadcn e de imagens sem uso (validado: testes e build continuam passando):
   `git rm src/components/ui/button.tsx src/lib/utils.ts components.json public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg public/bg-hero.png`
   `npm uninstall @radix-ui/react-slot class-variance-authority clsx tailwind-merge`
2. Ativar o CI (a pasta `.github` é protegida para a ferramenta que preparou o projeto, então o arquivo veio em `ci/`):
   `mkdir -p .github/workflows && mv ci/github-actions-ci.yml .github/workflows/ci.yml && rmdir ci`
3. `git status` (não podem aparecer `out/`, `.next/` nem `node_modules/`)
4. `git add -A`
5. `git commit -m "feat(deploy): exportação estática do Next e publicação no GitHub Pages por Actions"`
6. `git push origin main`

### Etapa 3 · Ativar o GitHub Pages

1. No repositório, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Aba **Actions**: o workflow **CI** roda os jobs `web` (testes e build) e `deploy`. Se o `deploy` falhou porque o Pages ainda não estava ativo, clique em **Re-run all jobs** (ou **Run workflow** na `main`).
3. Não há variável nem segredo a cadastrar.

### Etapa 4 · Conferir no ar

1. Abrir `https://douglasabnovato.github.io/petshop/`: hero, sobre, serviços, depoimentos e rodapé com as logos das marcas.
2. Clicar em **Sobre nós** e **Contatos e localização** no rodapé; dar F5 em `/petshop/sobre/`: a página continua.
3. **Contato via WhatsApp** abre `wa.me` com a mensagem; **Entrar em contato** de um serviço traz o nome do serviço na mensagem.
4. Nas ferramentas do navegador (F12 → Console e Network), nenhum erro nem arquivo 404.
5. Um endereço inexistente (`/petshop/xyz`) mostra a página 404.

### Etapa 5 · Fechar

1. No GitHub, **About → Website**: colar `https://douglasabnovato.github.io/petshop/`.

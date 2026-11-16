# MVP — petshop

> Revisto em 16/11/2026 (ciclo de 16/11/2026; critério 9 revisto às 12h29, com os alertas do Dependabot ligados). Nível: **Estudo (N1)**. Critérios 5 e 7 não se aplicam em N1 e saem da conta. Testado no Windows (Node 24) e no CI (Ubuntu, Node 22). Não houve teste com pessoas nem em aparelho real. O app não tem tema escuro próprio (não há `prefers-color-scheme`, e nada aplica a classe `.dark` do CSS); por isso não há teste "no escuro", e sim em celular (375 px).

**Resumo:** 10 de 10 aplicáveis atendidos

**Finalizado:** sim. Todos os critérios aplicáveis atendem. O 9 passou a "Atende" em 16/11/2026, depois que o responsável ligou os alertas do Dependabot (#21): 0 alertas abertos e audit de produção 0.

## 1. Critérios: 10 de 10 aplicáveis atendidos

CI citado: run [43807443414](https://github.com/douglasabnovato/petshop/actions/runs/43807443414) do workflow `CI`, PR #20, commit `3addba9` (último commit de código; os seguintes só mudam documentos), 16/11/2026: job `raiz` verde, `6 passed` no Vitest e `21 passed` no Playwright, sem testes pulados.

| # | Critério | Como verificar | Situação | Evidência (16/11/2026) |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Um pet shop (simulado) divulga serviços e leva o dono do pet ao WhatsApp. Frase no README. |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende | Seção 2, com meta e "saberemos quando". Sem validação com pessoas (N1). |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador no CI | Atende | `npx playwright test`, run 43807443414: `e2e/fluxo.e2e.ts` clica em "Contato via WhatsApp" e confere a aba `wa.me` com número e mensagem; abre o WhatsApp só com Tab e Enter (até 3 Tabs); o contato de "Banho & Tosa" leva o nome do serviço; navega Início → Sobre → Início → Contatos pelo rodapé. |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | Seção 3. |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) | Projeto de estudo sem coleta de uso. |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta | Atende | Site estático, sem chamada de rede própria. Run 43805846207: endereço inexistente responde 404 com a página "Página não encontrada" e o link "Voltar ao início"; com o JavaScript desligado, os blocos do AOS aparecem com opacidade 1 e sem deslocamento (antes ficavam com opacidade 0); com os scripts do app bloqueados, aparecem em até 2,5 s; com scripts lentos, não piscam (começam escondidos e o AOS os mostra). Dúvida fora da lista vai para o WhatsApp. |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1) | Sem publicação: `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/petshop/` deu 404 em 16/11/2026 (#11). |
| 8 | Acessibilidade básica | axe e teclado | Atende | Run 43805846207: axe WCAG 2.2 AA sem violações em `/`, `/sobre`, `/contatos` (desktop e 375 px) e na 404; regra `label-content-name-mismatch` (WCAG 2.5.3) sem violações nas 3 páginas; contorno sólido de 2 px ou mais em todas as tabulações das 3 páginas; FAQ abre com Enter; WhatsApp abre com Tab e Enter; 375 px sem rolagem horizontal, medida com o estado inicial do AOS e sem ele (antes, 459 px em `/sobre`). O app não tem tema escuro próprio. |
| 9 | Segurança e conformidade | Riscos decididos | Atende | `gh api "repos/douglasabnovato/petshop/dependabot/alerts?state=open&per_page=100"`, 16/11/2026 11h59: 0 alertas abertos (alertas ligados pelo responsável nesse dia, #21). `npm audit --omit=dev` depois do `npm ci`, 16/11/2026 12h29: 0 vulnerabilidades. Sem segredo no código; o site não coleta dados; contatos fictícios; JSON-LD com `<` escapado e teste. |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Atende | `gh api repos/douglasabnovato/petshop/rulesets/26932554`, 16/11/2026: `principal-protegida` ativo, com `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` (`raiz`). Workflow `CI` roda nos PRs para `main` e `developer/**`. |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende | Run 43805846207: Vitest `6 passed` (WhatsApp, JSON-LD, FAQ) e Playwright `21 passed` (13 em `fluxo.e2e.ts` e 8 em `foco.e2e.ts`), sem `skipped`. |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto | Atende | README com `npm install`, `npm run dev`, `npm test`, `npm run build` e `npx playwright test`, conferidos com o `package.json` em 16/11/2026; sem link publicado enquanto o Pages responder 404. |

## 2. Hipótese

Acreditamos que o botão "Contato via WhatsApp" no topo leva a pessoa ao atendimento em 1 clique e que as perguntas frequentes respondem as dúvidas comuns. **Meta:** 1 clique (ou até 3 Tabs pelo teclado) da página inicial até o `wa.me` com a mensagem do site. **Saberemos quando** o teste `e2e/fluxo.e2e.ts` passar no CI com esses números, como no run 43807443414. Com pessoas, ficaria para um projeto N2.

## 3. Fora do MVP

Agendamento com horário, loja e painel; tema escuro; dados reais da loja (os contatos são fictícios).

## 4. Neste ciclo

Teste de ponta a ponta do fluxo principal com axe e celular; página 404 em português; blocos do AOS visíveis sem JavaScript e sem rolagem horizontal no celular; nome acessível do "Entrar em contato" (WCAG 2.5.3); deploy no Pages só com a variável `PAGES_VIA_ACTIONS=true`; patch e minor das dependências. Plano em [`PLANO-DE-ACAO.md`](PLANO-DE-ACAO.md#ciclo-de-16112026).

## Histórico

- 16/11/2026, 12h29: critério 9 de "Parcial" para "Atende". Antes, a API de alertas do Dependabot respondia 403 (alertas desligados, engenharia#33). Com os alertas ligados, 0 abertos e audit de produção 0. Resumo de 9 para 10 de 10.

- 10/11/2026: 10 de 10, com o critério 9 "Atende" só pelo `npm audit` e o 3 sem teste do clique no WhatsApp.
- 06/11/2026: 9 de 10 (critério 10 "Parcial", sem a `main` protegida).

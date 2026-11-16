# Plano de ação — Petshop Dev

Timebox: 40 min.

| MoSCoW | Item | Ganho | Esforço | Status |
|---|---|---|---|---|
| Must | Atualizar Next (D1) | Alto | Baixo | ✅ |
| Must | Links reais de contato (D2) | Alto | Baixo | ✅ |
| Should | Depoimentos marcados como ilustrativos (D3) | Médio | Baixo | ✅ |
| Should | Acessibilidade e desempenho (D4, D5) | Alto | Baixo | ✅ Lighthouse 98/100 |
| Should | Preencher dados reais em site.ts | Alto | Baixo | ⏳ ação sua |
| Could | Formulário de agendamento | Alto | Médio | Próximo ciclo |
| Could | Depoimentos reais (Google Meu Negócio) | Alto | Baixo | Próximo ciclo |

## Ciclo de 16/11/2026

> Branch `feature/2026-11-16` → `developer/sprint-2026-11-12` (o PR #19 para a `main` segue aberto) → `main`. Nível: Estudo (N1), 10 critérios aplicáveis (5 e 7 não se aplicam).

### Produto

**Problema e público.** Quem estuda Next.js pratica a landing page de um pet shop que leva o dono do pet ao WhatsApp. O público é simulado (N1).

**Hipótese e meta.** Acreditamos que o botão "Contato via WhatsApp" no topo leva a pessoa ao atendimento em 1 clique, e que as perguntas frequentes respondem as dúvidas comuns. Saberemos quando o teste de ponta a ponta no navegador abrir o `wa.me` com a mensagem certa em 1 clique (e em até 3 Tabs só pelo teclado) e abrir uma pergunta pelo teclado, no CI.

**Análise de 16/11/2026 (o que a régua achou).**
- O `docs/MVP.md` dava 10 de 10, mas a evidência não sustentava três critérios. O 3 citava "no navegador" sem teste do clique no WhatsApp nem da navegação. O 6 dizia "site estático, nada falha", sem teste; a página 404 era a padrão, em inglês e sem link de volta, e sem JavaScript o bloco "Sobre" ficava com opacidade 0 (AOS). O 9 era "Atende" só pelo `npm audit`, com a API do Dependabot respondendo 403.
- O job `deploy` não tinha condição: com o Pages desligado, o merge do #19 deixaria a `main` vermelha.
- O README dizia que o CI "não publica", mas o workflow tem o job `deploy`.
- O link "Entrar em contato" dos serviços tinha `aria-label` diferente do texto visível (WCAG 2.5.3).
- O app não tem tema escuro próprio: há uma classe `.dark` no CSS, mas nada a aplica, e não há `prefers-color-scheme`. Não testamos "escuro"; testamos o celular (375 px).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Nome acessível começa pelo texto visível | O link "Entrar em contato" passa a ter o nome "Entrar em contato sobre <serviço> pelo WhatsApp", com o resto em `sr-only`; teste com a regra `label-content-name-mismatch` do axe | [W3C: Understanding 2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) |
| Página 404 própria | O `app/not-found.tsx` da raiz atende toda URL sem rota; na exportação vira o `404.html` que o Pages serve. Deve ser componente de servidor com `<Link>` | [Next.js: not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) |
| Publicação condicionada a uma variável | `vars.X` sem valor vira texto vazio, e a condição dá falso; a variável se cria em Settings → Secrets and variables → Actions → Variables. Virou `vars.PAGES_VIA_ACTIONS == 'true'` no deploy, como no sushibar | [GitHub Docs: variáveis no Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Deploy condicionado a `PAGES_VIA_ACTIONS` | Alto | Baixo | Este ciclo |
| 2 | Patch e minor das dependências de produção | Alto | Baixo | Este ciclo |
| 3 | Teste de ponta a ponta do fluxo principal, com axe e celular | Alto | Baixo | Este ciclo |
| 4 | Página 404 e conteúdo visível sem JavaScript, com teste | Médio | Baixo | Este ciclo |
| 5 | Nome acessível do "Entrar em contato" (2.5.3) | Médio | Baixo | Este ciclo |
| 6 | Ligar alertas do Dependabot | Alto | Baixo | Responsável (issue nova) |
| 7 | Ligar o Pages e criar a variável | Médio | Baixo | Responsável (#11) |
| 8 | #12, #13, #14, #15 | Médio | Baixo a médio | Issues |

**Fora do escopo.** Agenda com horários, loja, painel, dados reais da loja, tema escuro.

### Engenharia

**Arquitetura.** Sem mudança: Next.js 16 com `output: 'export'`, site estático em `out/` servido em `/petshop`. Entram o `app/not-found.tsx` e um teste `e2e/fluxo.e2e.ts`. O servidor de teste passa a responder o `404.html` com status 404, como o Pages.

**Riscos.**
- O clique no WhatsApp abre um site de fora: o teste intercepta `wa.me` com `context.route` e não sai da máquina.
- Porta fixa 4174 pode servir o site de outro processo com `reuseExistingServer`; a porta passa a vir de `PORT`.
- Mostrar o bloco do AOS antes do JavaScript não pode piscar: a regra só vale enquanto o `html` não tem a classe `aos-ativo`.
- O check exigido pelo ruleset é `raiz`; o Playwright continua nesse job para não travar o merge.

**Qualidade.**
- Testes: Vitest (6) e Playwright (fluxo, 404, sem JavaScript, celular, axe e foco).
- Acessibilidade: axe WCAG 2.2 AA nas 3 páginas, na 404 e em 375 px; regra 2.5.3 ligada à parte.
- Segurança: `npm audit --omit=dev` e o Dependabot (hoje desligado, por isso critério 9 "Parcial").

**Definição de pronto.** `npm ci`, `npm test`, `npm run build` e `npx playwright test` passam; CI verde no PR; revisão independente feita; `docs/MVP.md`, README e `docs/DEPLOY.md` atualizados.

### Plano de ação

**Este ciclo executa.** Deploy condicionado; dependências; teste do fluxo; 404 e AOS sem JavaScript; nome acessível; `docs/MVP.md` honesto (critério 9 "Parcial").

**Vira issue.** Ligar o Dependabot (responsável); #11 com o passo da variável; #12 a #15 seguem.

## Ciclo de 03/11/2026

> Branch `feature/2026-11-03` → `developer/sprint-2026-11-05` → `main`. Nível: Estudo (N1), 10 critérios aplicáveis (5 e 7 não se aplicam).

### Produto

**Problema e público.** Quem estuda Next.js pratica a landing page de um pet shop que leva o cliente ao WhatsApp. O dono de pet que procura banho e tosa é o público simulado.

**Hipótese e meta.** Uma pessoa acha o WhatsApp em 1 clique e tira as dúvidas comuns (preço, tempo, vacinas) sem perguntar. Sem validação com pessoas (N1).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Perguntas frequentes | Sites de banho e tosa respondem preço, tempo e regras numa página de dúvidas e mandam o resto para o atendimento. Virou a seção com 6 perguntas e o link "Pergunte pelo WhatsApp" (#9) | [Exemplo de FAQ de banho e tosa](https://pet-grooming-site.pages.dev/faq), [Wassenger: dúvidas de rotina no atendimento](https://wassenger.com/blog/pt/answer-routine-pet-grooming-questions) |
| Dados estruturados | O tipo PetStore é um subtipo de Store e de LocalBusiness; usar o subtipo mais específico, com horário no formato `Mo-Sa 08:00-18:00`. Virou o JSON-LD montado de `config/site.ts` (#9) | [schema.org: PetStore](https://schema.org/PetStore), [Referência de LocalBusiness](https://schemavalidator.pages.dev/schemas/localbusiness) |
| Agendamento pelo WhatsApp | Pedir porte e pelagem já na primeira mensagem ajuda a reservar o tempo certo. Virou issue (#12) | [SchedulingKit: agendamento de banho e tosa pelo WhatsApp](https://schedulingkit.com/whatsapp-booking/pet-groomers) |
| Foco em duas cores | O W3C descreve o indicador em duas cores (técnica C40), visível em fundo claro e escuro. Virou contorno escuro com anel branco (#8) | [W3C: Focus Appearance](https://w3c.github.io/wcag/understanding/focus-appearance-enhanced) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Foco visível em todas as tabulações, com Playwright | Alto | Baixo | Este ciclo (#8) |
| 2 | CI também nos PRs para a `developer` | Alto | Baixo | Este ciclo |
| 3 | Perguntas frequentes e JSON-LD PetStore | Médio | Baixo | Este ciclo (#9) |
| 4 | Proteger a `main` | Alto | Baixo | Responsável (#10) |
| 5 | Publicar no Pages | Médio | Baixo | Responsável (#11) |
| 6 | Pedido de agendamento pelo WhatsApp | Médio | Médio | Issue (#12) |
| 7 | Aviso de aberto agora | Médio | Baixo | Issue (#13) |
| 8 | Carrosséis acessíveis por teclado | Médio | Baixo | Issue (#14) |
| 9 | ESLint e Dependabot | Médio | Baixo | Issue (#15) |

**Fora do escopo.** Agenda com horários, loja, painel, dados reais da loja.

### Engenharia

**Arquitetura.** Next.js 16 (App Router) com `output: 'export'`, site estático em `out/` servido em `/petshop`. Dados do negócio em `src/config/site.ts`; perguntas em `src/config/faq.ts`; JSON-LD em `src/lib/jsonld.ts`, inserido no `layout.tsx`.

**Riscos.**
- Utilitários como `outline-none` zeram o foco. A regra `html body :focus-visible` vence pela especificidade, sem `!important`.
- Links com `duration-300` mudam o contorno aos poucos; o teste espera 350 ms antes de medir.
- O JSON-LD vai num `<script>`; o `<` é escapado para o texto não fechar a tag.
- O `ubuntu-latest` passou a ser o 26.04, e o Playwright 1.56 não instala o Chromium nele. Usamos o 1.65.
- Sem proteção na `main`, um push direto entra sem CI (#10).

**Qualidade.**
- Testes: Vitest (WhatsApp, JSON-LD, FAQ) e Playwright no Chromium (foco em toda tabulação e axe WCAG 2.2 AA nas 3 páginas, FAQ por teclado, JSON-LD).
- CI: agora também nos PRs para `developer/**`, com Playwright.
- Acessibilidade: foco em duas cores; FAQ com `<details>`, que abre por teclado sem JavaScript.

**Definição de pronto.** `npm ci`, `npm test`, `npm run build` e `npx playwright test` passam; CI verde no PR; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.** #8 (foco), #9 (FAQ e JSON-LD), CI na `developer`, `docs/MVP.md` com régua N1 e critério 10 conforme a proteção.

**Vira issue.** #10 e #11 (responsável); #12, #13, #14 e #15 (agente).

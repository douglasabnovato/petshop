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

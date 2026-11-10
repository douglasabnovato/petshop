# MVP — petshop

> Revisto em 06/11/2026 (ciclo de 03/11/2026). Nível: **Estudo (N1)**. Critérios 5 e 7 não se aplicam em N1 e saem da conta. Testado no Windows (Node 24) e no CI (Ubuntu, Node 22). Não houve teste com pessoas nem em aparelho real.

**Resumo:** 10 de 10 aplicáveis atendidos

**Finalizado:** sim. Todos os critérios aplicáveis atendem. O 10 passou a "Atende" em 10/11/2026, com a `main` protegida pelo ruleset `principal-protegida` (#10). Ligar o Pages segue com o responsável (#11); o workflow de publicação já está pronto.

## 1. Critérios: 10 de 10 aplicáveis atendidos

| # | Critério | Como verificar | Situação | Evidência (06/11/2026) |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Um pet shop divulga serviços e recebe contato pelo WhatsApp. |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende | Seção 2; sem validação com pessoas (N1). |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende | No navegador: link `wa.me`, contatos, perguntas frequentes e retorno ao início. |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | Seção 3. |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) | Projeto de estudo sem coleta de uso. |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende | Site estático, sem formulário nem chamada de rede que possa falhar; dúvida fora da lista vai para o WhatsApp. |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1) | Sem publicação: o endereço do Pages responde 404 (#11). |
| 8 | Acessibilidade básica | axe e teclado | Atende | Playwright no CI: contorno sólido de 2 px ou mais em todas as tabulações de `/`, `/sobre` e `/contatos`; axe WCAG 2.2 AA sem violações nas 3 (#8). |
| 9 | Segurança e conformidade | Riscos decididos | Atende | `npm audit` sem alertas; JSON-LD com `<` escapado e teste. |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Atende | `gh api repos/douglasabnovato/petshop/rulesets`, em 10/11/2026: ruleset `principal-protegida` ativo (exige PR, bloqueia force push e exclusão); workflow `CI` roda nos PRs para `main` e `developer/**` (#10). |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende | Vitest (WhatsApp, JSON-LD, FAQ) e Playwright (foco, axe, FAQ, JSON-LD) no workflow `CI`. |
| 12 | Documentação honesta | O README ensina a rodar | Atende | Comandos conferidos com o `package.json`; sem link publicado enquanto o Pages não responder. |

## 2. Hipótese (proposta)

Praticar Next.js: chegar ao WhatsApp da loja em 1 clique a partir da página inicial, e tirar as dúvidas comuns sem precisar perguntar.

## 3. Fora do MVP

Agendamento com horário, loja e painel; os contatos são fictícios.

## 4. Neste ciclo

Foco visível em duas cores com teste Playwright e axe; perguntas frequentes; dados estruturados PetStore; CI nos PRs da `developer`. Plano em [`PLANO-DE-ACAO.md`](PLANO-DE-ACAO.md#ciclo-de-03112026).

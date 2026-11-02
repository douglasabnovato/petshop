# MVP — petshop

> Criado em 02/11/2026. Meta: N1 (estudo). Testado no Windows, com Node 24, na cópia de `main`. Não houve teste com pessoas nem em aparelho real.

## 1. Critérios: 9 de 12 atendidos

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: Um pet shop divulga serviços e recebe contato pelo WhatsApp. |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: Proposta na seção 2; ainda sem validação com pessoas. |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende: No navegador: link `wa.me` presente, contatos abertos e retorno ao início. |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: Seção 3. |
| 5 | Medição de uso | A métrica principal é coletada | Não atende: Projeto de estudo sem coleta de uso. |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: Site estático, sem formulário nem chamada de rede que possa falhar. |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não medido: Sem publicação verificada neste ciclo. |
| 8 | Acessibilidade básica | axe e teclado | Parcial: axe sem violações em 3 telas, sem rolagem em 375 px; na inicial, 4 de 6 tabulações com foco visível detectado. |
| 9 | Segurança e conformidade | Riscos decididos | Atende: `npm audit fix` zerou 3 alertas de produção. |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Atende: CI verde no PR deste ciclo; a principal segue sem proteção. |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: Testes automatizados rodam no CI. |
| 12 | Documentação honesta | O README ensina a rodar | Atende: Comandos conferidos com o `package.json`; aviso de estudo no README. |

## 2. Hipótese (proposta)

Praticar Next.js: chegar ao WhatsApp da loja em 1 clique a partir da página inicial.

## 3. Fora do MVP

Agendamento, loja e painel; os contatos são fictícios.

## 4. Neste ciclo

Atualiza dependências com alerta.

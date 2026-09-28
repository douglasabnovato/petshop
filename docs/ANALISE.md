# Análise — Petshop Dev

## 1. Especificação

Landing page para gerar contatos pelo WhatsApp: quem visita entende os serviços, confia na loja e chama no WhatsApp com a mensagem já pronta.

| ID | Requisito | Antes | Depois |
|---|---|---|---|
| RF01 | Contato por WhatsApp em todos os pontos | ⚠️ 2 de 4 botões eram "#" | ✅ |
| RF02 | Mensagem com o serviço escolhido | ⚠️ texto sem codificar e com "sbore" | ✅ |
| RF03 | Endereço e mapa | ❌ "#" | ✅ |
| RF04 | Páginas Sobre e Contatos | ❌ só o título | ✅ |
| RF05 | SEO básico | ❌ "Create Next App", lang=en | ✅ |

## 2. Defeitos encontrados

| # | Severidade | Defeito | Referência |
|---|---|---|---|
| D1 | Alta | Next 15.1.6 com vulnerabilidades conhecidas (1 crítica, 7 altas no audit) | OWASP A03:2025 |
| D2 | Alta | Botões e links principais apontando para "#" | Nielsen #5 |
| D3 | Média | Depoimentos de pessoas fictícias apresentados como reais | Ética / CDC art. 37 |
| D4 | Média | Botão verde com texto branco (2,3:1), lang=en, carrossel sem nomes | WCAG 2.2 1.4.3, 3.1.1, 4.1.2 |
| D5 | Média | Hero animado atrasando o LCP; imagens quality=100 e priority abaixo da dobra | Core Web Vitals |
| D6 | Baixa | Texto do "Sobre" em inglês; dados de teste no rodapé | — |

## 3. Baseline automatizado

| Verificação | Antes | Depois |
|---|---|---|
| `npm audit` | 10 (1 crítica, 7 altas) | 0 |
| Build | depende do Google Fonts na hora do build | fonte local |
| Lighthouse mobile | — | 98 / 100 / 96 / 100 |
| axe-core | — | 0 violações |
| Testes | 0 | 2 |

## Rubrica v2 (grupo landing/vitrine)

Aprovação: média ponderada ≥ 7,0 **e** C1 e C4 (eliminatórios) ≥ 5. Regras: nota sem evidência vale no máximo 6; C1 limitado a 7 para parte não executada de ponta a ponta; C9 ≥ 8 só com URL publicada e CI verde.

| # | Critério | Referência | Peso | Antes | Depois | Evidência | Justificativa |
|---|---|---|---|---|---|---|---|
| C1 | Núcleo de valor | MVP (Ries); SWEBOK Requirements | 17% | 5 | 8 | next build + next start; home, /sobre e /contatos navegáveis | /sobre e /contatos eram só um título; título da aba era "Create Next App" |
| C2 | Estados e condições excepcionais | Nielsen; OWASP A10:2025 | 8% | 3 | 7 | links "#" substituídos; redes só aparecem com URL | Botões de WhatsApp do rodapé, endereço e redes apontavam para "#" |
| C3 | Acessibilidade | WCAG 2.2 AA (axe-core) | 13% | 4 | 9 | axe-core 0 (3 páginas) e Lighthouse Acessibilidade 100 | lang=en, botões do carrossel sem nome, botão verde com texto branco 2,3:1 |
| C4 | Segurança e privacidade | OWASP Top 10:2025 / ASVS 5.0 N1 | 7% | 4 | 8 | npm audit 0 (Next 15.1.6 → 16.3.6); rel=noopener em target=_blank | Next 15.1.6 com falhas conhecidas de segurança (inclui crítica) |
| C5 | Dados | 3FN / ACID / fonte única | 2% | 4 | 8 | dados do negócio em src/config/site.ts | E-mail teste@teste.com e telefone (XX) no rodapé; preencha os reais em site.ts |
| C6 | Testes | Pirâmide de testes; SWEBOK Testing | 4% | 0 | 5 | vitest 2 testes (link do WhatsApp) | Sem testes de componentes |
| C7 | Qualidade de código | SOLID / camadas; SWEBOK Construction | 6% | 5 | 8 | componentes enxutos; carrosséis como listas | linkText e preço em "$" sem uso removidos |
| C8 | Desempenho | Complexidade; Core Web Vitals | 15% | 5 | 9 | Lighthouse mobile: Desempenho 98, LCP 2,2 s, CLS 0, TBT 80 ms | Hero com animação atrasava o LCP (3,8 s → 2,2 s); imagens com quality 100 e priority abaixo da dobra |
| C9 | Operação | 12-Factor; DORA | 6% | 4 | 7 | CI em ci/; deploy gratuito na Vercel | Sem URL publicada |
| C10 | Documentação | README como contrato | 6% | 2 | 7 | README com como editar os dados e publicar | README antes tinha 3 linhas |
| C11 | Produto e evidência | Cagan (4 riscos); Torres | 12% | 4 | 8 | SEO 100, metadados pt-BR/OpenGraph; depoimentos marcados como ilustrativos | Texto do Sobre estava em inglês; depoimentos fictícios pareciam reais |
| C12 | Sustentabilidade técnica | OWASP A03:2025; SWEBOK Maintenance | 4% | 3 | 8 | Next 16, React 19, fonte Geist local | create-next-app sem atualização |

**Média ponderada:** antes **3,98** (REPROVADO) → depois **7,96** (APROVADO).


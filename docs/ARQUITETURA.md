# Arquitetura — Petshop Dev

```mermaid
flowchart TB
  layout[app/layout.tsx - metadados, lang pt-BR, Geist local] --> home[app/page.tsx]
  layout --> sobre[app/sobre] & contatos[app/contatos]
  home --> Hero & About & Services & Testimonials & Footer
  Hero & About & Services & Footer & contatos --> wa[lib/whatsapp.ts]
  wa --> cfg[(config/site.ts - dados do negócio)]
  Footer & About & contatos --> cfg
```

Todas as páginas são estáticas (pré-renderizadas); não há back-end.

## ADRs

| # | Decisão | Motivo | Alternativa |
|---|---|---|---|
| ADR-01 | Dados do negócio em `config/site.ts` | Trocar telefone/endereço em um lugar | Espalhados nos componentes |
| ADR-02 | Next 16 | Única linha sem vulnerabilidades no audit | Ficar no 15.x com a do postcss |
| ADR-03 | Fonte Geist pelo pacote `geist` | Build sem depender de rede; sem FOUT | `next/font/google` |
| ADR-04 | Sem animação no hero | O texto principal é o LCP | Manter AOS no hero |

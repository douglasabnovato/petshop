/* Perguntas frequentes do pet shop (temas comuns em sites do ramo; valores e regras são ilustrativos enquanto site.isDemo for true) */
export type Faq = { id: string; pergunta: string; resposta: string };

export const faq: Faq[] = [
  { id: "preco", pergunta: "Quanto custa o banho e tosa?", resposta: "Depende do porte, da pelagem e do tipo de tosa. Mande uma mensagem pelo WhatsApp com a raça e o porte do pet para receber o valor." },
  { id: "duracao", pergunta: "Quanto tempo leva o banho e tosa?", resposta: "Em média 1 hora. Pets de pelagem longa ou com nós podem levar mais. Avisamos pelo WhatsApp quando estiver pronto." },
  { id: "gatos", pergunta: "Vocês atendem gatos?", resposta: "Sim. O banho de felinos é feito em horário mais calmo, com manuseio cuidadoso para reduzir o estresse." },
  { id: "vacinas", pergunta: "Preciso apresentar a carteira de vacinação?", resposta: "Sim, para banho e tosa e para o hotel. Traga a carteira com as vacinas em dia, conforme a orientação do veterinário do seu pet." },
  { id: "taxi", pergunta: "Vocês buscam e levam o pet?", resposta: "Sim, pelo serviço de Táxi Pet. Combine o horário e o endereço pelo WhatsApp." },
  { id: "depois", pergunta: "E se o pet estranhar o banho?", resposta: "Observe o comportamento nas horas seguintes. Coceira, vermelhidão ou apatia que não passam são motivo para procurar o veterinário e nos avisar." },
];
/* Fim de faq.ts */

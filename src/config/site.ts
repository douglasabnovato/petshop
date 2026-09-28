/* Dados do negócio em um só lugar (antes espalhados e com placeholders em vários componentes); preencha com os dados reais */
export const site = {
  name: "Pet Shop Dev",
  description: "Banho e tosa, consulta veterinária, táxi pet e hotel para pets em Campo Grande (MS).",
  url: "https://douglasabnovato.github.io/petshop/",
  whatsapp: "556799998800",
  phoneDisplay: "(67) 99999-8800",
  email: "contato@petshopdev.com.br",
  address: "Rua X, Centro, Campo Grande - MS",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Centro%2C+Campo+Grande+-+MS",
  openingHours: "Segunda a sábado, das 8h às 18h",
  social: [
    { name: "Facebook", url: "" },
    { name: "Instagram", url: "" },
    { name: "YouTube", url: "" },
  ],
  isDemo: true,
} as const;
/* Fim de site.ts */

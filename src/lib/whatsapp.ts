/* Monta o link do WhatsApp com a mensagem codificada (antes o texto ia sem codificar e com erro de digitação) */
import { site } from "../config/site";

/* Link wa.me para o número do site com a mensagem informada */
export function whatsappLink(message = "Olá, vim pelo site e gostaria de mais informações."): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
/* Fim de whatsapp.ts */

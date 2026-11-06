/* Perguntas frequentes com <details>: abre e fecha por teclado e leitor de tela sem JavaScript */
import { faq } from "../../config/faq";
import { whatsappLink } from "../../lib/whatsapp";

export function Faq() {
  return (
    <section className="bg-[#FDF6ec] py-16" aria-labelledby="faq-title">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 id="faq-title" className="text-4xl font-bold mb-8">Perguntas frequentes</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.id} id={`faq-${f.id}`} className="bg-white rounded-lg p-4 shadow-sm">
              <summary className="font-semibold cursor-pointer">{f.pergunta}</summary>
              <p className="mt-3 text-gray-800">{f.resposta}</p>
            </details>
          ))}
        </div>
        <p className="mt-6">
          Não achou sua dúvida?{" "}
          <a className="underline font-semibold text-red-800" href={whatsappLink("Olá, vim pelo site e tenho uma dúvida.")} target="_blank" rel="noopener noreferrer">
            Pergunte pelo WhatsApp<span className="sr-only"> (abre em nova aba)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
/* Fim de faq.tsx */

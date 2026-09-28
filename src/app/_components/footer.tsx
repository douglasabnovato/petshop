/* Rodapé: marcas, contatos e redes a partir de config/site.ts (antes com links "#" e dados de teste) */
import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import golden from "../../../public/golden.png";
import royal from "../../../public/royal.png";
import primier from "../../../public/primier.png";
import whiskas from "../../../public/whiskas.png";
import natural from "../../../public/natural.png";
import { site } from "../../config/site";
import { whatsappLink } from "../../lib/whatsapp";

const brands = [
  { name: "Royal Canin", logo: royal },
  { name: "Golden", logo: golden },
  { name: "Premier", logo: primier },
  { name: "Fórmula Natural", logo: natural },
  { name: "Whiskas", logo: whiskas },
];
const ICONS = { Facebook: FacebookLogo, Instagram: InstagramLogo, YouTube: YoutubeLogo } as const;

export function Footer() {
  const socials = site.social.filter((s) => s.url);
  return (
    <footer className="bg-[#C0392B] py-16 text-white">
      <div className="container mx-auto px-4">
        <section className="border-b border-white/20 pb-8" aria-labelledby="marcas-title">
          <h2 id="marcas-title" className="text-3xl font-semibold mb-8 text-center">Marcas que trabalhamos</h2>
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {brands.map((item) => (
              <li key={item.name} className="bg-white p-4 rounded-lg flex items-center justify-center">
                <Image src={item.logo} alt={item.name} width={100} height={50} style={{ width: "auto", height: "auto" }} className="object-contain" />
              </li>
            ))}
          </ul>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mt-5">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{site.name}</h2>
            <p className="mb-4">Cuidando do seu melhor amigo com amor e dedicação.</p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-800 hover:bg-green-900 px-4 py-2 rounded-md">
              Contato via WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
          <address className="not-italic">
            <h2 className="text-2xl font-semibold mb-2">Contatos</h2>
            <p>E-mail: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p>
            <p>Telefone: <a className="underline" href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a></p>
            <p>{site.address}</p>
            <p>{site.openingHours}</p>
          </address>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Saiba mais</h2>
            <ul className="space-y-1">
              <li><Link className="underline" href="/sobre">Sobre nós</Link></li>
              <li><Link className="underline" href="/contatos">Contatos e localização</Link></li>
            </ul>
            {socials.length > 0 && (
              <div className="flex gap-4 mt-4">
                {socials.map((s) => {
                  const Icon = ICONS[s.name as keyof typeof ICONS];
                  return (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (abre em nova aba)`}>
                      <Icon className="w-8 h-8" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-white/90">© {new Date().getFullYear()} {site.name}.{site.isDemo ? " Site de demonstração." : ""}</p>
      </div>
    </footer>
  );
}
/* Fim de footer.tsx */

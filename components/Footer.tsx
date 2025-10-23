import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { getSiteSettings } from "@/cms/queries";

const footerLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Cookies", href: "/cookies" },
];

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const siteSettings = await getSiteSettings();

  return (
    <footer className="text-white py-12" style={{ background: 'linear-gradient(to bottom, #4A5240, #3D4233)' }}>
      <Container>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Novastart</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Een initiatief van Grotius College. (Her)Ontdek jouw toekomst met ons 9-maanden traject voor jongeren die een nieuwe start zoeken.
            </p>
            
            {/* Grotius College Logo */}
            <div className="mt-6 pt-6 border-t border-white/10">
              {siteSettings?.grotiusLogo?.url ? (
                <div className="relative w-40 h-20 bg-white/95 rounded-2xl p-3 backdrop-blur-sm">
                  <Image
                    src={siteSettings.grotiusLogo.url}
                    alt={siteSettings.grotiusLogo.alt || "Grotius College logo"}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-xl">GC</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-200">Grotius College</p>
                    <p className="text-xs text-neutral-500">Leren, groeien, ontdekken</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="text-neutral-400 text-sm not-italic">
              <strong>Grotius College</strong><br />
              Akerstraat 117<br />
              6417 BM Heerlen<br />
              <br />
              Tel: <a href="tel:0455713952" className="hover:text-primary transition-colors">045 - 571 39 52</a><br />
              E-mail: <a href="mailto:info@grotius-lvo.nl" className="hover:text-primary transition-colors">info@grotius-lvo.nl</a>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Volg ons</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors focus-visible-ring"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors focus-visible-ring"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors focus-visible-ring"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            © {currentYear} Novastart - Grotius College. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-primary transition-colors focus-visible-ring"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}


import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { getSiteSettings } from "@/cms/queries";

// Fallback data als Sanity niet beschikbaar is
const defaultFooterLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Cookies", href: "/cookies" },
];

const defaultDescription = "Een initiatief van Grotius College. (Her)Ontdek jouw toekomst met ons 9-maanden traject voor jongeren die een nieuwe start zoeken.";

const defaultContactInfo = {
  address: "Grotius College\nAkerstraat 117\n6417 BM Heerlen",
  phone: "045 - 571 39 52",
  email: "info@grotius-lvo.nl"
};

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const siteSettings = await getSiteSettings();
  
  const siteTitle = siteSettings?.siteTitle || "Novastart";
  const footerDescription = siteSettings?.footerDescription || defaultDescription;
  const footerLinks = siteSettings?.footerLinks || defaultFooterLinks;
  const contactInfo = siteSettings?.contactInfo || defaultContactInfo;
  const socialLinks = siteSettings?.socialLinks;
  const copyrightText = siteSettings?.copyrightText 
    ? siteSettings.copyrightText.replace('{year}', currentYear.toString())
    : `© ${currentYear} Novastart - Grotius College. Alle rechten voorbehouden.`;

  return (
    <footer className="text-white py-12" style={{ background: 'linear-gradient(to bottom, #4A5240, #3D4233)' }}>
      <Container>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">{siteTitle}</h3>
            <p className="text-neutral-400 text-sm mb-6">
              {footerDescription}
            </p>
            
            {/* Grotius College Logo */}
            <div className="mt-8 pt-8 border-t border-white/10">
              {siteSettings?.grotiusLogo?.url ? (
                <div className="relative w-full h-32 flex items-center justify-center">
                  <Image
                    src={siteSettings.grotiusLogo.url}
                    alt={siteSettings.grotiusLogo.alt || "Grotius College logo"}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-xl">GC</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Grotius College</p>
                    <p className="text-xs text-neutral-400">Leren, groeien, ontdekken</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <address className="text-neutral-400 text-sm not-italic">
              {contactInfo.address && (
                <>
                  {contactInfo.address.split('\n').map((line, index) => (
                    <span key={index}>
                      {index === 0 ? <strong>{line}</strong> : line}
                      <br />
                    </span>
                  ))}
                  <br />
                </>
              )}
              {contactInfo.phone && (
                <>
                  Tel: <a href={`tel:${contactInfo.phone.replace(/\s|-/g, '')}`} className="hover:text-primary transition-colors">{contactInfo.phone}</a><br />
                </>
              )}
              {contactInfo.email && (
                <>
                  E-mail: <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">{contactInfo.email}</a>
                </>
              )}
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Volg ons</h3>
            <div className="flex gap-4">
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors focus-visible-ring"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors focus-visible-ring"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors focus-visible-ring"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            {copyrightText}
          </p>
          {footerLinks && footerLinks.length > 0 && (
            <div className="flex gap-6">
              {footerLinks.map((link: any) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-primary transition-colors focus-visible-ring"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}


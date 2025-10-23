import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { LegalPageRenderer } from "@/components/LegalPageRenderer";
import { getLegalPage } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies - Novastart",
  description: "Cookiebeleid van Novastart: welke cookies we gebruiken en waarom.",
  robots: {
    index: false,
  },
};

export default async function CookiesPage() {
  const data = await getLegalPage("cookies");

  return (
    <>
      <PageHero
        title={data?.title || "Cookies"}
        description="Ons cookiebeleid"
      />

      <Section>
        <Container>
          {data ? (
            <LegalPageRenderer
              intro={data.intro}
              sections={data.sections}
              lastUpdated={data.lastUpdated}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
            <p className="lead">
              Deze website van Novastart maakt gebruik van cookies. In deze verklaring 
              leggen we uit wat cookies zijn en hoe wij deze gebruiken.
            </p>

            <h2>1. Wat zijn cookies?</h2>
            <p>
              Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze 
              website wordt opgeslagen in de browser van jouw computer, tablet of 
              smartphone. Cookies zorgen ervoor dat de website goed werkt en onthouden 
              jouw voorkeuren.
            </p>

            <h2>2. Welke cookies gebruiken wij?</h2>
            
            <h3>Functionele cookies</h3>
            <p>
              Deze website gebruikt alleen functionele cookies die noodzakelijk zijn 
              voor de werking van de website en voor een goede gebruikerservaring. 
              Deze cookies:
            </p>
            <ul>
              <li>Onthouden je voorkeursinstellingen</li>
              <li>Zorgen dat de website goed functioneert</li>
              <li>Zorgen voor de beveiliging van de website</li>
            </ul>
            <p>
              Voor functionele cookies is geen toestemming nodig.
            </p>

            <h3>Analytische cookies</h3>
            <p>
              Deze website maakt <strong>geen gebruik</strong> van analytische cookies 
              of tracking. We verzamelen geen gegevens over je surfgedrag.
            </p>

            <h3>Marketing cookies</h3>
            <p>
              Deze website maakt <strong>geen gebruik</strong> van marketing cookies. 
              Je wordt niet gevolgd voor advertentiedoeleinden.
            </p>

            <h2>3. Cookies van derden</h2>
            <p>
              Op sommige pagina's kunnen embedded content van derden (zoals YouTube video's 
              of Google Maps) worden weergegeven. Deze diensten kunnen cookies plaatsen. 
              Novastart heeft daar geen invloed op. Lees de privacyverklaringen van deze 
              diensten om te zien hoe zij met jouw gegevens omgaan:
            </p>
            <ul>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Google (Maps) Privacy Policy
                </a>
              </li>
            </ul>

            <h2>4. Cookies in- en uitschakelen</h2>
            <p>
              Via je browser kun je cookies uitschakelen of verwijderen. Dit doe je via 
              de instellingen van je browser. Houd er rekening mee dat sommige delen van 
              deze website mogelijk niet goed werken als je cookies uitschakelt.
            </p>
            <p>
              Meer informatie over het in- en uitschakelen van cookies vind je hier:
            </p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" target="_blank" rel="noopener noreferrer">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-in-microsoft-edge-verwijderen-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2>5. Vragen?</h2>
            <p>
              Heb je vragen over ons cookiebeleid? Neem dan contact met ons op via 
              info@novastart.nl of bel naar 045 - 123 4567.
            </p>

            <p className="text-sm text-neutral-600 mt-8">
              <strong>Laatst bijgewerkt:</strong> oktober 2025
            </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}


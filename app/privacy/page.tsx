import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { LegalPageRenderer } from "@/components/LegalPageRenderer";
import { getLegalPage } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy - Novastart",
  description: "Privacyverklaring van Novastart: hoe we omgaan met uw persoonsgegevens.",
  robots: {
    index: false,
  },
};

export default async function PrivacyPage() {
  const data = await getLegalPage("privacy");

  return (
    <>
      <PageHero
        title={data?.title || "Privacy"}
        description="Onze privacyverklaring"
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
              Novastart vindt een zorgvuldige omgang met persoonsgegevens van groot 
              belang. Deze privacyverklaring geeft informatie over hoe wij omgaan 
              met persoonsgegevens.
            </p>

            <h2>1. Wie zijn wij?</h2>
            <p>
              Novastart is een onderwijsinstelling in Heerlen. Wij zijn verantwoordelijk 
              voor de verwerking van persoonsgegevens zoals weergegeven in deze 
              privacyverklaring.
            </p>
            <p>
              <strong>Contactgegevens:</strong><br />
              Novastart<br />
              Voorbeeldstraat 123<br />
              6411 AB Heerlen<br />
              E-mail: info@novastart.nl<br />
              Telefoon: 045 - 123 4567
            </p>

            <h2>2. Welke gegevens verzamelen wij?</h2>
            <p>
              Novastart verwerkt persoonsgegevens doordat je gebruik maakt van onze 
              diensten en/of omdat je deze gegevens zelf aan ons verstrekt. We kunnen 
              de volgende gegevens van je verwerken:
            </p>
            <ul>
              <li>Voor- en achternaam</li>
              <li>Adresgegevens</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>Geboortedatum</li>
              <li>Onderwijsgegevens (cijfers, rapporten, etc.)</li>
              <li>Gegevens over gezondheid (indien relevant voor begeleiding)</li>
            </ul>

            <h2>3. Waarom hebben wij deze gegevens nodig?</h2>
            <p>
              Novastart verwerkt jouw persoonsgegevens voor de volgende doelen:
            </p>
            <ul>
              <li>Het verzorgen van onderwijs en begeleiding</li>
              <li>Contact met ouders/verzorgers en leerlingen</li>
              <li>Het voldoen aan wettelijke verplichtingen</li>
              <li>Administratieve en financiële doeleinden</li>
              <li>Veiligheid en welzijn van leerlingen</li>
            </ul>

            <h2>4. Hoe lang bewaren wij gegevens?</h2>
            <p>
              Novastart bewaart persoonsgegevens niet langer dan noodzakelijk voor het 
              doel waarvoor deze zijn verstrekt dan wel op grond van de wet is vereist. 
              We hanteren de volgende bewaartermijnen:
            </p>
            <ul>
              <li>Leerlingdossiers: minimaal 5 jaar na uitschrijving</li>
              <li>Financiële administratie: 7 jaar</li>
              <li>Contactformulieren: 1 jaar</li>
            </ul>

            <h2>5. Delen wij gegevens met derden?</h2>
            <p>
              Novastart verstrekt alleen aan derden persoonsgegevens als dit noodzakelijk 
              is voor de uitvoering van onderwijs en begeleiding of om te voldoen aan 
              een wettelijke verplichting. Voorbeelden zijn:
            </p>
            <ul>
              <li>Samenwerkingspartners in het onderwijs</li>
              <li>Gemeente (voor bekostiging)</li>
              <li>Inspectie van het Onderwijs</li>
              <li>Zorgverleners (met toestemming)</li>
            </ul>

            <h2>6. Jouw rechten</h2>
            <p>
              Je hebt het recht om:
            </p>
            <ul>
              <li>Je persoonsgegevens in te zien</li>
              <li>Onjuiste gegevens te laten corrigeren</li>
              <li>Gegevens te laten verwijderen</li>
              <li>Bezwaar te maken tegen verwerking</li>
              <li>Gegevens over te dragen (dataportabiliteit)</li>
            </ul>
            <p>
              Om deze rechten uit te oefenen, kun je contact met ons opnemen via 
              info@novastart.nl.
            </p>

            <h2>7. Beveiliging</h2>
            <p>
              Novastart neemt de bescherming van jouw gegevens serieus en neemt 
              passende maatregelen om misbruik, verlies, onbevoegde toegang en 
              ongewenste openbaarmaking te voorkomen.
            </p>

            <h2>8. Klachten</h2>
            <p>
              Als je een klacht hebt over de verwerking van jouw persoonsgegevens, 
              dan vragen we je hierover direct contact met ons op te nemen. Je hebt 
              ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.
            </p>

            <h2>9. Wijzigingen privacyverklaring</h2>
            <p>
              Novastart kan deze privacyverklaring aanpassen. Nieuwe versies worden 
              altijd op deze website gepubliceerd. We raden je aan om deze verklaring 
              regelmatig te raadplegen.
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


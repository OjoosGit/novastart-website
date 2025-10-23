import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { getQualityDocsData } from "@/cms/queries";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kwaliteit - Novastart",
  description: "Onze protocollen, veiligheid en kwaliteitssystemen voor verantwoord onderwijs.",
  openGraph: {
    title: "Kwaliteit - Novastart",
    description: "Onze protocollen, veiligheid en kwaliteitssystemen voor verantwoord onderwijs.",
  },
};

export default async function KwaliteitPage() {
  const qualityDocs = await getQualityDocsData();

  return (
    <>
      <PageHero
        title="Kwaliteit"
        description="Veiligheid, protocollen en kwaliteitszorg"
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      />

      <Section>
        <Container>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="lead">
              Bij Novastart staan kwaliteit en veiligheid voorop. We werken volgens 
              duidelijke protocollen en systemen die zorgen voor verantwoord en 
              betrouwbaar onderwijs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-h3 mb-4">Veiligheid</h3>
              <p className="mb-4">
                We bieden een veilige leer- en werkomgeving voor alle leerlingen 
                en medewerkers. Ons veiligheidsbeleid omvat:
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li>• Vertrouwenspersoon beschikbaar</li>
                <li>• Gedragscode voor leerlingen en personeel</li>
                <li>• Protocol grensoverschrijdend gedrag</li>
                <li>• Veilige meldprocedures</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-h3 mb-4">Kwaliteitszorg</h3>
              <p className="mb-4">
                We werken continu aan verbetering van onze kwaliteit door:
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li>• Regelmatige evaluaties met leerlingen</li>
                <li>• Scholing en training van personeel</li>
                <li>• Externe audits en certificering</li>
                <li>• Samenwerking met ketenpartners</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-h3 mb-4">Privacy & AVG</h3>
              <p className="mb-4">
                We gaan zorgvuldig om met persoonsgegevens volgens de AVG:
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li>• Privacyverklaring beschikbaar</li>
                <li>• Veilige opslag van gegevens</li>
                <li>• Functionaris gegevensbescherming</li>
                <li>• Recht op inzage en correctie</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-h3 mb-4">Kwaliteitskader</h3>
              <p className="mb-4">
                We werken volgens erkende kwaliteitskaders:
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li>• Inspectienormen passend onderwijs</li>
                <li>• Kwaliteitscriteria VSO</li>
                <li>• Wet- en regelgeving onderwijs</li>
              </ul>
            </div>
          </div>

          {qualityDocs && qualityDocs.length > 0 && (
            <>
              <h2 className="text-h2 mb-6">Documenten</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {qualityDocs.map((doc: any, index: number) => (
                  <a
                    key={index}
                    href={doc.url || "#"}
                    className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{doc.title}</h3>
                      {doc.summary && (
                        <p className="text-sm text-neutral-600">{doc.summary}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}


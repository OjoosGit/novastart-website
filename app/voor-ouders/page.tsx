import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getFAQData } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voor ouders - Novastart",
  description: "Informatie voor ouders: veelgestelde vragen over aanmelding, kosten, begeleiding en meer.",
  openGraph: {
    title: "Voor ouders - Novastart",
    description: "Informatie voor ouders: veelgestelde vragen over aanmelding, kosten, begeleiding en meer.",
  },
};

export default async function VoorOudersPage() {
  const faqs = await getFAQData("ouders");

  return (
    <>
      <PageHero
        title="Voor ouders"
        description="Praktische informatie en antwoorden op veelgestelde vragen"
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
      />

      <Section>
        <Container>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="lead">
              Als ouder wil je natuurlijk het beste voor je kind. Wanneer het reguliere 
              onderwijs niet meer past, kan dat veel vragen oproepen. Hieronder vind je 
              antwoorden op de meest gestelde vragen van ouders.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-h2 mb-6">Veelgestelde vragen</h2>
            <FAQAccordion faqs={faqs} />
          </div>

          <div className="bg-primary/5 p-8 rounded-lg">
            <h2 className="text-h2 mb-4">Nog vragen?</h2>
            <p className="text-lead mb-6">
              Staat je vraag er niet tussen? Neem gerust contact met ons op. 
              We helpen je graag verder.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/kennismaken-en-aanmelden" className="btn-primary">
                Stel je vraag
              </a>
              <a href="tel:0455713952" className="btn-secondary">
                Bel Grotius College
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


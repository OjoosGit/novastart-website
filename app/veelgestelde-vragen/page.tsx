import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getFAQData } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veelgestelde vragen - Novastart",
  description: "Antwoorden op veelgestelde vragen over Novastart, het aanmeldproces, het traject en meer.",
  openGraph: {
    title: "Veelgestelde vragen - Novastart",
    description: "Antwoorden op veelgestelde vragen over Novastart, het aanmeldproces, het traject en meer.",
  },
};

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

export default async function VeelgesteldeVragenPage() {
  // Haal alle FAQ's op (zonder category filter)
  const allFaqs = await getFAQData();

  // Groepeer FAQ's per categorie
  const faqsByCategory: Record<string, FAQ[]> = {};
  allFaqs.forEach((faq: FAQ) => {
    const category = faq.category || 'algemeen';
    if (!faqsByCategory[category]) {
      faqsByCategory[category] = [];
    }
    faqsByCategory[category].push(faq);
  });

  // Categorie namen (voor weergave)
  const categoryNames: Record<string, string> = {
    algemeen: "Algemeen",
    ouders: "Voor Ouders",
  };

  // Sorteer categorieën: eerst 'algemeen', dan de rest
  const categoryOrder = ['algemeen', 'ouders'];
  const sortedCategories = categoryOrder.filter(cat => faqsByCategory[cat]);

  return (
    <>
      <PageHero
        title="Veelgestelde vragen"
        description="Vind antwoorden op de meest gestelde vragen over Novastart"
        image="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop"
      />

      <Section>
        <Container>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="lead">
              Heb je vragen over Novastart? Hieronder vind je antwoorden op de meest 
              gestelde vragen. Staat je vraag er niet tussen? Neem gerust contact met ons op.
            </p>
          </div>

          {/* Toon FAQ's per categorie */}
          {sortedCategories.length > 0 ? (
            <div className="space-y-16">
              {sortedCategories.map((category) => (
                <div key={category}>
                  <h2 className="text-h2 mb-6">
                    {categoryNames[category] || category}
                  </h2>
                  <FAQAccordion faqs={faqsByCategory[category]} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <p className="text-neutral-600">
                Er zijn nog geen veelgestelde vragen beschikbaar.
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-primary/5 p-8 rounded-lg mt-16">
            <h2 className="text-h2 mb-4">Vraag niet beantwoord?</h2>
            <p className="text-lead mb-6">
              Staat je vraag er niet tussen? Neem gerust contact met ons op. 
              We helpen je graag verder met al je vragen over Novastart.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/kennismaken-en-aanmelden" className="btn-primary">
                Stel je vraag
              </a>
              <a href="/contact" className="btn-secondary">
                Contactgegevens
              </a>
              <a href="tel:0455713952" className="btn-secondary">
                Bel: 045 571 39 52
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


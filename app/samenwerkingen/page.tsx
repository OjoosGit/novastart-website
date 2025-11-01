import { PageHero } from "@/components/PageHero";
import { PartnerGrid } from "@/components/PartnerGrid";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { getPartnersData } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samenwerkingen - Novastart",
  description: "Onze partners en samenwerkingsverbanden in de regio Heerlen.",
  openGraph: {
    title: "Samenwerkingen - Novastart",
    description: "Onze partners en samenwerkingsverbanden in de regio Heerlen.",
  },
};

export default async function SamenwerkingenPage() {
  const partners = await getPartnersData();

  return (
    <>
      <PageHero
        title="Samenwerkingen"
        description="Samen werken we aan de beste begeleiding voor jongeren"
        image="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
      />

      <Section>
        <Container>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="lead">
              Bij Novastart werken we nauw samen met verschillende organisaties en 
              instellingen in de regio. Deze samenwerkingen zorgen ervoor dat we 
              jongeren optimaal kunnen begeleiden naar een passende vervolgstap.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-h2 mb-6">Onze partners</h2>
            <PartnerGrid partners={partners} />
          </div>

          <div className="bg-neutral-50 p-8 rounded-lg">
            <h2 className="text-h2 mb-4">Samenwerken met Novastart?</h2>
            <p className="text-lead mb-6">
              Ben je een organisatie of instelling en wil je graag samenwerken met 
              Novastart? Neem contact met ons op om de mogelijkheden te bespreken.
            </p>
            <a href="/contact" className="btn-primary">
              Neem contact op
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}


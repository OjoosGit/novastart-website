import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ContentRenderer } from "@/components/ContentRenderer";
import { getContentPage } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waar we voor staan - Novastart | Grotius College",
  description: "(Her)Ontdek jouw toekomst! Novastart gelooft in de kracht van een frisse start en biedt op maat gemaakte ondersteuning voor middelbare scholieren.",
  openGraph: {
    title: "Waar we voor staan - Novastart | Grotius College",
    description: "(Her)Ontdek jouw toekomst! Novastart gelooft in de kracht van een frisse start en biedt op maat gemaakte ondersteuning voor middelbare scholieren.",
  },
};

export default async function WaarWeVoorStaanPage() {
  const data = await getContentPage("waar-we-voor-staan");

  return (
    <>
      <PageHero
        title={data?.hero?.title || "Waar we voor staan"}
        description={data?.hero?.description || "(Her)Ontdek jouw toekomst! Een initiatief van Grotius College."}
        image={data?.hero?.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"}
      />

      <Section>
        <Container>
          <div className="prose prose-lg max-w-none">
            {data?.sections ? (
              <ContentRenderer sections={data.sections} />
            ) : (
              <p>Geen content beschikbaar.</p>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}


import { PageHero } from "@/components/PageHero";
import { TeamGrid } from "@/components/TeamGrid";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ContentRenderer } from "@/components/ContentRenderer";
import { getTeamData, getContentPage } from "@/cms/queries";
import type { Metadata } from "next";

// Revalidate elke 60 seconden (ISR)
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Wie we zijn - Novastart",
  description: "Maak kennis met ons team: ervaren docenten en begeleiders die jongeren een nieuwe start geven.",
  openGraph: {
    title: "Wie we zijn - Novastart",
    description: "Maak kennis met ons team: ervaren docenten en begeleiders die jongeren een nieuwe start geven.",
  },
};

export default async function WieWeZijnPage() {
  const team = await getTeamData();
  const pageData = await getContentPage("wie-we-zijn");

  return (
    <>
      <PageHero
        title={pageData?.hero?.title || "Wie we zijn"}
        description={pageData?.hero?.description || "Maak kennis met ons gedreven team van docenten en begeleiders"}
        image={pageData?.hero?.image}
      />

      <Section>
        <Container>
          {pageData?.sections && pageData.sections.length > 0 && (
            <div className="prose prose-lg max-w-none mb-12 text-center">
              <ContentRenderer sections={pageData.sections} />
            </div>
          )}

          <TeamGrid team={team} />
        </Container>
      </Section>
    </>
  );
}


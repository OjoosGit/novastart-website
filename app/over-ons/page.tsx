import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ContentRenderer } from "@/components/ContentRenderer";
import { getContentPage } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons - Novastart | Grotius College",
  description: "Leer meer over Novastart, een initiatief van Grotius College voor middelbare scholieren die een nieuwe start zoeken.",
  openGraph: {
    title: "Over ons - Novastart | Grotius College",
    description: "Leer meer over Novastart, een initiatief van Grotius College voor middelbare scholieren die een nieuwe start zoeken.",
  },
};

export default async function OverOnsPage() {
  const data = await getContentPage("over-ons");

  return (
    <>
      <PageHero
        title={data?.hero?.title || "Over ons"}
        description={data?.hero?.description || "Een initiatief van Grotius College."}
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

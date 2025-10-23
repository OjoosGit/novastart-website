import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { ContentRenderer } from "@/components/ContentRenderer";
import { getContentPage } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kennismaken & aanmelden - Novastart",
  description: "Neem contact op voor een vrijblijvend kennismakingsgesprek. We vertellen je graag meer over Novastart.",
  openGraph: {
    title: "Kennismaken & aanmelden - Novastart",
    description: "Neem contact op voor een vrijblijvend kennismakingsgesprek.",
  },
};

export default async function KennismakenPage() {
  const data = await getContentPage("kennismaken-en-aanmelden");

  return (
    <>
      <PageHero
        title={data?.hero?.title || "Kennismaken & aanmelden"}
        description={data?.hero?.description || "Wil je meer weten of ben je geïnteresseerd in een van onze trajecten? Vul het formulier in en we nemen contact met je op."}
        image={data?.hero?.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop"}
      />

      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {data?.sections ? (
                <ContentRenderer sections={data.sections} />
              ) : (
                <p>Geen content beschikbaar.</p>
              )}
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


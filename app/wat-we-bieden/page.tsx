import { PageHero } from "@/components/PageHero";
import { ProgramGrid } from "@/components/ProgramGrid";
import { CTA } from "@/components/CTA";
import { getProgramsData, getContentPage } from "@/cms/queries";
import type { Metadata } from "next";

// Revalidate elke 60 seconden (ISR)
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Wat we bieden - Novastart | Grotius College",
  description: "Een 9-maanden traject voor middelbare scholieren die een tijd niet naar school zijn geweest. Persoonlijke begeleiding met experts en coaches.",
  openGraph: {
    title: "Wat we bieden - Novastart | Grotius College",
    description: "Een 9-maanden traject voor middelbare scholieren die een tijd niet naar school zijn geweest. Persoonlijke begeleiding met experts en coaches.",
  },
};

export default async function WatWeBiedenPage() {
  const programs = await getProgramsData();
  const pageData = await getContentPage("wat-we-bieden");

  return (
    <>
      <PageHero
        title={pageData?.hero?.title || "Wat we bieden"}
        description={pageData?.hero?.description || "Het Novastart traject: een 9-maanden programma speciaal ontworpen voor middelbare scholieren die een tijd niet naar school zijn geweest en klaar zijn om hun weg terug te vinden."}
        image={pageData?.hero?.image}
      />

      <ProgramGrid programs={programs} />

      <CTA
        title="Meer weten over onze trajecten?"
        description="Neem contact op voor een vrijblijvend kennismakingsgesprek."
        primaryText="Kennismaken"
        primaryLink="/kennismaken-en-aanmelden"
      />
    </>
  );
}


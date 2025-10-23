import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { getHomePageData } from "@/cms/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novastart - (Her)Ontdek jouw toekomst | Grotius College",
  description: "Novastart is een 9-maanden traject voor middelbare scholieren die een tijd niet naar school zijn geweest. Een initiatief van Grotius College in Heerlen.",
  openGraph: {
    title: "Novastart - (Her)Ontdek jouw toekomst | Grotius College",
    description: "Novastart is een 9-maanden traject voor middelbare scholieren die een tijd niet naar school zijn geweest. Een initiatief van Grotius College in Heerlen.",
    type: "website",
  },
};

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
      <Hero
        title={data?.hero?.title || "Novastart"}
        subtitle={data?.hero?.subtitle || "(Her)Ontdek jouw toekomst!"}
        description={data?.hero?.description || "Welkom bij Novastart, jouw nieuwe begin in het onderwijs! Een 9-maanden traject speciaal voor middelbare scholieren die een tijd niet naar school zijn geweest en nu klaar zijn om hun weg terug te vinden. Een initiatief van Grotius College."}
        ctaText={data?.hero?.ctaText || "Meer informatie"}
        ctaLink={data?.hero?.ctaLink || "/kennismaken-en-aanmelden"}
        image={data?.hero?.image}
      />
      
      <Features
        title="Wat maakt Novastart bijzonder?"
        features={data?.features || [
          {
            title: "Kleinschalig",
            description: "Maximaal 12 leerlingen per groep voor persoonlijke aandacht",
            icon: "users"
          },
          {
            title: "Persoonlijke begeleiding",
            description: "Een vaste mentor die jou door je traject helpt",
            icon: "heart"
          },
          {
            title: "Flexibel programma",
            description: "We passen ons aan jouw situatie en tempo aan",
            icon: "calendar"
          }
        ]}
      />

      <CTA
        title="Klaar voor een nieuwe start?"
        description="Neem vrijblijvend contact op of meld je direct aan voor een kennismakingsgesprek."
        primaryText="Kennismaken & aanmelden"
        primaryLink="/kennismaken-en-aanmelden"
        secondaryText="Meer informatie"
        secondaryLink="/wat-we-bieden"
      />
    </>
  );
}


import { client, isSanityConfigured } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

// Only create builder if Sanity is configured
const builder = isSanityConfigured() ? imageUrlBuilder(client) : null;

// Create a dummy builder that returns empty strings but maintains the chainable API
const createDummyBuilder = (): ImageUrlBuilder => {
  const dummyBuilder: any = {
    url: () => "",
    width: () => dummyBuilder,
    height: () => dummyBuilder,
    fit: () => dummyBuilder,
    crop: () => dummyBuilder,
    format: () => dummyBuilder,
    quality: () => dummyBuilder,
    auto: () => dummyBuilder,
  };
  return dummyBuilder as ImageUrlBuilder;
};

export function urlFor(source: any): ImageUrlBuilder {
  if (!builder) {
    console.warn("Sanity is not configured. Cannot generate image URLs.");
    return createDummyBuilder();
  }
  return builder.image(source);
}

// Home page data
export async function getHomePageData() {
  try {
    const query = `*[_type == "page" && slug.current == "home"][0]{
      title,
      hero {
        title,
        subtitle,
        description,
        "image": image.asset->url,
        ctaText,
        ctaLink
      },
      "features": content[_type == "block"]
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching home page data:", error);
    // Fallback demo data
    return {
      title: "Home",
      hero: {
        title: "Novastart",
        subtitle: "(Her)Ontdek jouw toekomst!",
        description: "Welkom bij Novastart, jouw nieuwe begin in het onderwijs! Een 9-maanden traject speciaal voor middelbare scholieren die een tijd niet naar school zijn geweest en nu klaar zijn om hun weg terug te vinden. Een initiatief van Grotius College.",
        ctaText: "Meer informatie",
        ctaLink: "/kennismaken-en-aanmelden"
      },
      features: [
        {
          title: "9-maanden traject",
          description: "Een op maat gemaakte ondersteuning en begeleiding, zodat je stap voor stap je doelen kunt bereiken.",
          icon: "calendar"
        },
        {
          title: "Ingeschreven bij Grotius",
          description: "Je staat tijdens het traject ingeschreven bij het Grotius College, zodat je geen jaar mist.",
          icon: "shield"
        },
        {
          title: "Experts en coaches",
          description: "Ga aan de slag binnen allerlei vakgebieden met experts en coaches die jou begeleiden.",
          icon: "users"
        },
        {
          title: "4 dagen per week",
          description: "Op diverse locaties werk je aan jouw ontwikkeling, met één ochtend per week reguliere vakken.",
          icon: "clock"
        },
        {
          title: "Persoonlijke begeleiding",
          description: "We praten met je over jouw obstakels en waar we die kunnen weghalen, zodat je weer motivatie krijgt.",
          icon: "heart"
        },
        {
          title: "Jouw tempo en interesses",
          description: "Werk aan vakken van school, maar ook andere onderwerpen die jou boeien, in jouw eigen tempo.",
          icon: "target"
        }
      ]
    };
  }
}

// Programs/Trajecten
export async function getProgramsData() {
  try {
    const query = `*[_type == "program"] | order(order asc){
      _id,
      title,
      slug,
      intro,
      doelgroep,
      voordelen,
      activiteiten,
      duur,
      image,
      description
    }`;
    const programs = await client.fetch(query);
    return programs || [];
  } catch (error) {
    console.error("Error fetching programs:", error);
    // Fallback demo data
    return [
      {
        _id: "1",
        title: "Novastart Traject",
        slug: { current: "novastart-traject" },
        intro: "Een 9-maanden traject speciaal ontworpen voor middelbare scholieren die een tijd niet naar school zijn geweest en nu klaar zijn om hun weg terug te vinden.",
        doelgroep: "Middelbare scholieren die een tijd niet naar school zijn geweest",
        duur: "9 maanden",
        description: "Bij Novastart geloven we in de kracht van een frisse start en de mogelijkheid om opnieuw koers te zetten naar een succesvolle toekomst. Gedurende 9 maanden bieden wij een op maat gemaakte ondersteuning en begeleiding, zodat je stap voor stap je doelen kunt bereiken en weer met vertrouwen het schoolleven kunt hervatten.",
        voordelen: [
          "Je staat ingeschreven bij het Grotius College, dus je mist geen jaar",
          "Samenwerking met experts en coaches binnen diverse vakgebieden",
          "Persoonlijke begeleiding om je obstakels weg te nemen",
          "Langzaam inzicht krijgen in wat je wilt, wat je kan en wat je wilt kunnen",
          "Motivatie door het stellen van persoonlijke doelen",
          "We kijken samen naar jouw vervolgstappen en uitstroom"
        ],
        activiteiten: [
          "4 dagen per week op diverse locaties actief bezig",
          "Één ochtend per week reguliere vakken volgen",
          "Werken aan schoolvakken in overleg",
          "Ook bezig met onderwerpen die jou persoonlijk boeien",
          "Samen werken, binnen en buiten",
          "Krijgen van feedback en feedforward van experts"
        ]
      }
    ];
  }
}

// Single program
export async function getProgramBySlug(slug: string) {
  try {
    const query = `*[_type == "program" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      intro,
      doelgroep,
      description,
      voordelen,
      activiteiten,
      duur,
      image
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching program:", error);
    // Try to find in fallback data
    const programs = await getProgramsData();
    return programs.find((p: any) => p.slug.current === slug) || null;
  }
}

// Team members
export async function getTeamData() {
  try {
    const query = `*[_type == "person"] | order(order asc){
      _id,
      name,
      role,
      bio,
      photo,
      email,
      phone
    }`;
    const team = await client.fetch(query);
    return team || [];
  } catch (error) {
    console.error("Error fetching team:", error);
    // Fallback demo data
    return [
      {
        _id: "1",
        name: "Nathalie Colangeli-Kuckelkorn",
        role: "Ondersteuningscoördinator",
        bio: "Nathalie is de ondersteuningscoördinator van Novastart en werkt voor Grotius, Vrijeschool Parkstad & Compass. Ze staat centraal in de begeleiding van jongeren en helpt hen hun weg terug te vinden in het onderwijs.",
        email: "n.colangeli@stichtinglvo.nl",
        phone: "06 46444455"
      },
      {
        _id: "2",
        name: "Patrick Wolters",
        role: "Projectleider",
        bio: "Patrick is de projectleider van Novastart en zorgt voor de coördinatie en organisatie van het traject. Hij werkt nauw samen met experts, coaches en jongeren om het beste uit iedereen te halen.",
        email: "p.wolters@stichtinglvo.nl"
      }
    ];
  }
}

// FAQ
export async function getFAQData(category?: string) {
  try {
    const filter = category ? `&& category == "${category}"` : "";
    const query = `*[_type == "faq" ${filter}] | order(order asc){
      _id,
      question,
      answer,
      category
    }`;
    const faqs = await client.fetch(query);
    return faqs || [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    // Fallback demo data
    const allFaqs = [
      {
        _id: "1",
        question: "Voor wie is Novastart bedoeld?",
        answer: "Novastart is bedoeld voor middelbare scholieren die een tijd niet naar school zijn geweest en nu klaar zijn om hun weg terug te vinden. Het traject helpt jongeren om stap voor stap hun doelen te bereiken en weer met vertrouwen het schoolleven te hervatten.",
        category: "algemeen"
      },
      {
        _id: "2",
        question: "Hoe lang duurt het Novastart traject?",
        answer: "Het Novastart traject duurt 9 maanden. Gedurende deze periode krijg je op maat gemaakte ondersteuning en begeleiding, zodat je stap voor stap je doelen kunt bereiken.",
        category: "algemeen"
      },
      {
        _id: "3",
        question: "Moet ik me inschrijven bij een school?",
        answer: "Op het moment dat je je inschrijft voor dit traject sta je ook ingeschreven bij het Grotius College. Zo zorgen we ervoor dat je geen jaar gaat missen.",
        category: "ouders"
      },
      {
        _id: "4",
        question: "Hoeveel dagen per week ben ik bezig met het traject?",
        answer: "Je bent vier dagen in de week op diverse locaties bezig met het traject. Een ochtend volg je in overleg een aantal vakken. Zo zorgen we ervoor dat je geen jaar gaat missen en blijf je ook werken aan je schoolvakken.",
        category: "algemeen"
      },
      {
        _id: "5",
        question: "Wat ga ik doen tijdens het traject?",
        answer: "Je gaat met experts en coaches aan de slag binnen allerlei vakgebieden op de vakken van school, maar ook andere onderwerpen die jou boeien. Je krijgt feedback en feedforward. Je werkt samen, binnen en buiten. Daarnaast blijven we met je praten over jouw obstakels en waar we die kunnen weghalen.",
        category: "algemeen"
      },
      {
        _id: "6",
        question: "Wat gebeurt er na het traject?",
        answer: "We kijken in het traject wat je vervolgstappen zouden kunnen worden en wat uiteindelijk de uitstroom gaat zijn. Dit doen we samen met jou, zodat je goed voorbereid bent op de volgende stap.",
        category: "algemeen"
      },
      {
        _id: "7",
        question: "Hoe kan ik contact opnemen voor meer informatie?",
        answer: "Je kunt contact opnemen met Nathalie Colangeli-Kuckelkorn (Ondersteuningscoördinator) via 06 46444455 of n.colangeli@stichtinglvo.nl, of met Patrick Wolters (Projectleider) via p.wolters@stichtinglvo.nl. Je kunt ook bellen naar het Grotius College: 045 571 39 52.",
        category: "ouders"
      },
      {
        _id: "8",
        question: "Waar is Novastart gevestigd?",
        answer: "Novastart is een initiatief van Grotius College, dat is gevestigd aan de Akerstraat 117 in Heerlen (6417 BM). Je bent tijdens het traject op diverse locaties actief.",
        category: "algemeen"
      }
    ];
    
    if (category) {
      return allFaqs.filter(faq => faq.category === category);
    }
    return allFaqs;
  }
}

// Partners
export async function getPartnersData() {
  try {
    const query = `*[_type == "partner"] | order(order asc){
      _id,
      name,
      logo,
      url,
      description
    }`;
    const partners = await client.fetch(query);
    return partners || [];
  } catch (error) {
    console.error("Error fetching partners:", error);
    // Fallback demo data
    return [
      {
        _id: "1",
        name: "Grotius College",
        description: "Het Grotius College is de thuisbasis van Novastart en biedt vmbo-tl, havo en vwo onderwijs in Heerlen.",
        url: "https://www.grotius-lvo.nl"
      },
      {
        _id: "2",
        name: "Stichting LVO",
        description: "Stichting Limburgs Voortgezet Onderwijs is de koepelorganisatie van meerdere scholen in Limburg, waaronder Grotius College.",
        url: "https://www.stichtinglvo.nl"
      },
      {
        _id: "3",
        name: "Gemeente Heerlen",
        description: "Ondersteuning en samenwerking bij onderwijsprojecten voor jongeren in de regio Heerlen.",
        url: "https://www.heerlen.nl"
      },
      {
        _id: "4",
        name: "Jeugdzorg Limburg",
        description: "Zorg en ondersteuning voor jongeren en gezinnen",
        url: "#"
      },
      {
        _id: "4",
        name: "ROC Leeuwenborgh",
        description: "Doorstroom naar MBO-opleidingen en praktijkonderwijs",
        url: "https://www.rocleeuwenborgh.nl"
      },
      {
        _id: "5",
        name: "Bedrijven in de regio",
        description: "Stageplekken en werkervaring voor onze leerlingen",
        url: "#"
      }
    ];
  }
}

// Quality documents
export async function getQualityDocsData() {
  try {
    const query = `*[_type == "qualityDoc"] | order(order asc){
      _id,
      title,
      summary,
      "fileUrl": file.asset->url,
      url
    }`;
    const docs = await client.fetch(query);
    return docs || [];
  } catch (error) {
    console.error("Error fetching quality docs:", error);
    // Fallback demo data
    return [
      {
        _id: "1",
        title: "Gedragscode",
        summary: "Onze gedragscode voor leerlingen en medewerkers",
        url: "#"
      },
      {
        _id: "2",
        title: "Veiligheidsprotocol",
        summary: "Procedures voor een veilige leer- en werkomgeving",
        url: "#"
      },
      {
        _id: "3",
        title: "Privacyverklaring",
        summary: "Hoe we omgaan met persoonsgegevens (AVG-proof)",
        url: "/privacy"
      }
    ];
  }
}

// Single page
export async function getPageData(slug: string) {
  try {
    const query = `*[_type == "page" && slug.current == $slug][0]{
      title,
      hero {
        title,
        subtitle,
        description,
        "image": image.asset->url,
        ctaText,
        ctaLink
      },
      content,
      seo
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

// Site settings
export async function getSiteSettings() {
  try {
    const query = `*[_type == "siteSettings"][0]{
      siteTitle,
      description,
      logo,
      "grotiusLogo": {
        "url": grotiusLogo.asset->url,
        "alt": grotiusLogo.alt
      },
      headerNavigation,
      headerCTA,
      footerDescription,
      footerLinks,
      copyrightText,
      contactInfo,
      socialLinks,
      defaultSEO
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

// Content page (voor 'Waar we voor staan', 'Kennismaken', etc.)
export async function getContentPage(slug: string) {
  try {
    const query = `*[_type == "contentPage" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      hero {
        title,
        description,
        "image": image.asset->url
      },
      sections,
      seo
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching content page:", error);
    return null;
  }
}

// Contact info
export async function getContactInfo() {
  try {
    const query = `*[_type == "contactInfo"][0]{
      organization,
      address,
      phone,
      email,
      openingHours,
      mapUrl,
      publicTransport,
      carParking
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}

// Legal page (voor Privacy, Cookies, etc.)
export async function getLegalPage(slug: string) {
  try {
    const query = `*[_type == "legalPage" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      intro,
      sections,
      lastUpdated,
      seo
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return null;
  }
}


/**
 * Sanity Seed Script
 * 
 * Dit script vult Sanity met demo content voor Novastart.
 * 
 * Om dit script uit te voeren:
 * 1. Zorg dat je SANITY_API_WRITE_TOKEN in .env.local hebt staan
 * 2. Run: npx tsx cms/seed.ts
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log("🌱 Starting Sanity seeding...");

  try {
    // 1. Home page
    const homePage = await client.create({
      _type: "page",
      title: "Home",
      slug: { current: "home", _type: "slug" },
      hero: {
        title: "Novastart",
        subtitle: "(Her)Ontdek jouw toekomst!",
        description:
          "Welkom bij Novastart, jouw nieuwe begin in het onderwijs! Een 9-maanden traject speciaal voor middelbare scholieren die een tijd niet naar school zijn geweest en nu klaar zijn om hun weg terug te vinden. Een initiatief van Grotius College.",
        ctaText: "Meer informatie",
        ctaLink: "/kennismaken-en-aanmelden",
      },
    });
    console.log("✅ Home page created");

    // 2. Programs/Trajecten
    const programs = [
      {
        _type: "program",
        title: "Basistraject",
        slug: { current: "basistraject", _type: "slug" },
        intro:
          "Een flexibel traject voor jongeren die opnieuw willen starten met leren.",
        doelgroep: "Voor jongeren van 12-18 jaar",
        duur: "6-12 maanden",
        voordelen: [
          "Kleinschalige groepen (max. 12 leerlingen)",
          "Persoonlijke mentor",
          "Flexibel programma",
          "Praktische vaardigheden",
        ],
        activiteiten: [
          "Basisvakken (Nederlands, rekenen)",
          "Sociale vaardigheden",
          "Praktische werkzaamheden",
          "Stage en arbeidsoriëntatie",
        ],
        order: 1,
      },
      {
        _type: "program",
        title: "Doorstroomtraject",
        slug: { current: "doorstroomtraject", _type: "slug" },
        intro:
          "Gericht op doorstroom naar vervolgonderwijs of werk na een basistraject.",
        doelgroep: "Voor jongeren van 14-18 jaar",
        duur: "6-9 maanden",
        voordelen: [
          "Voorbereiding op vervolgonderwijs of werk",
          "Intensieve stagebegeleiding",
          "Samenwerking met ROC's en bedrijven",
          "Diploma-ondersteuning",
        ],
        activiteiten: [
          "Praktijkstages",
          "Examentraining",
          "Sollicitatietraining",
          "Netwerkbijeenkomsten",
        ],
        order: 2,
      },
      {
        _type: "program",
        title: "Dagbesteding",
        slug: { current: "dagbesteding", _type: "slug" },
        intro:
          "Voor jongeren die structuur en dagelijkse activiteiten nodig hebben.",
        doelgroep: "Voor jongeren van 12-23 jaar",
        duur: "Op maat (3-12 maanden)",
        voordelen: [
          "Structuur en regelmaat",
          "Praktische activiteiten",
          "Sociale contacten",
          "Zorg en begeleiding op maat",
        ],
        activiteiten: [
          "Creatieve activiteiten",
          "Sport en bewegen",
          "Klusjes en praktische taken",
          "Groepsactiviteiten",
        ],
        order: 3,
      },
    ];

    for (const program of programs) {
      await client.create(program);
    }
    console.log("✅ Programs created");

    // 3. Team members
    const team = [
      {
        _type: "person",
        name: "Maria van den Berg",
        role: "Directeur & Locatiemanager",
        bio: "Maria heeft 15 jaar ervaring in het speciaal onderwijs en is gedreven om jongeren een nieuwe kans te geven. Ze gelooft sterk in kleinschalig en persoonlijk onderwijs.",
        order: 1,
      },
      {
        _type: "person",
        name: "Johan Pieters",
        role: "Docent & Mentor",
        bio: "Johan is docent Nederlands en rekenen en begeleidt jongeren in hun leerproces. Hij heeft een praktische aanpak en maakt leren leuk en toegankelijk.",
        order: 2,
      },
      {
        _type: "person",
        name: "Sarah Jansen",
        role: "Zorgcoördinator",
        bio: "Sarah zorgt voor de coördinatie van zorg en begeleiding. Ze werkt nauw samen met externe partners om jongeren optimaal te ondersteunen.",
        order: 3,
      },
      {
        _type: "person",
        name: "Kevin Hermans",
        role: "Praktijkbegeleider",
        bio: "Kevin begeleidt jongeren tijdens stages en praktijkactiviteiten. Hij heeft een breed netwerk in de regio en helpt jongeren aan waardevolle werkervaring.",
        order: 4,
      },
    ];

    for (const member of team) {
      await client.create(member);
    }
    console.log("✅ Team members created");

    // 4. FAQs
    const faqs = [
      {
        _type: "faq",
        question: "Voor wie is Novastart bedoeld?",
        answer:
          "Novastart is bedoeld voor jongeren tussen 12 en 23 jaar die zijn vastgelopen in het reguliere onderwijs. Dit kunnen jongeren zijn met leerproblemen, gedragsproblemen, thuissituaties die leren bemoeilijken, of gewoon jongeren die een andere aanpak nodig hebben.",
        category: "algemeen",
        order: 1,
      },
      {
        _type: "faq",
        question: "Wat zijn de kosten?",
        answer:
          "Novastart wordt gefinancierd door de gemeente. Voor ouders en jongeren zijn er in principe geen kosten. Wel kunnen er kleine bijdragen gevraagd worden voor specifieke activiteiten zoals excursies.",
        category: "ouders",
        order: 2,
      },
      {
        _type: "faq",
        question: "Hoe meld ik mijn kind aan?",
        answer:
          "Aanmelden kan via ons contactformulier of door direct te bellen naar 045 - 123 4567. We plannen dan een kennismakingsgesprek waarin we kijken of Novastart past bij jouw kind. Bij aanmelding hebben we een verwijzing nodig van school of jeugdzorg.",
        category: "ouders",
        order: 3,
      },
      {
        _type: "faq",
        question: "Hoeveel leerlingen zitten er in een groep?",
        answer:
          "We werken met kleine groepen van maximaal 12 leerlingen. Dit zorgt voor persoonlijke aandacht en een veilige leeromgeving.",
        category: "ouders",
        order: 4,
      },
      {
        _type: "faq",
        question: "Kunnen jongeren een diploma halen?",
        answer:
          "Bij Novastart werken we toe naar een passend vervolgtraject. Afhankelijk van de mogelijkheden van de jongere kan dit een diploma zijn (zoals entreeopleiding of MBO-diploma), maar ook een certificaat voor gevolgde modules. We kijken altijd wat haalbaar en passend is.",
        category: "algemeen",
        order: 5,
      },
      {
        _type: "faq",
        question: "Wat zijn de openingstijden?",
        answer:
          "Novastart is open van maandag t/m vrijdag van 08:30 tot 16:30 uur. We werken met flexibele roosters die aansluiten bij de mogelijkheden van de jongere.",
        category: "ouders",
        order: 6,
      },
      {
        _type: "faq",
        question: "Is er vervoer geregeld?",
        answer:
          "Vervoer valt onder verantwoordelijkheid van ouders/verzorgers. In sommige gevallen kan er een vervoersvergoeding aangevraagd worden bij de gemeente. We helpen graag met de aanvraag.",
        category: "ouders",
        order: 7,
      },
      {
        _type: "faq",
        question: "Hoe lang duurt een traject?",
        answer:
          "De duur van een traject varieert van 3 tot 12 maanden, afhankelijk van de doelen en ontwikkeling van de jongere. We evalueren regelmatig en passen het traject aan indien nodig.",
        category: "algemeen",
        order: 8,
      },
    ];

    for (const faq of faqs) {
      await client.create(faq);
    }
    console.log("✅ FAQs created");

    // 5. Partners
    const partners = [
      {
        _type: "partner",
        name: "Gemeente Heerlen",
        description: "Financiering en aansturing",
        order: 1,
      },
      {
        _type: "partner",
        name: "Leerplicht Parkstad",
        description: "Samenwerking bij schoolverzuim",
        order: 2,
      },
      {
        _type: "partner",
        name: "Jeugdzorg Limburg",
        description: "Zorg en ondersteuning",
        order: 3,
      },
      {
        _type: "partner",
        name: "ROC Leeuwenborgh",
        description: "Doorstroom naar MBO",
        order: 4,
      },
      {
        _type: "partner",
        name: "Bedrijven in de regio",
        description: "Stageplekken en werkervaring",
        order: 5,
      },
    ];

    for (const partner of partners) {
      await client.create(partner);
    }
    console.log("✅ Partners created");

    // 6. Quality documents
    const qualityDocs = [
      {
        _type: "qualityDoc",
        title: "Gedragscode",
        summary: "Onze gedragscode voor leerlingen en medewerkers",
        order: 1,
      },
      {
        _type: "qualityDoc",
        title: "Veiligheidsprotocol",
        summary: "Procedures voor een veilige leer- en werkomgeving",
        order: 2,
      },
      {
        _type: "qualityDoc",
        title: "Privacyverklaring",
        summary: "Hoe we omgaan met persoonsgegevens (AVG)",
        order: 3,
      },
    ];

    for (const doc of qualityDocs) {
      await client.create(doc);
    }
    console.log("✅ Quality documents created");

    // 7. Site settings
    await client.create({
      _type: "siteSettings",
      siteTitle: "Novastart",
      description:
        "Novastart biedt onderwijstrajecten voor jongeren die zijn vastgelopen in het reguliere onderwijs. Persoonlijke begeleiding in een kleinschalige setting.",
      contactInfo: {
        phone: "045 - 123 4567",
        email: "info@novastart.nl",
        address: "Voorbeeldstraat 123\n6411 AB Heerlen",
      },
      defaultSEO: {
        metaTitle: "Novastart - Onderwijs voor jongeren in Heerlen",
        metaDescription:
          "Novastart biedt onderwijstrajecten voor jongeren die zijn vastgelopen in het reguliere onderwijs. Persoonlijke begeleiding in een kleinschalige setting.",
      },
    });
    console.log("✅ Site settings created");

    // 8. Content pages
    
    // Waar we voor staan
    await client.create({
      _type: "contentPage",
      title: "Waar we voor staan",
      slug: { current: "waar-we-voor-staan", _type: "slug" },
      hero: {
        title: "Waar we voor staan",
        description: "(Her)Ontdek jouw toekomst! Een initiatief van Grotius College.",
      },
      sections: [
        {
          _type: "textSection",
          heading: "Onze visie",
          content: "Bij Novastart geloven we in de kracht van een frisse start en de mogelijkheid om opnieuw koers te zetten naar een succesvolle toekomst. Dit programma is speciaal ontworpen voor middelbare scholieren die een tijd niet naar school zijn geweest en nu klaar zijn om hun weg terug te vinden.\n\nGedurende 9 maanden bieden wij een op maat gemaakte ondersteuning en begeleiding, zodat je stap voor stap je doelen kunt bereiken en weer met vertrouwen het schoolleven kunt hervatten.",
          lead: true,
        },
        {
          _type: "gridSection",
          heading: "Praktijk: Hoe werkt het?",
          items: [
            {
              title: "Ingeschreven bij Grotius",
              content: "Op het moment dat je je inschrijft voor dit traject sta je ook ingeschreven bij het Grotius College. Zo zorgen we er voor dat je geen jaar gaat missen.",
            },
            {
              title: "Experts en coaches",
              content: "Je gaat met experts en coaches aan de slag binnen allerlei vakgebieden op de vakken van school, maar ook andere onderwerpen die jou boeien.",
            },
            {
              title: "4 dagen per week actief",
              content: "Vier dagen in de week ben je op diverse locaties bezig. Een ochtend volg je in overleg een aantal vakken om te zorgen dat je geen schoolstof mist.",
            },
            {
              title: "Persoonlijke begeleiding",
              content: "We blijven met je praten over jouw obstakels en waar we die kunnen weghalen. Zo krijg je langzaam inzicht in wat je wilt, wat je kan en krijg je weer motivatie.",
            },
          ],
        },
        {
          _type: "textSection",
          heading: "Afronding en uitstroom",
          content: "We kijken in het traject wat je vervolgstappen zouden kunnen worden en wat uiteindelijk de uitstroom gaat zijn. Dit doen we samen met jou, zodat je goed voorbereid bent op de volgende stap in jouw toekomst.",
          lead: false,
        },
      ],
      seo: {
        metaTitle: "Waar we voor staan - Novastart | Grotius College",
        metaDescription: "(Her)Ontdek jouw toekomst! Novastart gelooft in de kracht van een frisse start en biedt op maat gemaakte ondersteuning voor middelbare scholieren.",
      },
    });

    // Kennismaken en aanmelden
    await client.create({
      _type: "contentPage",
      title: "Kennismaken & aanmelden",
      slug: { current: "kennismaken-en-aanmelden", _type: "slug" },
      hero: {
        title: "Kennismaken & aanmelden",
        description: "Wil je meer weten of ben je geïnteresseerd in een van onze trajecten? Vul het formulier in en we nemen contact met je op.",
      },
      sections: [
        {
          _type: "processSteps",
          heading: "Hoe werkt het?",
          steps: [
            {
              title: "Contact opnemen",
              description: "Vul het formulier in of bel ons direct. We nemen binnen 2 werkdagen contact met je op.",
            },
            {
              title: "Kennismakingsgesprek",
              description: "We plannen een vrijblijvend gesprek waarin we jouw situatie en wensen bespreken.",
            },
            {
              title: "Kennismaking op locatie",
              description: "Je komt langs bij Novastart om de school en het team te leren kennen.",
            },
            {
              title: "Start traject",
              description: "Als het klikt starten we met het traject dat bij jou past.",
            },
          ],
        },
        {
          _type: "contactPersons",
          heading: "Liever direct bellen?",
          intro: "Dat kan ook! Neem contact op met:",
          persons: [
            {
              name: "Nathalie Colangeli-Kuckelkorn",
              role: "Ondersteuningscoördinator",
              phone: "06 46444455",
              email: "",
            },
            {
              name: "Patrick Wolters",
              role: "Projectleider",
              phone: "",
              email: "p.wolters@stichtinglvo.nl",
            },
            {
              name: "Grotius College",
              role: "",
              phone: "045 - 571 39 52",
              email: "",
            },
          ],
        },
      ],
      seo: {
        metaTitle: "Kennismaken & aanmelden - Novastart",
        metaDescription: "Neem contact op voor een vrijblijvend kennismakingsgesprek. We vertellen je graag meer over Novastart.",
      },
    });

    // Wat we bieden
    await client.create({
      _type: "contentPage",
      title: "Wat we bieden",
      slug: { current: "wat-we-bieden", _type: "slug" },
      hero: {
        title: "Wat we bieden",
        description: "Het Novastart traject: een 9-maanden programma speciaal ontworpen voor middelbare scholieren die een tijd niet naar school zijn geweest en klaar zijn om hun weg terug te vinden.",
      },
      sections: [],
      seo: {
        metaTitle: "Wat we bieden - Novastart | Grotius College",
        metaDescription: "Een 9-maanden traject voor middelbare scholieren die een tijd niet naar school zijn geweest. Persoonlijke begeleiding met experts en coaches.",
      },
    });

    // Wie we zijn
    await client.create({
      _type: "contentPage",
      title: "Wie we zijn",
      slug: { current: "wie-we-zijn", _type: "slug" },
      hero: {
        title: "Wie we zijn",
        description: "Maak kennis met ons gedreven team van docenten en begeleiders",
      },
      sections: [
        {
          _type: "textSection",
          heading: "",
          content: "Ons team bestaat uit ervaren en betrokken professionals die geloven in de kracht van kleinschalig onderwijs. We hebben allemaal gekozen voor Novastart omdat we het verschil willen maken voor jongeren die een andere aanpak nodig hebben.",
          lead: true,
        },
      ],
      seo: {
        metaTitle: "Wie we zijn - Novastart",
        metaDescription: "Maak kennis met ons team: ervaren docenten en begeleiders die jongeren een nieuwe start geven.",
      },
    });

    console.log("✅ Content pages created");

    // 9. Contact info
    await client.create({
      _type: "contactInfo",
      title: "Contact Informatie",
      organization: "Grotius College",
      address: {
        street: "Akerstraat 117",
        postalCode: "6417 BM",
        city: "Heerlen",
      },
      phone: "045 - 571 39 52",
      email: "info@grotius-lvo.nl",
      openingHours: "Maandag t/m vrijdag\n08:30 - 16:30 uur",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2510.7947147567847!2d5.971839!3d50.881947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUyJzU1LjAiTiA1wrA1OCcxOC42IkU!5e0!3m2!1snl!2snl!4v1234567890",
      publicTransport: "Vanaf station Heerlen is het 10 minuten lopen. Vanuit het station loop je richting het centrum en neem je de eerste afslag rechts.",
      carParking: "Er is parkeergelegenheid in de straat en in de omliggende wijk. Parkeren is gratis.",
    });
    console.log("✅ Contact info created");

    // 10. Legal pages
    await client.create({
      _type: "legalPage",
      title: "Privacy",
      slug: { current: "privacy", _type: "slug" },
      intro: "Novastart vindt een zorgvuldige omgang met persoonsgegevens van groot belang. Deze privacyverklaring geeft informatie over hoe wij omgaan met persoonsgegevens.",
      sections: [
        {
          heading: "1. Wie zijn wij?",
          content: "Novastart is een onderwijsinstelling in Heerlen. Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.\n\nNovastart\nAkerstraat 117\n6417 BM Heerlen\nE-mail: info@grotius-lvo.nl\nTelefoon: 045 - 571 39 52",
          list: [],
        },
        {
          heading: "2. Welke gegevens verzamelen wij?",
          content: "Novastart verwerkt persoonsgegevens doordat je gebruik maakt van onze diensten en/of omdat je deze gegevens zelf aan ons verstrekt. We kunnen de volgende gegevens van je verwerken:",
          list: [
            "Voor- en achternaam",
            "Adresgegevens",
            "Telefoonnummer",
            "E-mailadres",
            "Geboortedatum",
            "Onderwijsgegevens (cijfers, rapporten, etc.)",
            "Gegevens over gezondheid (indien relevant voor begeleiding)",
          ],
        },
        {
          heading: "3. Waarom hebben wij deze gegevens nodig?",
          content: "Novastart verwerkt jouw persoonsgegevens voor de volgende doelen:",
          list: [
            "Het verzorgen van onderwijs en begeleiding",
            "Contact met ouders/verzorgers en leerlingen",
            "Het voldoen aan wettelijke verplichtingen",
            "Administratieve en financiële doeleinden",
            "Veiligheid en welzijn van leerlingen",
          ],
        },
        {
          heading: "4. Hoe lang bewaren wij gegevens?",
          content: "Novastart bewaart persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor deze zijn verstrekt dan wel op grond van de wet is vereist. We hanteren de volgende bewaartermijnen:",
          list: [
            "Leerlingdossiers: minimaal 5 jaar na uitschrijving",
            "Financiële administratie: 7 jaar",
            "Contactformulieren: 1 jaar",
          ],
        },
        {
          heading: "5. Delen wij gegevens met derden?",
          content: "Novastart verstrekt alleen aan derden persoonsgegevens als dit noodzakelijk is voor de uitvoering van onderwijs en begeleiding of om te voldoen aan een wettelijke verplichting. Voorbeelden zijn:",
          list: [
            "Samenwerkingspartners in het onderwijs",
            "Gemeente (voor bekostiging)",
            "Inspectie van het Onderwijs",
            "Zorgverleners (met toestemming)",
          ],
        },
        {
          heading: "6. Jouw rechten",
          content: "Je hebt het recht om:",
          list: [
            "Je persoonsgegevens in te zien",
            "Onjuiste gegevens te laten corrigeren",
            "Gegevens te laten verwijderen",
            "Bezwaar te maken tegen verwerking",
            "Gegevens over te dragen (dataportabiliteit)",
          ],
        },
        {
          heading: "7. Beveiliging",
          content: "Novastart neemt de bescherming van jouw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang en ongewenste openbaarmaking te voorkomen.",
          list: [],
        },
        {
          heading: "8. Klachten",
          content: "Als je een klacht hebt over de verwerking van jouw persoonsgegevens, dan vragen we je hierover direct contact met ons op te nemen. Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.",
          list: [],
        },
      ],
      lastUpdated: "2025-10-19",
      seo: {
        metaTitle: "Privacy - Novastart",
        metaDescription: "Privacyverklaring van Novastart: hoe we omgaan met uw persoonsgegevens.",
        noIndex: true,
      },
    });

    await client.create({
      _type: "legalPage",
      title: "Cookies",
      slug: { current: "cookies", _type: "slug" },
      intro: "Deze website maakt gebruik van cookies. Cookies zijn kleine tekstbestanden die op jouw computer of mobiel apparaat worden geplaatst wanneer je onze website bezoekt.",
      sections: [
        {
          heading: "1. Wat zijn cookies?",
          content: "Cookies zijn kleine tekstbestanden die websites op je apparaat plaatsen. Ze helpen websites om beter te werken en bieden informatie aan de eigenaren van de website.",
          list: [],
        },
        {
          heading: "2. Welke cookies gebruiken wij?",
          content: "Wij gebruiken alleen functionele cookies die noodzakelijk zijn voor het goed functioneren van de website. Deze cookies:",
          list: [
            "Onthouden je voorkeuren",
            "Maken de website veiliger",
            "Zorgen voor een goede gebruikerservaring",
            "Verzamelen GEEN persoonlijke gegevens",
            "Worden NIET gebruikt voor tracking",
          ],
        },
        {
          heading: "3. Cookies beheren",
          content: "Je kunt cookies beheren via je browserinstellingen. Houd er rekening mee dat het uitschakelen van cookies kan leiden tot verminderde functionaliteit van onze website.",
          list: [],
        },
        {
          heading: "4. Contact",
          content: "Voor vragen over ons cookiebeleid kun je contact met ons opnemen via info@grotius-lvo.nl of 045 - 571 39 52.",
          list: [],
        },
      ],
      lastUpdated: "2025-10-19",
      seo: {
        metaTitle: "Cookies - Novastart",
        metaDescription: "Informatie over het gebruik van cookies op de Novastart website.",
        noIndex: true,
      },
    });

    console.log("✅ Legal pages created");

    console.log("\n🎉 Seeding completed successfully!");
    console.log(
      "\nJe kunt nu naar je Sanity Studio gaan om de content te bekijken en aan te passen."
    );
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
}

seed();


# Content Handleiding - Novastart Website

Deze handleiding is bedoeld voor redacteuren die content beheren via Sanity CMS.

## Inloggen op Sanity Studio

**Lokaal**: `npm run sanity:dev` → [http://localhost:3333](http://localhost:3333)  
**Online**: `https://novastart.sanity.studio` (of je eigen Studio URL)

Log in met je Sanity account.

---

## Content Types Uitgelegd

### 1. Site Settings (Website Instellingen)

**Wat is het?** Globale instellingen die overal op de website worden gebruikt.

**Wat kun je aanpassen?**
- Website titel
- Logo
- Contactgegevens (telefoon, e-mail, adres)
- Social media links
- Standaard SEO instellingen

**Let op:** Dit is een "singleton" - er is er maar één van. Wijzigingen gelden voor de hele website.

---

### 2. Pages (Pagina's)

**Wat is het?** Algemene pagina's met flexibele content.

**Velden:**
- **Titel**: De hoofdtitel van de pagina
- **Slug**: De URL (bijv. "over-ons" wordt "/over-ons")
- **Hero Sectie**: De grote banner bovenaan
  - Titel, subtitel, beschrijving
  - Afbeelding
  - CTA (Call-to-action) knop
- **Content**: Rich text editor voor de inhoud
- **SEO**: Meta titel en beschrijving voor zoekmachines

**Tips:**
- Gebruik korte, beschrijvende slugs
- Voeg altijd alt-tekst toe aan afbeeldingen
- Houd meta descriptions tussen 140-160 karakters

---

### 3. Programs (Trajecten)

**Wat is het?** Onderwijstrajecten die Novastart aanbiedt.

**Velden:**
- **Titel**: Naam van het traject
- **Slug**: URL (wordt automatisch gegenereerd)
- **Introductie**: Korte samenvatting (1-2 zinnen)
- **Doelgroep**: Voor wie is dit traject?
- **Uitgebreide beschrijving**: Volledige uitleg
- **Voordelen**: Lijst met bulletpoints
- **Activiteiten**: Wat doen leerlingen?
- **Duur**: Hoe lang duurt het traject?
- **Afbeelding**: Hoofdafbeelding (altijd alt-tekst toevoegen!)
- **Volgorde**: Bepaalt de volgorde op de website

**Tips:**
- Gebruik korte, pakkende titels
- Maak de introductie aantrekkelijk - dit is wat mensen eerst zien
- Voeg een representatieve afbeelding toe (liefst met jongeren in actie)
- Volgorde: 1, 2, 3, etc. (lagere nummers komen eerst)

---

### 4. Person (Teamlid)

**Wat is het?** Profielen van medewerkers.

**Velden:**
- **Naam**: Volledige naam
- **Functie**: Rol binnen Novastart
- **Biografie**: Korte tekst over de persoon (max. 100 woorden)
- **Foto**: Professionele foto (bij voorkeur vierkant, min. 400x400px)
- **E-mail**: Optioneel, wordt als contactoptie getoond
- **Volgorde**: Bepaalt volgorde op de teamapagina

**Tips:**
- Gebruik professionele maar toegankelijke foto's
- Biografie in de 3e persoon ("Maria heeft..." niet "Ik heb...")
- Maximaal 3-4 zinnen voor de bio
- Volgorde: directie eerst, dan docenten, dan overig personeel

---

### 5. FAQ (Veelgestelde Vragen)

**Wat is het?** Vragen en antwoorden voor bezoekers.

**Velden:**
- **Vraag**: De vraag (kort en duidelijk)
- **Antwoord**: Het antwoord (mag langer zijn)
- **Categorie**: "Ouders" of "Algemeen"
- **Volgorde**: Bepaalt volgorde in de lijst

**Tips:**
- Schrijf vragen zoals mensen ze stellen
- Antwoorden: begin met "Ja" of "Nee" als het past, dan uitleg
- Categorie "Ouders" wordt getoond op de "Voor ouders" pagina
- Plaats belangrijkste vragen bovenaan (lage volgorde-nummers)

---

### 6. Partner (Samenwerkingspartner)

**Wat is het?** Organisaties waarmee Novastart samenwerkt.

**Velden:**
- **Naam**: Naam van de organisatie
- **Logo**: Logo van de partner (bij voorkeur transparante PNG)
- **Website URL**: Link naar hun website (optioneel)
- **Beschrijving**: Korte uitleg over de samenwerking
- **Volgorde**: Bepaalt volgorde op de pagina

**Tips:**
- Logo's: vierkant of rechthoek, min. 200px breed
- Beschrijving: max. 2 zinnen
- Belangrijkste partners eerst (lagere volgorde-nummers)

---

### 7. Quality Doc (Kwaliteitsdocument)

**Wat is het?** Documenten over kwaliteit, protocollen, veiligheid.

**Velden:**
- **Titel**: Naam van het document
- **Samenvatting**: Korte uitleg (1-2 zinnen)
- **Bestand**: Upload PDF/DOC (optioneel)
- **Externe URL**: Of link naar extern document (optioneel)
- **Volgorde**: Bepaalt volgorde in lijst

**Tips:**
- Gebruik één van beide: bestand OF externe URL
- Bestanden: alleen PDF's (max. 5MB)
- Duidelijke, herkenbare titels

---

## Best Practices voor Content

### Schrijfstijl

✅ **Wel:**
- Warm en persoonlijk
- Duidelijke, korte zinnen
- Actieve vorm ("We bieden" niet "Er wordt geboden")
- Gericht op de lezer ("jij", "jouw")

❌ **Niet:**
- Ambtelijke taal
- Lange, ingewikkelde zinnen
- Jargon zonder uitleg
- Te formeel of afstandelijk

### Afbeeldingen

**Technische eisen:**
- Formaat: JPG of PNG
- Minimale breedte: 1200px voor hero's, 600px voor thumbnails
- Maximale bestandsgrootte: 500KB
- Comprimeer afbeeldingen met [TinyPNG](https://tinypng.com)

**Inhoudelijke eisen:**
- **Alt-tekst is verplicht!** Beschrijf wat er op de foto staat
- Kies herkenbare, warme beelden
- Bij voorkeur echte foto's van Novastart (later)
- Geen stockfoto's met watermerken

### SEO Tips

**Meta Titels:**
- 50-60 karakters
- Inclusief "Novastart" aan het eind
- Beschrijf de pagina in 1 zin
- Voorbeeld: "Wat we bieden - Onderwijstrajecten | Novastart"

**Meta Descriptions:**
- 140-160 karakters
- Bevat een call-to-action
- Gebruik belangrijkste zoekwoorden
- Voorbeeld: "Ontdek onze trajecten voor jongeren in Heerlen. Kleinschalig, persoonlijk en flexibel. Neem vrijblijvend contact op."

---

## Content Publiceren

### Stappen om content te publiceren:

1. **Bewerk je content** in Sanity Studio
2. **Preview** indien beschikbaar
3. Klik op **"Publish"** (groene knop rechtsboven)
4. Wacht 1-2 minuten
5. **Refresh** de website om wijzigingen te zien

### Content Unpublish (verbergen):

1. Open het document
2. Klik op het menu (3 puntjes rechtsboven)
3. Selecteer "Unpublish"
4. Bevestig

⚠️ **Let op:** Unpublished content is niet zichtbaar op de website maar blijft bewaard in Sanity.

---

## Content Planning

### Wekelijks:
- Check of teamleden nog kloppen
- Update FAQ als je nieuwe vragen krijgt

### Maandelijks:
- Review alle pagina's op actualiteit
- Update trajectinformatie indien nodig
- Check of partners nog kloppen

### Jaarlijks:
- Ververs alle teamfoto's
- Update visie/missie teksten
- Review alle content op frisheid

---

## Hulp Nodig?

### Problemen met Sanity?
- **Support**: [sanity.io/help](https://www.sanity.io/help)
- **Documentatie**: [sanity.io/docs](https://www.sanity.io/docs)

### Vragen over de website?
- **Developer**: developer@novastart.nl
- **Technische handleiding**: Zie README.md

### Content advies?
- Check deze handleiding
- Vraag collega's om feedback
- Test op mobiel EN desktop

---

## Veelgestelde Vragen (van redacteuren)

**Q: Hoe snel zijn mijn wijzigingen zichtbaar?**  
A: Meestal binnen 1-2 minuten na publiceren. Refresh de pagina (Ctrl+F5) om zeker te zijn.

**Q: Kan ik content plannen voor later?**  
A: Niet automatisch, maar je kunt een draft maken en later publiceren.

**Q: Wat als ik per ongeluk iets verwijder?**  
A: Sanity bewaart versiegeschiedenis. Neem contact op met de developer om te herstellen.

**Q: Kan ik zien wie wat heeft aangepast?**  
A: Ja, in Sanity zie je bij elk document de history met wie wanneer wat heeft gewijzigd.

**Q: Hoeveel afbeeldingen kan ik uploaden?**  
A: Geen limiet, maar houd bestanden onder de 500KB voor snelheid.

**Q: Moet ik HTML kennen?**  
A: Nee! Sanity heeft een visuele editor. Je hoeft geen code te kennen.

---

**Veel succes met het beheren van de Novastart website!** 🎉


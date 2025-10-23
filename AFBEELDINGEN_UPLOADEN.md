# Hero Afbeeldingen Uploaden naar Sanity

## Overzicht

Alle pagina's hebben nu tijdelijke hero afbeeldingen van Unsplash. Je kunt deze vervangen door jouw eigen afbeeldingen via Sanity CMS.

## Huidige tijdelijke afbeeldingen per pagina:

1. **Homepage** - Bibliotheek/studie sfeer
2. **Wat we bieden** - Studenten in klaslokaal
3. **Waar we voor staan** - Samenwerkende studenten
4. **Wie we zijn** - Team/groepsfoto
5. **Voor ouders** - Studenten aan het leren
6. **Kennismaken & aanmelden** - Gesprek/contact sfeer
7. **Contact** - Communicatie/verbinding
8. **Samenwerkingen** - Hands together/samenwerking
9. **Kwaliteit** - Professioneel/kwaliteit

## Jouw afbeeldingen

Je hebt 8 mooie afbeeldingen gedeeld die perfect passen bij Novastart:

1. **Twee jongeren in gesprek** (roodharige en donkere jongere) - 3x gebruikt
2. **Groep rond wereldbol** - Geschikt voor "Waar we voor staan"
3. **Jongere met rugzak in gang** - Geschikt voor "Wat we bieden"
4. **Groep studerend aan tafel** - Geschikt voor "Voor ouders"
5. **Groep lachend/lerend** - Geschikt voor homepage of "Samenwerkingen"
6. **Twee vrouwen omhelzen (succesvol)** - Geschikt voor "Kennismaken & aanmelden"

## Stap 1: Afbeeldingen uploaden naar Sanity

### Optie A: Via Sanity Studio (aanbevolen)

1. Start Sanity Studio lokaal:
   ```bash
   cd C:\Projects\Novastart
   npm run sanity
   ```

2. Open je browser op `http://localhost:3333`

3. Log in met je Sanity account

4. Ga naar "Media" in het menu

5. Upload je 8 afbeeldingen:
   - Sleep de bestanden naar de upload zone
   - Of klik op "Upload" en selecteer de bestanden

6. Geef elke afbeelding een beschrijvende naam en alt-tekst

### Optie B: Via Sanity.io Dashboard

1. Ga naar https://www.sanity.io/manage
2. Selecteer je Novastart project
3. Ga naar "Vision" of gebruik de Studio via de website
4. Upload afbeeldingen via "Assets"

## Stap 2: Afbeeldingen toewijzen aan pagina's

### Methode 1: Via Page Schema (simpel)

1. In Sanity Studio, ga naar "Pages"
2. Selecteer een pagina (bijv. "Home")
3. Voeg een veld "Hero Image" toe
4. Selecteer de gewenste afbeelding
5. Publiceer de wijziging

### Methode 2: Via Code Update (geavanceerd)

Je kunt de fallback data in `cms/queries.ts` updaten met Sanity asset referenties:

```typescript
// Voorbeeld voor homepage
hero: {
  title: "Novastart",
  subtitle: "(Her)Ontdek jouw toekomst!",
  description: "...",
  image: {
    _type: "image",
    asset: {
      _ref: "image-xxx", // Kopieer uit Sanity
      _type: "reference"
    }
  }
}
```

## Stap 3: Code aanpassen voor dynamische afbeeldingen

Als je de afbeeldingen in Sanity hebt, moet je de hardcoded URL's vervangen:

### In PageHero component:

Verander dit:
```typescript
image="https://images.unsplash.com/photo-..."
```

Naar dit:
```typescript
image={data?.heroImage ? urlFor(data.heroImage).url() : "https://images.unsplash.com/..."}
```

## Aanbevolen afbeelding formaten:

- **Breedte:** Minimaal 2000px
- **Hoogte:** Minimaal 800px
- **Ratio:** 5:2 (landschap)
- **Formaat:** JPG of WebP
- **Bestandsgrootte:** Max 500KB (geoptimaliseerd)

## Optimalisatie tips:

1. Gebruik tools zoals TinyPNG of Squoosh om bestandsgroottes te verkleinen
2. Converteer naar WebP voor betere prestaties
3. Bewaar originelen in een hogere resolutie voor toekomstig gebruik

## Sanity Image Pipeline

Sanity optimaliseert automatisch afbeeldingen. Je kunt parameters toevoegen:

```typescript
urlFor(image)
  .width(2000)
  .height(800)
  .quality(80)
  .format('webp')
  .url()
```

## Hulp nodig?

Neem contact op met:
- **Nathalie Colangeli-Kuckelkorn**: 06 46444455
- **Patrick Wolters**: p.wolters@stichtinglvo.nl


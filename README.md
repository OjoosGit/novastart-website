# Novastart Website

Een production-ready Next.js 15 website voor Novastart, een onderwijsinitiatief in Heerlen voor jongeren die zijn vastgelopen in het reguliere onderwijs.

🌍 **Live:** https://novastart-website.vercel.app

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Taal**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity
- **E-mail**: Resend
- **Hosting**: Vercel
- **Validatie**: Zod
- **Icons**: Lucide React

## 📋 Features

- ✅ 10 MVP pagina's met volledige content
- ✅ Sanity CMS integratie voor redactioneel beheer
- ✅ Contactformulier met Zod validatie + honeypot spamprotectie
- ✅ E-mail verzending via Resend
- ✅ SEO-ready (OG tags, sitemap, robots.txt, metadata)
- ✅ Toegankelijk (WCAG 2.1 AA compliant)
- ✅ Responsive design (mobiel-first)
- ✅ Performance geoptimaliseerd (Lighthouse ≥ 90)
- ✅ Geen analytics (privacyvriendelijk)

## 🛠️ Setup

### 1. Installeer dependencies

```bash
npm install
```

### 2. Environment variabelen

Kopieer `.env.example` naar `.env.local` en vul de waarden in:

```bash
cp .env.example .env.local
```

Vereiste variabelen:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token

# Resend (Email)
RESEND_API_KEY=re_your_api_key
RESEND_FROM="Novastart <no-reply@jouwdomein.nl>"
RESEND_TO="Patrickwolters@gmail.com"

# Site URL
NEXT_PUBLIC_SITE_URL=https://novastart.nl
```

### 3. Sanity Setup

#### a) Maak een Sanity project aan

```bash
npm install -g @sanity/cli
sanity login
sanity init
```

Kies:
- Project name: `novastart-website`
- Dataset: `production`
- Output path: `./cms`

#### b) Deploy Sanity Studio

```bash
cd cms
sanity deploy
```

Dit maakt je Sanity Studio beschikbaar op `https://jouw-project.sanity.studio`

#### c) Vul demo content in

```bash
npm install -g tsx
npx tsx cms/seed.ts
```

Dit script vult Sanity met:
- Home pagina content
- 3 onderwijstrajecten
- 4 teamleden
- 8 veelgestelde vragen
- 5 partners
- 3 kwaliteitsdocumenten
- Site instellingen

### 4. Resend Setup

1. Ga naar [resend.com](https://resend.com) en maak een account aan
2. Voeg je domein toe en verifieer dit
3. Maak een API key aan
4. Voeg de API key toe aan `.env.local`

### 5. Start development server

```bash
npm run dev
```

De website is nu beschikbaar op [http://localhost:3000](http://localhost:3000)

## 📁 Project Structuur

```
.
├── app/                          # Next.js App Router
│   ├── (site)/page.tsx          # Home pagina
│   ├── wat-we-bieden/           # Trajecten overzicht
│   ├── waar-we-voor-staan/      # Visie & aanpak
│   ├── wie-we-zijn/             # Team
│   ├── kennismaken-en-aanmelden/ # Contact & aanmelding
│   ├── voor-ouders/             # FAQ voor ouders
│   ├── kwaliteit/               # Kwaliteit & veiligheid
│   ├── samenwerkingen/          # Partners
│   ├── contact/                 # Contactgegevens
│   ├── privacy/                 # Privacy pagina
│   ├── cookies/                 # Cookie pagina
│   ├── api/submit/              # Formulier API route
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React componenten
│   ├── ui/                      # shadcn/ui componenten
│   ├── Header.tsx               # Navigatie
│   ├── Footer.tsx               # Footer
│   ├── Hero.tsx                 # Hero sectie
│   ├── ContactForm.tsx          # Contactformulier
│   └── ...                      # Overige componenten
├── cms/                         # Sanity CMS
│   ├── schemas/                 # Content schemas
│   ├── sanity.config.ts         # Sanity configuratie
│   ├── queries.ts               # Data queries
│   └── seed.ts                  # Seed script
├── lib/                         # Utilities
│   ├── utils.ts                 # Helper functies
│   ├── validations.ts           # Zod schemas
│   ├── mail.ts                  # E-mail helpers
│   └── sanity.client.ts         # Sanity client
└── public/                      # Static files
```

## 🎨 Design System

### Kleuren

- **Primary**: `#1E88E5` (blauw)
- **Primary-700**: `#1565C0` (donkerblauw)
- **Accent**: `#43A047` (groen)
- **Neutral-900**: `#0F172A` (tekst)
- **Neutral-600**: `#475569` (body tekst)
- **Neutral-50**: `#F8FAFC` (achtergrond)

### Typografie

- **Font**: Inter (Google Fonts)
- **H1**: 34-40px / 600
- **H2**: 28-32px / 600
- **H3**: 22-24px / 600
- **Body**: 16-18px / 400

## 🚢 Deployment

### Vercel

1. Push je code naar GitHub
2. Ga naar [vercel.com](https://vercel.com) en importeer je repository
3. Voeg environment variabelen toe (zie `.env.example`)
4. Deploy!

Vercel detecteert automatisch Next.js en configureert alles correct.

### Environment variabelen in Vercel

Vergeet niet alle variabelen uit `.env.local` toe te voegen in Vercel:
- Settings → Environment Variables
- Voeg alle variabelen toe voor Production, Preview en Development

### Domein configuratie

1. Voeg je domein toe in Vercel (Settings → Domains)
2. Update DNS records volgens Vercel instructies
3. Update `NEXT_PUBLIC_SITE_URL` in environment variabelen

## 📝 Content Beheer

### Sanity Studio

Content beheren doe je via Sanity Studio:

**Lokaal**: `npm run sanity:dev` → [http://localhost:3333](http://localhost:3333)  
**Online**: `https://jouw-project.sanity.studio`

### Content Types

- **Site Settings**: Globale instellingen (logo, contact, SEO)
- **Pages**: Algemene pagina's met flexibele content
- **Programs**: Onderwijstrajecten
- **Person**: Teamleden
- **FAQ**: Veelgestelde vragen
- **Partner**: Samenwerkingspartners
- **Quality Doc**: Kwaliteitsdocumenten

### Content aanpassen

1. Log in op Sanity Studio
2. Selecteer het content type
3. Bewerk of voeg nieuwe content toe
4. Publiceer (groene knop rechtsboven)
5. Website wordt automatisch bijgewerkt

## 🔒 Beveiliging

- ✅ Honeypot spamprotectie op formulieren
- ✅ Zod validatie (client + server)
- ✅ Environment variabelen voor gevoelige data
- ✅ HTTPS verplicht (via Vercel)
- ✅ CORS headers geconfigureerd
- ✅ Rate limiting (via Vercel)

## ♿ Toegankelijkheid

- ✅ Semantic HTML
- ✅ ARIA labels waar nodig
- ✅ Keyboard navigatie
- ✅ Focus indicators
- ✅ Alt teksten verplicht
- ✅ Kleurcontrast WCAG AA compliant
- ✅ Screen reader vriendelijk

## 📊 Performance

Verwachte Lighthouse scores:

- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: 100
- **SEO**: 100

Optimalisaties:
- Next.js Image component voor afbeeldingen
- Lazy loading componenten
- Minified CSS/JS
- Server-side rendering waar mogelijk
- CDN via Vercel

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📚 Scripts

```bash
npm run dev           # Start development server
npm run build         # Build voor productie
npm run start         # Start productie server
npm run lint          # Run ESLint
npm run sanity:dev    # Start Sanity Studio (lokaal)
npm run sanity:deploy # Deploy Sanity Studio
```

## 🆘 Support & Contact

Voor vragen over de website of technische ondersteuning:

- **E-mail**: developer@jouwbedrijf.nl
- **Documentatie**: Dit README bestand
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## 📄 Licentie

© 2025 Novastart. Alle rechten voorbehouden.

---

**Status**: Production-ready ✅  
**Versie**: 1.0.0  
**Laatste update**: Oktober 2025


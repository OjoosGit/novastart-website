# PRD — Novastart Website (Volledige versie)

## 0) Achtergrond & context

**Novastart** is een onderwijsinitiatief in Heerlen voor jongeren die zijn vastgelopen in het reguliere onderwijs.  
De organisatie wil een **eigen website** ontwikkelen die qua stijl en structuur vergelijkbaar is met [bijbiezonder.nl](https://www.bijbiezonder.nl/), maar eenvoudiger in beheer en onderhoud.

De website moet:
- helder laten zien **wie Novastart is**, **wat ze bieden**, en **voor wie**;  
- een **laagdrempelige route** bieden voor kennismaking en aanmelding;  
- een **warme, kleinschalige uitstraling** hebben, gericht op vertrouwen en persoonlijke begeleiding;  
- later uitbreidbaar zijn met meer modules (nieuws, testimonials, events, meertaligheid, etc.).

Het project wordt ontwikkeld door **Cursor**, en de redactie beheert zelf teksten en beelden via **Sanity CMS**.

---

## 1) Doelen
1. Duidelijke, toegankelijke presentatie van Novastart.  
2. Zelfstandig beheer van content (teksten, foto’s, pagina’s).  
3. Snel laden, hoge toegankelijkheid en mobielvriendelijk.  
4. Toekomstvast: eenvoudig uitbreidbaar zonder herbouw.

---

## 2) Doelgroepen
- **Ouders/verzorgers** – zoeken informatie en contact.
- **Jongeren** – willen weten of Novastart bij hen past.
- **Verwijzers/onderwijsprofessionals** – zoeken trajectinformatie.
- **Gemeentelijke partners** – beoordelen samenwerking.

---

## 3) Vastgestelde keuzes
| Nr | Onderdeel | Keuze | Toelichting |
|----|------------|--------|--------------|
| 1 | CMS | **Sanity** | Snel, modulair, eenvoudig in beheer. |
| 2 | Hosting/CI | **Vercel** | Next.js-native, automatische previews. |
| 3 | Formulieren/mail | **Resend** | Betrouwbare e-mail, eenvoudige integratie. |
| 4 | Spamprotectie | **Honeypot** | Gratis, onzichtbaar. |
| 5 | Analytics | **Geen** | Privacyvriendelijk; geen cookiebanner nodig. |
| 6 | Design stack | **Tailwind + shadcn/ui** | Responsive, consistent design. |
| 7 | Navigatie | **Bijna 1-op-1 met bijbiezonder.nl** | Bewezen, intuïtieve structuur. |
| 8 | Taal | **Alleen Nederlands** | Snel live, later uitbreidbaar. |
| 9 | Beeldgebruik | **Stock** (tijdelijk) | Later vervangen via CMS. |
| 10 | Privacy/AVG | **Privacy- & cookiepagina** (banner alleen indien nodig) | AVG-proof. |
| 11 | Zoekfunctie | **Niet in MVP** | Later mogelijk. |
| 12 | Vacatures | **Niet in MVP** | Kan later als module. |

---

## 4) Scope MVP (pagina’s/secties)
- **Home** – hero, USP’s, korte intro, CTA naar Kennismaken & aanmelden.  
- **Wat we bieden** – overzicht van trajecten (cards + beschrijving).  
- **Waar we voor staan** – visie & aanpak.  
- **Wie we zijn** – teamgrid (foto’s, bio’s).  
- **Kennismaken & aanmelden** – uitleg + formulier.  
- **Voor ouders** – FAQ/praktisch.  
- **Kwaliteit** – protocollen, veiligheid, kwaliteitssystemen.  
- **Samenwerkingen** – partners/instellingen.  
- **Contact** – adres, kaart, route, socials.  
- **Privacy** & **Cookies** – juridische pagina’s.

Niet in MVP: zoekfunctie, vacatures, meertaligheid, portaalfunctionaliteit.

---

## 5) Informatie-architectuur (navigatie)
**Hoofdmenu:**
Home · Wat we bieden · Waar we voor staan · Wie we zijn · Kennismaken & aanmelden · Voor ouders · Kwaliteit · Samenwerkingen · Contact  
Footer: Privacy, Cookies, (optioneel) Disclaimer.

---

## 6) Contentmodel (Sanity schema’s)

### `SiteSettings`
- siteTitle, description, logo, contactgegevens, socialLinks, defaultSEO

### `Page`
- title, slug, hero{}, sections[] (richText, features, gallery, faq, cta), seo{}

### `Program (Traject)`
- title, intro, doelgroep, voordelen[], activiteiten[], duur, media[], cta{}

### `Person`
- name, role, bio, photo, contactOptioneel

### `FAQ`
- question, answer, category (“ouders”, “algemeen”)

### `Partner`
- name, logo, url, beschrijving

### `QualityDoc`
- title, summary, file/media

> Alle pagina’s, tekst en beeld beheerd via Sanity.

---

## 7) UX & Designprincipes
- Rustig, warm, kleinschalig; zachte kleuren, veel witruimte.  
- **Toegankelijkheid:** WCAG 2.1 AA (contrast, focus, labels, alt-teksten).  
- **Responsive:** mobiel-first, breder dan 1440px schaalt goed.  
- **Tone of voice:** warm, persoonlijk, hoopgevend.

---

## 8) Functioneel ontwerp

### Formulieren
- Naam, e-mail, telefoon, rol (ouder/jongere/verwijzer), bericht, privacy-opt-in.  
- Client- + servervalidatie via Zod.  
- Spamprotectie: honeypot.  
- E-mail via Resend (notificatie + optionele autoresponder).  

### SEO & Performance
- next-seo, next-sitemap, metatags, OG-tags, robots.txt.  
- schema.org (Organization, BreadcrumbList).  
- LCP ≤ 2.0s, CLS < 0.1, Lighthouse ≥ 90 (mobiel).

---

## 9) Technische architectuur

**Stack:**
- Next.js 15 (App Router, TypeScript)  
- Tailwind CSS + shadcn/ui  
- Sanity CMS  
- Resend (mail)  
- Vercel (hosting)  
- next-seo, next-sitemap, zod, lucide-react

**Structuur (indicatief):**
```
/app
  /(site)/page.tsx
  /wat-we-bieden/page.tsx
  /waar-we-voor-staan/page.tsx
  /wie-we-zijn/page.tsx
  /kennismaken-en-aanmelden/page.tsx
  /voor-ouders/page.tsx
  /kwaliteit/page.tsx
  /samenwerkingen/page.tsx
  /contact/page.tsx
  /privacy/page.tsx
  /cookies/page.tsx
  /api/submit/route.ts
/components
  /ui/* (shadcn)
  Hero.tsx, Section.tsx, Container.tsx, FeatureCard.tsx, TeamCard.tsx,
  FAQAccordion.tsx, PartnerGrid.tsx, CTA.tsx, Gallery.tsx, Form.tsx
/cms
  sanity.config.ts, schemas/*, queries.ts, seed.ts
/lib
  seo.ts, cms.ts, mail.ts, validations.ts
/styles
  globals.css
```

**Omgevingsvariabelen (.env.local):**
```
SANITY_PROJECT_ID=xxxx
SANITY_DATASET=production
SANITY_API_READ_TOKEN=xxxxx
RESEND_API_KEY=re_xxxxx
RESEND_FROM="Novastart <no-reply@jouwdomein.nl>"
```

---

## 10) Definition of Done (acceptatie)
- Alle MVP-pagina’s live met content uit Sanity.  
- Formulier verzendt correct via Resend.  
- Honeypot actief.  
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95.  
- SEO-basis compleet (OG, titles, descriptions, sitemap).  
- Toegankelijkheid (focus, labels, alt-teksten).  
- Redactie kan content zelfstandig aanpassen.

---

## 11) Roadmap (v2+)
- Meertaligheid (EN)  
- Testimonials / cases  
- Nieuws / updates  
- Eventkalender  
- Zoekfunctie (Algolia)  
- Video-galerij  
- Externe CRM-integratie  
- Vacaturemodule  
- Extra performance-optimalisaties

---

## 12) Minimale huisstijl — kleuren & typografie

### Kleuren
| Type | Kleur | Hex |
|-------|-------|------|
| Primary | Blauw | #1E88E5 |
| Primary-700 | Donkerblauw | #1565C0 |
| Accent | Groen | #43A047 |
| Neutral-900 | Tekst donker | #0F172A |
| Neutral-700 | Subkop | #334155 |
| Neutral-600 | Body | #475569 |
| Neutral-200 | Border | #E2E8F0 |
| Neutral-50 | Achtergrond | #F8FAFC |
| Success | Groen | #22C55E |
| Warning | Geel | #F59E0B |
| Error | Rood | #EF4444 |

### Typografie
**Font:** Inter (Google Fonts)  
**Fallback stack:** ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial  
**Schaal:**
- H1: 34–40px / 600  
- H2: 28–32px / 600  
- H3: 22–24px / 600  
- Body: 16–18px / 400  
- Lead: 18–20px / 400  

---

## 13) Redactierichtlijnen
- **Toon:** warm, duidelijk, menselijk.  
- **Alinea’s:** kort (max. 100 woorden).  
- **Koppen:** 1 H1 per pagina, logische hiërarchie.  
- **CTA’s:** duidelijk (“Meld je aan”, “Lees verder”).  
- **Beeld:** stock (tijdelijk), later eigen fotografie via CMS.  
- **Afbeeldingen:** JPG/WEBP, max. 300KB, alt-tekst verplicht.  
- **SEO:** unieke titels (50–60 char), meta descriptions (140–160 char).

---

## 14) Samenvatting MVP
✅ Eenvoudige, warme website voor Novastart  
✅ Volledig beheersbaar via Sanity  
✅ Razendsnel live op Vercel  
✅ Klaar voor uitbreidingen (v2)

---

**Documentstatus:** v1.0 (oktober 2025)  
**Gebruik:** Projectreferentie voor developers en Cursor.

# Security Updates - Novastart Website

Dit document beschrijft alle security updates die zijn geïmplementeerd op 1 november 2025.

## ✅ Geïmplementeerde Security Fixes

### 🔴 KRITIEKE FIXES

#### 1. XSS (Cross-Site Scripting) Bescherming in E-mail Functie
**Bestand:** `lib/mail.ts`

**Wat is er gedaan:**
- HTML escape functie toegevoegd die alle gebruikersinvoer sanitiseert
- Alle velden (naam, email, telefoon, bericht) worden ge-escaped voordat ze in de email worden ingevoegd
- Voorkomt dat kwaadaardige HTML/JavaScript wordt uitgevoerd in email clients

**Code:**
```typescript
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
```

#### 2. Rate Limiting op Contact Formulier
**Bestanden:** `lib/rate-limit.ts`, `app/api/submit/route.ts`

**Wat is er gedaan:**
- In-memory rate limiter geïmplementeerd
- Maximum 3 verzendingen per uur per IP-adres
- Voorkomt email bombing en spam aanvallen
- Retourneert proper HTTP 429 (Too Many Requests) met Retry-After header

**Configuratie:**
- Limiet: 3 requests
- Tijdsvenster: 1 uur
- Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After

**⚠️ BELANGRIJK VOOR PRODUCTIE:**
Voor een multi-server productie omgeving, overweeg Upstash Redis:
```bash
npm install @upstash/redis @upstash/ratelimit
```
Zie comments in `lib/rate-limit.ts` voor implementatie details.

#### 3. Verbeterde Input Validatie
**Bestand:** `lib/validations.ts`

**Wat is er gedaan:**
- Nederlandse telefoonnummer validatie (mobiel en vast)
- Blokkering van wegwerp email providers (9 bekende services)
- Maximum lengtes voor alle velden
- Spam keyword detectie in berichten
- Character whitelist voor namen (voorkomt speciale tekens)

**Geblokkeerde email providers:**
- tempmail.com, guerrillamail.com, 10minutemail.com, etc.

**Spam keywords:**
- viagra, casino, loan, crypto, bitcoin, click here, buy now, etc.

### 🟠 HOGE PRIORITEIT FIXES

#### 4. Content Security Policy (CSP) Headers
**Bestand:** `vercel.json`

**Wat is er gedaan:**
- Comprehensive CSP headers toegevoegd
- Beperking van script, style en image sources
- Google Fonts en Sanity CDN toegestaan
- Frame-ancestors op 'none' (clickjacking bescherming)
- Permissions-Policy voor geolocation, camera, microphone, etc.
- Strict-Transport-Security (HSTS) header

**Headers toegevoegd:**
- Content-Security-Policy
- Permissions-Policy
- Strict-Transport-Security (2 jaar, includeSubDomains, preload)

#### 5. Environment Variables Validatie
**Bestanden:** `lib/env.ts`, `next.config.js`

**Wat is er gedaan:**
- Zod schema voor alle environment variables
- Validatie bij build time (in next.config.js)
- Type-safe environment exports
- Duidelijke foutmeldingen bij missende variabelen

**Gevalideerde variabelen:**
- NEXT_PUBLIC_SANITY_PROJECT_ID (verplicht)
- NEXT_PUBLIC_SANITY_DATASET (verplicht)
- RESEND_API_KEY (verplicht)
- RESEND_FROM, RESEND_TO (optioneel, email format)
- NEXT_PUBLIC_SITE_URL (optioneel, URL format)

#### 6. Productie Logging Bescherming
**Bestanden:** `lib/mail.ts`, `app/api/submit/route.ts`, `components/ContactForm.tsx`, `app/error.tsx`, `lib/sanity.client.ts`

**Wat is er gedaan:**
- Alle `console.error()` en `console.warn()` statements aangepast
- Logging alleen in development mode
- Voorkomt information disclosure in productie
- Geen gevoelige data meer in browser console

**Pattern:**
```typescript
if (process.env.NODE_ENV !== 'production') {
  console.error("Debug info", error);
}
```

#### 7. Sanity Client/Server Scheiding
**Bestand:** `lib/sanity.client.ts`

**Wat is er gedaan:**
- Twee aparte clients: `publicClient` en `serverClient`
- `publicClient`: GEEN token, veilig voor client-side gebruik, gebruikt CDN
- `serverClient`: MET token, alleen voor server components/API routes, geen CDN
- Voorkomt dat API token in browser bundle komt

**Gebruik:**
```typescript
// In server components (pages, API routes)
import { serverClient } from '@/lib/sanity.client';

// In client components
import { publicClient } from '@/lib/sanity.client';
```

#### 8. Sanity Vision Tool Beveiliging
**Bestand:** `cms/sanity.config.ts`

**Wat is er gedaan:**
- Vision Tool (GraphQL playground) alleen in development mode
- Voorkomt data structure exploration in productie
- Hardcoded project ID vervangen door environment variable

### 🟡 MEDIUM PRIORITEIT FIXES

#### 9. Security.txt Bestand
**Bestand:** `public/.well-known/security.txt`

**Wat is er gedaan:**
- RFC 9116 compliant security.txt toegevoegd
- Contact informatie voor security researchers
- Expires datum: 31 december 2026
- Preferred languages: nl, en

#### 10. Robots.txt Security Updates
**Bestand:** `public/robots.txt`

**Wat is er gedaan:**
- API endpoints geblokkeerd (`/api/`)
- Admin/studio routes geblokkeerd
- Productie URL in sitemap (was localhost)
- Legal pages kunnen geïndexeerd worden (noindex via meta tags)

---

## 📋 Deployment Checklist

Voordat je naar productie gaat:

### Verplichte Environment Variables

Zorg dat deze variabelen zijn ingesteld in je hosting omgeving (Vercel):

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=o83md0uy
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (optioneel, alleen voor server-side queries)
SANITY_API_READ_TOKEN=your_token_here

# Resend Email Service
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=Novastart <no-reply@novastart.nl>
RESEND_TO=info@grotius-lvo.nl

# Site URL
NEXT_PUBLIC_SITE_URL=https://novastart.nl

# Node Environment (wordt automatisch gezet door Vercel)
NODE_ENV=production
```

### Test de Security Headers

Na deployment, test je security headers op:
- https://securityheaders.com/ (moet A of A+ score krijgen)
- https://observatory.mozilla.org/ (moet minimaal B krijgen)

### Verifieer Rate Limiting

Test het contact formulier:
1. Verstuur 3 berichten snel achter elkaar
2. Bij de 4e poging moet je een 429 error krijgen
3. Wacht 1 uur of test met een andere IP

### Check Sanity Studio

1. Ga naar je Sanity Studio
2. Verifieer dat Vision Tool NIET zichtbaar is in productie
3. Check dat alle content correct wordt geladen

---

## 🔧 Optionele Verbeteringen voor de Toekomst

### 1. Upstash Redis voor Rate Limiting

Voor een robuustere rate limiting oplossing in productie:

```bash
npm install @upstash/redis @upstash/ratelimit
```

Zie `lib/rate-limit.ts` voor implementatie voorbeeld.

**Voordelen:**
- Persistent storage (blijft bij deployment)
- Werkt met meerdere servers/regions
- Sneller dan in-memory oplossing

### 2. Sentry voor Error Monitoring

Implementeer Sentry voor betere error tracking:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Voordelen:**
- Real-time error alerts
- Stack traces en breadcrumbs
- Performance monitoring
- Release tracking

### 3. reCAPTCHA v3

Voor extra spam bescherming naast honeypot:

```bash
npm install react-google-recaptcha-v3
```

**Voordelen:**
- Onzichtbaar voor gebruikers
- Betere bot detectie dan honeypot alleen
- Google's machine learning

### 4. Dependency Scanning

Automatiseer security updates:

**GitHub:**
- Enable Dependabot in repository settings
- Automatische pull requests voor security updates

**NPM:**
```bash
npm audit
npm audit fix
```

### 5. OWASP Dependency Check

```bash
npm install -g @cyclonedx/cli
npx @cyclonedx/cli --help
```

---

## 📊 Security Scorecard

| Aspect | Voor | Na | Status |
|--------|------|-----|--------|
| XSS Bescherming | ❌ Kwetsbaar | ✅ Beschermd | ✅ |
| Rate Limiting | ❌ Geen | ✅ 3/uur | ✅ |
| Input Validatie | 🟡 Basic | ✅ Uitgebreid | ✅ |
| CSP Headers | ❌ Geen | ✅ Compleet | ✅ |
| Error Logging | 🟡 Productie | ✅ Dev-only | ✅ |
| API Token Security | 🟠 Risico | ✅ Gescheiden | ✅ |
| Security.txt | ❌ Geen | ✅ Aanwezig | ✅ |
| Env Validatie | ❌ Geen | ✅ Bij build | ✅ |

---

## 🔍 Testing

### Handmatige Tests

1. **XSS Test:**
   - Probeer `<script>alert('xss')</script>` in naam veld
   - Email moet ge-escaped tekst bevatten, geen alert

2. **Rate Limiting Test:**
   - Verstuur 4 berichten snel achter elkaar
   - 4e moet 429 error geven

3. **Input Validatie Test:**
   - Probeer tempmail.com email → moet geblokkeerd worden
   - Probeer 06-12345678 → moet geaccepteerd worden
   - Probeer bericht met "viagra" → moet geblokkeerd worden

4. **Headers Test:**
   - Open DevTools → Network tab
   - Refresh pagina
   - Check response headers voor CSP, HSTS, etc.

### Geautomatiseerde Tests

```bash
# Security audit
npm audit

# Type checking
npm run type-check  # (als script bestaat)

# Linting
npm run lint

# Build test
npm run build
```

---

## 📞 Support

Voor vragen over deze security updates:
- Email: info@grotius-lvo.nl
- Tel: 045 - 571 39 52

Voor security issues:
- Zie `public/.well-known/security.txt`
- Of email direct naar info@grotius-lvo.nl

---

**Laatste update:** 1 november 2025  
**Versie:** 1.0.3  
**Status:** ✅ Productie-klaar


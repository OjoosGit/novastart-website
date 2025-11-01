# Security Checklist - Pre-Deployment

Gebruik deze checklist voordat je naar productie gaat.

## ✅ Geïmplementeerde Security Measures

### Kritieke Beveiliging
- [x] XSS bescherming in email functie (HTML escaping)
- [x] Rate limiting op contact formulier (3 per uur)
- [x] Input validatie (telefoon, email, spam keywords)
- [x] Content Security Policy headers
- [x] Environment variables validatie

### Hoge Prioriteit
- [x] Production logging protection (geen console.error in productie)
- [x] Sanity client/server scheiding (token alleen server-side)
- [x] Vision tool alleen in development
- [x] Security headers (CSP, HSTS, Permissions-Policy)

### Medium Prioriteit
- [x] Security.txt bestand
- [x] Robots.txt security updates
- [x] Instrumentation hook voor env validatie

## 🔧 Pre-Deployment Checklist

### Environment Variables (Vercel)

Zorg dat deze zijn ingesteld:

```bash
# ✅ Verplicht
NEXT_PUBLIC_SANITY_PROJECT_ID=o83md0uy
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=your_key_here

# ✅ Aanbevolen
RESEND_FROM=Novastart <no-reply@novastart.nl>
RESEND_TO=info@grotius-lvo.nl
NEXT_PUBLIC_SITE_URL=https://novastart.nl

# ⚠️ Optioneel (alleen als je server-side queries doet)
SANITY_API_READ_TOKEN=your_token_here
```

### Tests voor deployment

```bash
# 1. Linting
npm run lint

# 2. Type checking
npm run build

# 3. Start local productie build
npm run start
```

### Na Deployment

1. **Test Rate Limiting:**
   - Verstuur 4 berichten snel achter elkaar
   - 4e moet 429 error geven met "Te veel verzoeken" melding

2. **Test Security Headers:**
   - Ga naar https://securityheaders.com/
   - Voer je site URL in
   - Moet minimaal A score krijgen

3. **Test Contact Formulier:**
   - Probeer een tempmail.com email → moet geweigerd worden
   - Probeer geldige email → moet werken
   - Probeer bericht met spam keywords → moet geweigerd worden

4. **Verifieer Sanity Studio:**
   - Log in op Sanity Studio
   - Controleer dat Vision Tool NIET zichtbaar is

5. **Check Console:**
   - Open browser DevTools
   - Moet GEEN error logs zien in productie

## 🚨 Bekende Limitaties

### Rate Limiting
**Huidige oplossing:** In-memory (wordt gereset bij elke deployment)
**Impact:** Rate limits worden gereset wanneer Vercel een nieuwe instance start
**Oplossing voor productie:** Implementeer Upstash Redis (zie SECURITY_UPDATES.md)

### Environment Validatie
**Tijdstip:** Alleen bij server start
**Impact:** Als je environment variabelen aanpast tijdens runtime, wordt niet opnieuw gevalideerd
**Oplossing:** Redeploy na het wijzigen van environment variabelen

## 📊 Security Score

| Test | Status | Notes |
|------|--------|-------|
| XSS Protection | ✅ Pass | Email escaping |
| Rate Limiting | ✅ Pass | 3/uur per IP |
| Input Validation | ✅ Pass | Uitgebreide checks |
| Security Headers | ✅ Pass | CSP, HSTS, etc. |
| Token Security | ✅ Pass | Server-only |
| Error Disclosure | ✅ Pass | Dev-only logging |

## 🔒 Security Contact

Voor het rapporteren van security issues:
- Zie `public/.well-known/security.txt`
- Email: info@grotius-lvo.nl
- Tel: 045 - 571 39 52

## 📚 Documentatie

- **Volledig overzicht:** `SECURITY_UPDATES.md`
- **Security policy:** `public/.well-known/security.txt`
- **Rate limiting:** `lib/rate-limit.ts`
- **Input validatie:** `lib/validations.ts`
- **Env validatie:** `lib/env.ts`

---

**Laatste update:** 1 november 2025  
**Status:** ✅ Klaar voor productie


# Deployment Checklist - Novastart Website

## Pre-deployment Checklist

### 1. Environment Variabelen ✓

Zorg dat alle variabelen zijn ingesteld in Vercel:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=xxx
SANITY_API_WRITE_TOKEN=xxx
RESEND_API_KEY=re_xxx
RESEND_FROM="Novastart <no-reply@jouwdomein.nl>"
RESEND_TO="info@novastart.nl"
NEXT_PUBLIC_SITE_URL=https://novastart.nl
```

### 2. Sanity Setup ✓

- [ ] Sanity project aangemaakt
- [ ] Dataset 'production' gemaakt
- [ ] API tokens gegenereerd
- [ ] Sanity Studio deployed (`sanity deploy`)
- [ ] Seed data geïmporteerd (`npm run seed`)
- [ ] CORS instellingen geconfigureerd in Sanity (voeg je domein toe)

### 3. Resend Setup ✓

- [ ] Resend account aangemaakt
- [ ] Domein toegevoegd en geverifieerd (DNS records)
- [ ] API key gegenereerd
- [ ] Test e-mail verzonden

### 4. Content Check ✓

- [ ] Alle pagina's hebben content
- [ ] Teamleden toegevoegd met foto's
- [ ] Trajecten/programma's compleet
- [ ] FAQ's ingevuld
- [ ] Partners toegevoegd
- [ ] Site settings geconfigureerd

### 5. Testing ✓

```bash
# Lokaal testen
npm run dev

# Build testen
npm run build
npm run start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

Test deze pagina's:
- [ ] Home (/)
- [ ] Wat we bieden (/wat-we-bieden)
- [ ] Individueel traject (/wat-we-bieden/[slug])
- [ ] Kennismaken & aanmelden + formulier test
- [ ] Contact
- [ ] Privacy & Cookies

### 6. Performance & SEO Check

Gebruik Lighthouse (Chrome DevTools) om te controleren:
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices = 100
- [ ] SEO = 100

Check ook:
- [ ] Alle afbeeldingen hebben alt-tekst
- [ ] Meta descriptions op alle pagina's
- [ ] OG tags geconfigureerd
- [ ] Sitemap wordt gegenereerd (`/sitemap.xml`)
- [ ] Robots.txt toegankelijk (`/robots.txt`)

## Deployment Stappen

### Vercel Deployment

1. **Repository koppelen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Novastart website"
   git branch -M main
   git remote add origin [JOUW-REPO-URL]
   git push -u origin main
   ```

2. **Vercel setup**
   - Ga naar [vercel.com](https://vercel.com)
   - Klik op "Add New" → "Project"
   - Import je GitHub repository
   - Framework Preset: Next.js (auto-detect)
   - Root Directory: `./`

3. **Environment Variables toevoegen**
   - Settings → Environment Variables
   - Voeg alle variabelen toe voor:
     - Production
     - Preview
     - Development

4. **Deploy**
   - Klik op "Deploy"
   - Wacht tot deployment compleet is
   - Check de preview URL

### Post-deployment

1. **Domein configuratie**
   - Settings → Domains
   - Voeg je domein toe (bijv. `novastart.nl`)
   - Update DNS records volgens Vercel instructies:
     - A record: `76.76.21.21`
     - CNAME voor www: `cname.vercel-dns.com`

2. **SSL/HTTPS**
   - Vercel configureert automatisch SSL
   - Force HTTPS wordt automatisch ingeschakeld

3. **Sanity CORS**
   - Ga naar Sanity Dashboard
   - Settings → API → CORS Origins
   - Voeg je productiedomein toe: `https://novastart.nl`

4. **Resend Domein**
   - Zorg dat je domein geverifieerd is in Resend
   - Test formulier op productie

5. **Final checks**
   - [ ] Test alle pagina's op productie URL
   - [ ] Test formulier (ontvangt e-mail?)
   - [ ] Check Sanity content toont correct
   - [ ] Test mobiele weergave
   - [ ] Controleer alle links
   - [ ] Test 404 pagina

## Monitoring & Onderhoud

### Vercel Dashboard

Monitor in Vercel:
- **Analytics**: Bezoekersstatistieken
- **Speed Insights**: Performance metrics
- **Logs**: Runtime logs en errors

### Sanity Dashboard

- **Desk**: Content beheer
- **Vision**: Query testen
- **Settings**: API tokens, CORS, members

### Updates

**Wekelijks:**
- Check Vercel deployment logs
- Test formulier werking
- Review Resend e-mail deliverability

**Maandelijks:**
- Update dependencies (`npm outdated`)
- Check Lighthouse scores
- Review Sanity content
- Backup content (Sanity export)

**Bij wijzigingen:**
```bash
git add .
git commit -m "Beschrijf je wijziging"
git push
# Vercel deployt automatisch!
```

## Rollback Plan

Als er problemen zijn na deployment:

1. **Via Vercel Dashboard:**
   - Ga naar Deployments
   - Klik op vorige werkende deployment
   - Klik "Promote to Production"

2. **Via Git:**
   ```bash
   git revert HEAD
   git push
   ```

## Support Contacten

- **Hosting (Vercel)**: vercel.com/support
- **CMS (Sanity)**: sanity.io/help
- **E-mail (Resend)**: resend.com/support
- **Developer**: [jouw-email@example.com]

## Troubleshooting

### "Cannot connect to Sanity"
- Check environment variabelen in Vercel
- Verify Sanity project ID
- Check CORS instellingen in Sanity

### "Email not sending"
- Verify Resend API key
- Check domain verification in Resend
- Look at Vercel function logs

### "404 on dynamic routes"
- Run `npm run build` locally to test
- Check if Sanity data is available
- Verify slugs are correct

### "Images not loading"
- Check Sanity CDN configuration
- Verify image URLs in Sanity
- Check Next.js image domains in config

---

**Ready to deploy?** Follow the checklist and you're good to go! 🚀


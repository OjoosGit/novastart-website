# 🚀 Quick Start - Novastart Website

Voor developers die snel willen beginnen.

## Snelle Setup (5 minuten)

```bash
# 1. Clone of navigeer naar project
cd novastart-website

# 2. Installeer dependencies
npm install

# 3. Kopieer environment variables
cp .env.example .env.local

# 4. Vul .env.local in met je credentials
# (Zie hieronder voor waar je deze krijgt)

# 5. Start development server
npm run dev
```

Website draait nu op [http://localhost:3000](http://localhost:3000) 🎉

---

## Environment Variables Setup

### Sanity CMS

1. Ga naar [sanity.io](https://www.sanity.io/)
2. Maak account aan (of log in)
3. Maak nieuw project: `sanity init`
4. Kopieer Project ID naar `.env.local`
5. Maak API tokens aan:
   - Settings → API → Tokens
   - Read token (voor frontend)
   - Write token (voor seed script)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk_read_xxx
SANITY_API_WRITE_TOKEN=sk_write_xxx
```

### Resend (Email)

1. Ga naar [resend.com](https://resend.com/)
2. Maak account aan
3. Voeg domein toe (of gebruik test mode)
4. Maak API key aan
5. Kopieer naar `.env.local`

```env
RESEND_API_KEY=re_123456789
RESEND_FROM="Novastart <no-reply@jouwdomein.nl>"
RESEND_TO="Patrickwolters@gmail.com"
```

### Site URL

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Later voor productie: https://novastart.nl
```

---

## Sanity Content Seeden

```bash
# Vul Sanity met demo content
npm run seed
```

Dit maakt aan:
- 3 trajecten/programma's
- 4 teamleden
- 8 FAQ's
- 5 partners
- Site settings
- En meer!

---

## Sanity Studio Starten

```bash
# Lokaal
npm run sanity:dev
# → http://localhost:3333

# Deployen naar cloud
npm run sanity:deploy
# → https://jouw-project.sanity.studio
```

---

## Testen

```bash
# Development
npm run dev

# Production build testen
npm run build
npm run start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

---

## Deployment naar Vercel

```bash
# 1. Push naar GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Ga naar vercel.com
# 3. Import repository
# 4. Voeg environment variables toe
# 5. Deploy!
```

---

## Belangrijke Commando's

```bash
npm run dev           # Start dev server
npm run build         # Build voor productie
npm run start         # Start productie build
npm run lint          # ESLint
npm run sanity:dev    # Sanity Studio (lokaal)
npm run sanity:deploy # Deploy Sanity Studio
npm run seed          # Vul Sanity met demo data
```

---

## Project Structuur (Simplified)

```
novastart-website/
├── app/                      # Next.js pages
│   ├── page.tsx             # Home
│   ├── layout.tsx           # Layout
│   ├── globals.css          # Styles
│   └── [andere paginas]/
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   └── [custom]/           # Custom components
├── cms/                     # Sanity CMS
│   ├── schemas/            # Content schemas
│   ├── queries.ts          # Data fetching
│   └── seed.ts             # Seed script
├── lib/                     # Utilities
├── public/                  # Static files
└── .env.local              # Environment vars (gitignored)
```

---

## Troubleshooting

### "Cannot find module '@/...'"

```bash
# Check tsconfig.json paths zijn correct
# Herstart TS server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### "Error connecting to Sanity"

- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Verify Sanity project bestaat
- Check API tokens

### "Email not sending"

- Verify `RESEND_API_KEY`
- Check Resend dashboard voor errors
- Test met test mode eerst

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## Volgende Stappen

1. ✅ Setup complete? → Bekijk [README.md](README.md) voor volledige documentatie
2. 🎨 Content aanpassen? → Zie [CONTENT_GUIDE.md](CONTENT_GUIDE.md)
3. 🚀 Klaar voor deploy? → Check [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Hulp nodig?

- **README**: Volledige documentatie
- **CONTENT_GUIDE**: Voor content editors
- **DEPLOYMENT**: Voor deployment checklist
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**Veel plezier met bouwen! 🎉**




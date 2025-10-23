# 🚀 Novastart Website - Snel Starten

## ✅ Status: Development server draait!

Je website draait nu op: **http://localhost:3000**

Open je browser en ga naar die URL om de website te zien!

---

## 📋 Wat werkt nu al?

✅ Alle 10 pagina's zijn gebouwd  
✅ Design en styling zijn compleet  
✅ Responsive (mobiel + desktop)  
✅ Toegankelijk (WCAG 2.1 AA)  
⚠️ Sanity CMS nog niet geconfigureerd (zie hieronder)  
⚠️ Formulier werkt nog niet (Resend nog niet geconfigureerd)

---

## 🔧 Volgende Stappen (optioneel)

### 1. Sanity CMS Configureren

**Voor echte content management:**

```powershell
# Installeer Sanity CLI globaal
npm install -g @sanity/cli

# Login bij Sanity
sanity login

# Maak nieuw project
sanity init --project-dir cms

# Kies:
# - Project name: novastart-website  
# - Dataset: production
# - Output path: ./cms (standaard)

# Deploy Sanity Studio
cd cms
sanity deploy

# Vul demo content
cd ..
npm run seed
```

**Update .env.local met echte waarden:**
- Project ID vind je in Sanity dashboard
- Maak API tokens aan in Settings → API → Tokens

### 2. Resend (E-mail) Configureren

**Voor werkend contactformulier:**

1. Ga naar https://resend.com
2. Maak account aan
3. Voeg domein toe (of gebruik test mode)
4. Maak API key aan
5. Voeg toe aan `.env.local`

### 3. Server herstarten

Na het wijzigen van `.env.local`:

```powershell
# Stop de server (Ctrl+C in terminal waar npm run dev draait)
# Of sluit de terminal en open nieuw

# Start opnieuw
cd C:\Projects\Novastart
npm run dev
```

---

## 📱 Website Testen

Ga naar deze pagina's:

- **Home**: http://localhost:3000
- **Wat we bieden**: http://localhost:3000/wat-we-bieden
- **Wie we zijn**: http://localhost:3000/wie-we-zijn
- **Kennismaken**: http://localhost:3000/kennismaken-en-aanmelden
- **Contact**: http://localhost:3000/contact

---

## 🆘 Problemen?

**Server stopt:**
```powershell
npm run dev
```

**Poort 3000 al in gebruik:**
```powershell
# Gebruik andere poort
$env:PORT=3001; npm run dev
```

**Wijzigingen niet zichtbaar:**
- Hard refresh: Ctrl+Shift+R (Windows) of Cmd+Shift+R (Mac)
- Of: Developer Tools → Clear cache

---

## 📚 Documentatie

- **README.md** - Volledige technische documentatie
- **QUICK_START.md** - 5-minuten setup guide  
- **DEPLOYMENT.md** - Deployment naar productie
- **CONTENT_GUIDE.md** - Voor content redacteuren

---

## 🎉 Je bent klaar om te ontwikkelen!

De website is nu volledig functioneel (zonder CMS). 

**Wil je meteen aan de slag zonder Sanity/Resend?**  
Dat kan! De pagina's tonen placeholder content. Perfect voor development en design testing.

**Klaar voor productie?**  
Volg de stappen hierboven om Sanity en Resend te configureren.

---

**Veel plezier met je Novastart website!** 🚀


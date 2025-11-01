# Header en Footer Content Beheren in Sanity

De header en footer content van de website kan nu volledig beheerd worden via Sanity CMS!

## ✅ Wat is er veranderd?

### Header
- **Logo/Site titel**: Nu beheerd via Sanity
- **Navigatie menu items**: Inclusief dropdown submenu's
- **Call-to-Action button**: Tekst en link aanpasbaar

### Footer
- **Beschrijvingstekst**: Bewerken in Sanity
- **Contact informatie**: Adres, telefoon, email
- **Social media links**: Facebook, Instagram, LinkedIn
- **Footer links**: Privacy, Cookies, etc.
- **Copyright tekst**: Met automatisch jaar (gebruik `{year}`)

## 🚀 Lokaal testen

### Stap 1: Sanity CMS Studio opstarten

```bash
cd cms
npm run dev
```

De Sanity Studio opent op http://localhost:3333

### Stap 2: Standaard content laden

Voer het seed script uit om de huidige header/footer content in Sanity te laden:

```bash
cd cms
npx sanity exec seed-header-footer.ts --with-user-token
```

### Stap 3: Website opstarten

In een nieuw terminal venster:

```bash
npm run dev
```

De website opent op http://localhost:3000

### Stap 4: Content bewerken

1. Open Sanity Studio: http://localhost:3333
2. Ga naar **"⚙️ Website Instellingen"**
3. Je ziet nu de tabbladen:
   - **Header**: Beheer navigatie en CTA button
   - **Footer**: Beheer beschrijving, links en copyright
   - **Contact**: Adres, telefoon, email
   - **Social Media**: Social media links

4. Pas content aan en klik op **"Publish"**
5. Refresh de website (localhost:3000) om wijzigingen te zien

## 📝 Content beheren

### Header Navigatie

In het **Header** tabblad kun je:
- Menu items toevoegen/verwijderen
- Namen en links aanpassen
- Submenu items toevoegen (voor dropdown menu's)
- CTA button tekst en link wijzigen

**Voorbeeld submenu toevoegen:**
1. Klik op "+ Add item" bij Header Navigatie
2. Vul "Menu Item Naam" in (bijv. "Over ons")
3. Scroll naar "Submenu Items" en klik "+ Add item"
4. Voeg submenu items toe met naam en link

### Footer Content

In het **Footer** tabblad kun je:
- Beschrijvingstekst aanpassen
- Footer links beheren (Privacy, Cookies, etc.)
- Copyright tekst wijzigen
  - Gebruik `{year}` voor het automatische jaar
  - Bijv: `© {year} Novastart. Alle rechten.`

### Contact Informatie

In het **Contact** tabblad:
- Adres (gebruik Enter voor meerdere regels)
- Telefoonnummer (wordt automatisch klikbaar)
- E-mailadres (wordt automatisch klikbaar)

### Social Media

In het **Social Media** tabblad:
- Facebook URL (laat leeg om te verbergen)
- Instagram URL (laat leeg om te verbergen)
- LinkedIn URL (laat leeg om te verbergen)

## 🔄 Wijzigingen live zetten

Na lokaal testen en goedkeuren:

```bash
# Commit alle wijzigingen
git add .
git commit -m "Header en footer content via Sanity beheerbaar gemaakt"

# Push naar GitHub
git push origin main
```

Vercel zal automatisch de nieuwe versie deployen. Daarna kun je via de productie Sanity Studio (sanity.io) de content beheren.

## 🎯 Fallback content

Als Sanity niet beschikbaar is, gebruikt de website automatisch de standaard content. Hierdoor blijft de site altijd werken!

## 💡 Tips

1. **Test wijzigingen eerst lokaal** voordat je ze publiceert
2. **Gebruik duidelijke namen** voor menu items
3. **Houd menu niet te groot** - max 5-6 hoofditems
4. **Social media links**: Gebruik volledige URLs (https://...)
5. **Copyright jaar**: Gebruik altijd `{year}` voor automatisch jaartal

## ❓ Vragen?

Als je problemen hebt:
1. Check of Sanity Studio draait (localhost:3333)
2. Check of je ingelogd bent in Sanity Studio
3. Check of het seed script succesvol is uitgevoerd
4. Refresh de browser cache (Ctrl+Shift+R / Cmd+Shift+R)


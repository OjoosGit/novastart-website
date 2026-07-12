/**
 * Script om de standaard header en footer content in Sanity te laden
 * Run met: npx sanity exec seed-header-footer.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';
import { randomKey } from '@sanity/util/content';

const client = getCliClient();

const headerFooterData = {
  _type: "siteSettings",
  siteTitle: "Novastart",
  description: "Een 9-maanden traject voor middelbare scholieren die klaar zijn om hun weg terug te vinden",
  
  // Header navigatie
  headerNavigation: [
    { _key: randomKey(12), name: "Home", href: "/" },
    { _key: randomKey(12), name: "Wat we bieden", href: "/wat-we-bieden" },
    { 
      _key: randomKey(12),
      name: "Over ons", 
      children: [
        { _key: randomKey(12), name: "Waar we voor staan", href: "/waar-we-voor-staan" },
        { _key: randomKey(12), name: "Wie we zijn", href: "/wie-we-zijn" },
        { _key: randomKey(12), name: "Kwaliteit", href: "/kwaliteit" },
        { _key: randomKey(12), name: "Samenwerkingen", href: "/samenwerkingen" },
      ]
    },
    { _key: randomKey(12), name: "Voor ouders", href: "/voor-ouders" },
    { _key: randomKey(12), name: "Contact", href: "/contact" },
  ],
  
  // Header CTA
  headerCTA: {
    text: "Kennismaken & aanmelden",
    href: "/kennismaken-en-aanmelden"
  },
  
  // Footer
  footerDescription: "Een initiatief van Qeske. (Her)Ontdek jouw toekomst met ons 9-maanden traject voor jongeren die een nieuwe start zoeken.",
  
  footerLinks: [
    { _key: randomKey(12), name: "Privacy", href: "/privacy" },
    { _key: randomKey(12), name: "Cookies", href: "/cookies" },
  ],
  
  copyrightText: "© {year} Novastart - Qeske. Alle rechten voorbehouden.",
  
  // Contact info
  contactInfo: {
    phone: "045 - 571 39 52",
    email: "Patrickwolters@gmail.com",
    address: "Qeske\nAkerstraat 117\n6417 BM Heerlen"
  },
  
  // Social media (optioneel - pas aan naar eigen links)
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  }
};

async function seedHeaderFooter() {
  try {
    // Haal bestaande siteSettings op
    const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]`);
    
    if (existingSettings) {
      console.log('Bestaande siteSettings gevonden, updaten met header/footer data...');
      
      await client
        .patch(existingSettings._id)
        .set({
          headerNavigation: headerFooterData.headerNavigation,
          headerCTA: headerFooterData.headerCTA,
          footerDescription: headerFooterData.footerDescription,
          footerLinks: headerFooterData.footerLinks,
          copyrightText: headerFooterData.copyrightText,
          contactInfo: headerFooterData.contactInfo,
          socialLinks: headerFooterData.socialLinks,
        })
        .commit();
      
      console.log('✅ Header en footer data succesvol toegevoegd aan bestaande siteSettings!');
    } else {
      console.log('Geen bestaande siteSettings gevonden, nieuwe aanmaken...');
      
      await client.create({
        ...headerFooterData,
        _id: 'siteSettings'
      });
      
      console.log('✅ Nieuwe siteSettings met header en footer data aangemaakt!');
    }
    
    console.log('\n📝 Je kunt nu de header en footer content beheren in Sanity Studio!');
    console.log('   Open http://localhost:3333 (of je Sanity Studio URL)');
    console.log('   en ga naar "⚙️ Website Instellingen"');
    
  } catch (error) {
    console.error('❌ Fout bij het seeden van header/footer data:', error);
    throw error;
  }
}

seedHeaderFooter();


import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "⚙️ Website Instellingen",
  type: "document",
  groups: [
    { name: 'general', title: 'Algemeen', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Website Naam",
      description: "De naam van je website",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: "description",
      title: "Website Beschrijving",
      description: "Korte omschrijving van je website",
      type: "text",
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: "logo",
      title: "Website Logo",
      description: "Logo voor in de header (PNG met transparantie, minimaal 200px breed)",
      type: "image",
      options: {
        hotspot: true,
      },
      group: 'general',
    }),
    defineField({
      name: "grotiusLogo",
      title: "Grotius College Logo",
      description: "Logo van Grotius College voor in de footer (PNG met transparantie aanbevolen)",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt tekst',
          description: 'Beschrijving voor toegankelijkheid',
          validation: (Rule) => Rule.required(),
          initialValue: 'Grotius College logo'
        }
      ],
      group: 'general',
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Informatie (Footer)",
      description: "Deze info wordt getoond in de footer",
      type: "object",
      group: 'contact',
      fields: [
        { name: "phone", title: "Telefoon", type: "string" },
        { name: "email", title: "E-mail", type: "string" },
        { name: "address", title: "Adres", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      description: "Links naar social media accounts",
      type: "object",
      group: 'social',
      fields: [
        { name: "facebook", title: "Facebook URL", type: "url" },
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
      ],
    }),
    defineField({
      name: "defaultSEO",
      title: "Standaard SEO Instellingen",
      description: "Standaard instellingen voor alle pagina's (kunnen per pagina overschreven worden)",
      type: "object",
      group: 'seo',
      fields: [
        { name: "metaTitle", title: "Standaard Meta Titel", type: "string" },
        { name: "metaDescription", title: "Standaard Meta Beschrijving", type: "text", rows: 2 },
        { 
          name: "ogImage", 
          title: "Standaard Social Media Afbeelding", 
          description: "Afbeelding bij delen op social media (1200x630px)",
          type: "image" 
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      media: 'logo',
    },
  },
});

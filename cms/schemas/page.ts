import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "📄 Home Pagina",
  type: "document",
  groups: [
    { name: 'hero', title: 'Hero Sectie', default: true },
    { name: 'content', title: 'Inhoud' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Pagina Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: 'hero',
      initialValue: 'Home',
      readOnly: true,
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'hero',
      initialValue: { current: 'home' },
      readOnly: true,
    }),
    defineField({
      name: "hero",
      title: "Hero Sectie (Groot bovenaan)",
      description: "De grote banner bovenaan de homepage",
      type: "object",
      group: 'hero',
      fields: [
        { name: "title", title: "Hoofdtitel", description: "Grote titel bovenaan", type: "string" },
        { name: "subtitle", title: "Subtitel", description: "Kleinere tekst onder de hoofdtitel", type: "string" },
        { name: "description", title: "Beschrijving", description: "Uitgebreidere tekst", type: "text", rows: 4 },
        { 
          name: "image", 
          title: "Hero Achtergrond Afbeelding", 
          description: "Grote foto bovenaan de homepage (minimaal 2000px breed, landschap formaat)",
          type: "image", 
          options: { hotspot: true } 
        },
        { name: "ctaText", title: "Knop Tekst", description: "Tekst op de actie knop", type: "string" },
        { name: "ctaLink", title: "Knop Link", description: "Link waar de knop naartoe gaat", type: "string" },
      ],
    }),
    defineField({
      name: "content",
      title: "Extra Content Blokken",
      description: "Optioneel: Extra content onder de features",
      type: "array",
      group: 'content',
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt tekst",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Instellingen",
      description: "Voor zoekmachines en social media",
      type: "object",
      group: 'seo',
      fields: [
        { name: "metaTitle", title: "Meta Titel", description: "Titel in Google zoekresultaten", type: "string" },
        { name: "metaDescription", title: "Meta Beschrijving", description: "Beschrijving in Google", type: "text", rows: 2 },
        { 
          name: "ogImage", 
          title: "Social Media Afbeelding", 
          description: "Afbeelding bij delen op social media (1200x630px)",
          type: "image" 
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "hero.image",
    },
  },
});

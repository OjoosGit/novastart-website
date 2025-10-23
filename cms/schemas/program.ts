import { defineType, defineField } from "sanity";

export default defineType({
  name: "program",
  title: "🎓 Programma's / Trajecten",
  type: "document",
  groups: [
    { name: 'basic', title: 'Basis Info', default: true },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Programma Naam",
      description: "Bijv: Basistraject, Doorstroomtraject",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      description: "Voor de URL: /wat-we-bieden/[slug]",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: "intro",
      title: "Korte Introductie",
      description: "Korte beschrijving voor op de overzichtspagina",
      type: "text",
      rows: 3,
      group: 'basic',
    }),
    defineField({
      name: "image",
      title: "Programma Afbeelding",
      description: "Foto voor dit programma (landschap formaat, minimaal 800px breed)",
      type: "image",
      options: {
        hotspot: true,
      },
      group: 'basic',
      fields: [
        {
          name: "alt",
          title: "Alt tekst",
          description: "Beschrijf de afbeelding voor slechtzienden",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "doelgroep",
      title: "Doelgroep",
      description: "Voor wie is dit programma bedoeld?",
      type: "text",
      rows: 2,
      group: 'details',
    }),
    defineField({
      name: "duur",
      title: "Duur",
      description: "Bijv: 6-12 maanden",
      type: "string",
      group: 'details',
    }),
    defineField({
      name: "voordelen",
      title: "Voordelen",
      description: "Wat zijn de voordelen van dit programma?",
      type: "array",
      of: [{ type: "string" }],
      group: 'details',
    }),
    defineField({
      name: "activiteiten",
      title: "Activiteiten",
      description: "Wat ga je doen in dit programma?",
      type: "array",
      of: [{ type: "string" }],
      group: 'details',
    }),
    defineField({
      name: "description",
      title: "Uitgebreide Beschrijving (optioneel)",
      description: "Lange beschrijving voor de detailpagina",
      type: "array",
      of: [{ type: "block" }],
      group: 'details',
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      description: "Bepaalt de volgorde waarin programma's worden getoond (1, 2, 3...)",
      type: "number",
      validation: (Rule) => Rule.integer().positive(),
      group: 'basic',
    }),
  ],
  orderings: [
    {
      title: "Volgorde",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "doelgroep",
      media: "image",
    },
  },
});

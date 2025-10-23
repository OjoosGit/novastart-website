import { defineType, defineField } from "sanity";

export default defineType({
  name: "person",
  title: "👥 Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Functie",
      description: "Bijv: Docent, Mentor, Zorgcoördinator",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Profielfoto",
      description: "Portretfoto (vierkant formaat, minimaal 400x400px)",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt tekst",
          description: "Bijv: Foto van [naam]",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Biografie",
      description: "Korte beschrijving over deze persoon",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "email",
      title: "E-mail (optioneel)",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefoonnummer (optioneel)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      description: "Bepaalt de volgorde waarin teamleden worden getoond",
      type: "number",
      validation: (Rule) => Rule.integer().positive(),
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
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});

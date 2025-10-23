import { defineType, defineField } from "sanity";

export default defineType({
  name: "partner",
  title: "🤝 Partners",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      description: "Naam van de organisatie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Logo van de partner (transparante PNG bij voorkeur, minimaal 400px breed)",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt tekst",
          description: "Bijv: Logo van [organisatie naam]",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      description: "Wat is de rol van deze partner?",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "url",
      title: "Website URL (optioneel)",
      description: "Bijv: https://www.partner.nl",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      description: "Bepaalt de volgorde waarin partners worden getoond",
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
      media: "logo",
    },
  },
});

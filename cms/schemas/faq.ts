import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "❓ Veelgestelde Vragen (FAQ)",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Vraag",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Antwoord",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      description: "In welke categorie valt deze vraag?",
      type: "string",
      options: {
        list: [
          { title: "Algemeen", value: "algemeen" },
          { title: "Voor Ouders", value: "ouders" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      description: "Bepaalt de volgorde waarin vragen worden getoond",
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
    {
      title: "Categorie",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
});

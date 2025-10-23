import { defineType, defineField } from "sanity";

export default defineType({
  name: "qualityDoc",
  title: "📋 Kwaliteitsdocumenten",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Naam",
      description: "Bijv: Gedragscode, Veiligheidsprotocol",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Korte Beschrijving",
      description: "Waar gaat dit document over?",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "file",
      title: "PDF Bestand",
      description: "Upload het document als PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "url",
      title: "Of: Link naar extern document",
      description: "Gebruik dit als het document op een andere website staat",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      description: "Bepaalt de volgorde waarin documenten worden getoond",
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
      title: "title",
      subtitle: "summary",
    },
  },
});

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legalPage',
  title: '⚖️ Juridische Pagina\'s',
  type: 'document',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Pagina Titel',
      description: 'Bijv: Privacy, Cookies',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'Voor de URL: /[slug]',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Tekst',
      description: 'Korte introductie bovenaan',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Secties',
      description: 'De hoofdstukken van deze pagina',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Hoofdstuk Titel', description: 'Bijv: 1. Wie zijn wij?', type: 'string' },
            { name: 'content', title: 'Inhoud', type: 'text', rows: 10 },
            {
              name: 'list',
              title: 'Lijst Items (optioneel)',
              description: 'Voeg bullets toe na de tekst',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Laatst Bijgewerkt',
      description: 'Datum van laatste update',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Instellingen',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Meta Titel', type: 'string' },
        { name: 'metaDescription', title: 'Meta Beschrijving', type: 'text', rows: 3 },
        { name: 'noIndex', title: 'Niet indexeren (robots)', description: 'Verberg deze pagina voor zoekmachines', type: 'boolean', initialValue: true },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
})

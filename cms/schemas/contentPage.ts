import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contentPage',
  title: '📝 Content Pagina\'s',
  type: 'document',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Pagina Titel',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'Bijv: "waar-we-voor-staan" voor /waar-we-voor-staan',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'hero',
      title: 'Header Sectie',
      description: 'De grote header bovenaan de pagina',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', title: 'Header Titel', type: 'string' },
        { name: 'description', title: 'Header Beschrijving', type: 'text', rows: 2 },
        { 
          name: 'image', 
          title: 'Header Achtergrond Afbeelding', 
          description: 'Grote afbeelding bovenaan de pagina (minimaal 2000px breed)',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Content Secties',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Tekst Sectie',
          fields: [
            { name: 'heading', title: 'Titel', type: 'string' },
            { name: 'content', title: 'Inhoud', type: 'text', rows: 5 },
            { name: 'lead', title: 'Lead tekst (groter)', type: 'boolean', initialValue: false },
          ],
          preview: {
            select: { title: 'heading' },
            prepare({ title }) {
              return { title: title || 'Tekst sectie' }
            },
          },
        },
        {
          type: 'object',
          name: 'gridSection',
          title: 'Grid Sectie (kaarten)',
          fields: [
            { name: 'heading', title: 'Sectie titel', type: 'string' },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Titel', type: 'string' },
                    { name: 'content', title: 'Inhoud', type: 'text', rows: 3 },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'heading' },
            prepare({ title }) {
              return { title: title || 'Grid sectie' }
            },
          },
        },
        {
          type: 'object',
          name: 'processSteps',
          title: 'Proces Stappen',
          fields: [
            { name: 'heading', title: 'Sectie titel', type: 'string' },
            {
              name: 'steps',
              title: 'Stappen',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Stap titel', type: 'string' },
                    { name: 'description', title: 'Beschrijving', type: 'text', rows: 2 },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'heading' },
            prepare({ title }) {
              return { title: title || 'Proces stappen' }
            },
          },
        },
        {
          type: 'object',
          name: 'contactPersons',
          title: 'Contactpersonen',
          fields: [
            { name: 'heading', title: 'Sectie titel', type: 'string' },
            { name: 'intro', title: 'Intro tekst', type: 'text', rows: 2 },
            {
              name: 'persons',
              title: 'Personen',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Naam', type: 'string' },
                    { name: 'role', title: 'Functie', type: 'string' },
                    { name: 'phone', title: 'Telefoon', type: 'string' },
                    { name: 'email', title: 'E-mail', type: 'string' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'heading' },
            prepare({ title }) {
              return { title: title || 'Contactpersonen' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Instellingen',
      description: 'Voor zoekmachines en social media',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Meta Titel', description: 'Titel in Google zoekresultaten', type: 'string' },
        { name: 'metaDescription', title: 'Meta Beschrijving', description: 'Beschrijving in Google zoekresultaten', type: 'text', rows: 3 },
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


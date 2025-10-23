import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: '📞 Contact Informatie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Contact Informatie',
      hidden: true,
    }),
    defineField({
      name: 'organization',
      title: 'Organisatie Naam',
      description: 'Bijv: Grotius College',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'object',
      fields: [
        { name: 'street', title: 'Straat + huisnummer', type: 'string' },
        { name: 'postalCode', title: 'Postcode', type: 'string' },
        { name: 'city', title: 'Plaats', type: 'string' },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Telefoon',
      description: 'Bijv: 045 - 571 39 52',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Openingstijden',
      description: 'Gebruik Enter voor nieuwe regels',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps Embed URL',
      description: 'Ga naar Google Maps > Delen > Kaart insluiten > Kopieer de iframe src URL',
      type: 'url',
    }),
    defineField({
      name: 'publicTransport',
      title: 'Openbaar Vervoer Info',
      description: 'Hoe kom je er met OV?',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'carParking',
      title: 'Parkeer Info',
      description: 'Waar kan je parkeren?',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'organization',
      subtitle: 'address.city',
    },
  },
})

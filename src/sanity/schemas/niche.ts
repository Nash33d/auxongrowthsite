import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'niche',
  title: 'Niche / Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g. "building-2", "heart-pulse", "scale")',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'description' },
  },
})

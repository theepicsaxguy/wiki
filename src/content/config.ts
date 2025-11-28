import { defineCollection, z } from 'astro:content';

const wiki = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
    category: z.string().optional(),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = { wiki };

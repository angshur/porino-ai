import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Angshuman Rudra'),
    readTime: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

const learn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    readTime: z.string().optional(),
    audience: z.string().optional(),
  }),
});

export const collections = { blog, learn };

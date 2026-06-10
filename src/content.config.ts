import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    layout: z.string().optional(),
    title: z.string().nullable().optional().transform(v => v || 'Untitled'),
    date: z.coerce.date(),
    author: z.string().nullable().optional().transform(v => (v && v.trim()) ? v.trim() : 'eScience Center'),
    published: z.boolean().nullable().optional().transform(v => v !== false),
    source: z.string().nullable().optional().transform(v => v || 'medium'),
    source_url: z.string().nullable().optional(),
    tags: z.array(z.string()).nullable().optional().transform(v => v || ['uncategorized']),
  }),
});

export const collections = { posts };

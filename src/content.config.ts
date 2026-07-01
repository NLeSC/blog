import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const licenseSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    url: z.string().url().optional(),
    badgeUrl: z.string().url().optional(),
  }),
]).nullable().optional();

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/posts" }),
  schema: z.object({
    layout: z.string().optional(),
    title: z.string().nullable().optional().transform(v => v || 'Untitled'),
    date: z.coerce.date().optional(),
    author: z.string().nullable().optional().transform(v => (v && v.trim()) ? v.trim() : 'eScience Center'),
    published: z.boolean().nullable().optional().transform(v => v !== false),
    unlisted: z.boolean().nullable().optional().transform(v => v === true),
    source: z.string().nullable().optional().transform(v => v || 'medium'),
    source_url: z.string().nullable().optional(),
    license: licenseSchema,
    tags: z.array(z.string()).nullable().optional().transform(v => v || ['uncategorized']),
  }),
});

export const collections = { posts };

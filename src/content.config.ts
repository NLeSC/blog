import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { isCoverPath } from './lib/cover-path.mjs';

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
    subtitle: z.string().trim().min(1).optional(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    date: z.coerce.date().optional(),
    author: z.union([
      z.string().nullable().optional().transform(v => v?.trim() || 'eScience Center'),
      z.array(z.string().trim().min(1)).min(1),
    ]).transform(v => [...new Set(typeof v === 'string' ? [v] : v)]),
    published: z.boolean().nullable().optional().transform(v => v !== false),
    unlisted: z.boolean().nullable().optional().transform(v => v === true),
    featured: z.boolean().nullable().optional().transform(v => v === true),
    cover: z.string().refine(isCoverPath, 'Use a co-located ./image.png or shared /assets/image.png path').optional(),
    source: z.string().nullable().optional().transform(v => v || 'medium'),
    source_url: z.string().nullable().optional(),
    license: licenseSchema,
    tags: z.array(z.string()).nullable().optional().transform(v => v || ['uncategorized']),
  }),
});

export const collections = { posts };

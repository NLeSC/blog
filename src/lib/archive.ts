import type { CollectionEntry } from 'astro:content';
import { assetPath, sitePath } from './urls';

export type PostEntry = CollectionEntry<'posts'>;

const contentAssets = import.meta.glob<string | { default: string }>('/content/posts/**/*.{avif,gif,jpeg,jpg,png,svg,webp}', {
  eager: true,
  query: '?url',
});

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function postSlug(post: PostEntry): string {
  return post.id.replace(/\.md$/, '').replace(/\/index$/, '');
}

const POST_FILENAME_DATE = /^(\d{4}-\d{2}-\d{2})(?:\s+-\s+|---)/;

export function postDate(post: PostEntry): Date {
  const match = postSlug(post).match(POST_FILENAME_DATE);
  if (!match) throw new Error(`Post filename must start with YYYY-MM-DD: ${post.id}`);
  return new Date(`${match[1]}T00:00:00.000Z`);
}

export function comparePostsByDateDesc(a: PostEntry, b: PostEntry): number {
  return postDate(b).getTime() - postDate(a).getTime();
}

export function postUrl(post: PostEntry): string {
  return sitePath(`/posts/${postSlug(post)}`);
}

export function authorSlug(name: string): string {
  return slugify(name);
}

export function formatDate(date: Date, style: 'short' | 'long' = 'short'): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  });
}

export function getCoverImage(body: string): string | null {
  const imgs = [...body.matchAll(/!\[.*?\]\((\/assets\/[^)]+|\.\/[^)]+)\)/g)];
  if (imgs.length === 0) return null;
  if (imgs.length >= 2 && imgs[0].index !== undefined && imgs[0].index < 300) {
    return imgs[1][1];
  }
  return imgs[0][1];
}

export function coverImageUrl(post: PostEntry): string | null {
  const cover = getCoverImage(post.body || '');
  if (!cover) return null;
  if (cover.startsWith('/assets/')) return assetPath(cover.replace('/assets/', ''));

  const postDir = post.id.replace(/\.md$/, '').replace(/\/index$/, '');
  const filename = cover.replace(/^\.\//, '');
  const asset = contentAssets[`/content/posts/${postDir}/${filename}`]
    || Object.entries(contentAssets).find(([path]) => path.endsWith(`/${filename}`))?.[1];
  return typeof asset === 'string' ? asset : asset?.default || null;
}

export function getExcerpt(body: string, maxLen = 200): string {
  return body
    .replace(/!\[.*?\]\(\/assets\/[^)]+\)/g, '')
    .replace(/!\[.*?\]\(\.\/[^)]+\)/g, '')
    .replace(/\(https?:\/\/[^)]+\)/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/[_\*\[\]`]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, maxLen)
    .trim();
}

export function readTime(body: string): number {
  const words = body.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

export function visibleTags(tags: string[] = []): string[] {
  return tags.filter((tag) => tag && tag.toLowerCase() !== 'uncategorized');
}

export function isListedPost(post: PostEntry): boolean {
  return post.data.published !== false && post.data.unlisted !== true;
}

export function buildTopicIndex(posts: PostEntry[]) {
  const bySlug = new Map<string, { slug: string; name: string; count: number; latest: Date; posts: PostEntry[] }>();

  for (const post of posts) {
    for (const tag of visibleTags(post.data.tags || [])) {
      const slug = slugify(tag);
      if (!slug) continue;
      const date = postDate(post);
      const existing = bySlug.get(slug) || { slug, name: tag, count: 0, latest: date, posts: [] };
      existing.count += 1;
      existing.posts.push(post);
      if (date > existing.latest) existing.latest = date;
      bySlug.set(slug, existing);
    }
  }

  return [...bySlug.values()]
    .map((topic) => ({
      ...topic,
      posts: topic.posts.sort(comparePostsByDateDesc),
    }))
    .sort((a, b) => b.count - a.count || b.latest.getTime() - a.latest.getTime());
}

export function serializePost(post: PostEntry) {
  return {
    id: post.id,
    title: post.data.title,
    author: post.data.author,
    authorSlug: authorSlug(post.data.author),
    date: postDate(post).toISOString(),
    url: postUrl(post),
    tags: visibleTags(post.data.tags || []),
    excerpt: getExcerpt(post.body || '', 220),
    cover: coverImageUrl(post),
    readingMinutes: readTime(post.body || ''),
    source: post.data.source,
    sourceUrl: post.data.source_url || null,
  };
}

import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export function legacyRedirectPath(post: PostEntry): string | null {
  const sourceUrl = post.data.source_url;
  if (!sourceUrl) return null;

  let url: URL;
  try {
    url = new URL(sourceUrl);
  } catch {
    return null;
  }

  const path = url.pathname.replace(/^\/+|\/+$/g, '');
  if (!path) return null;

  return path;
}

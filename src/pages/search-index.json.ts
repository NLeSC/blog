import { getCollection } from 'astro:content';
import { comparePostsByDateDesc, isListedPost, postDate, postSlug } from '../lib/archive';
import { sitePath } from '../lib/urls';

export async function GET() {
  const posts = (await getCollection('posts'))
    .filter(isListedPost)
    .sort(comparePostsByDateDesc)
    .map((post) => ({
      title: post.data.title,
      author: post.data.author,
      date: postDate(post).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      tags: post.data.tags?.filter((tag: string) => tag !== 'uncategorized') || [],
      url: sitePath(`/posts/${postSlug(post)}`),
      excerpt: (post.body || '')
        .replace(/!\[.*?\]\([^)]+\)/g, '')
        .replace(/\(https?:\/\/[^)]+\)/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/[_*\[\]`>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 260),
    }));

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

import { getCollection } from 'astro:content';
import { sitePath } from '../lib/urls';

export async function GET() {
  const posts = (await getCollection('posts', ({ data }) => data.published !== false))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((post) => ({
      title: post.data.title,
      author: post.data.author,
      date: post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      tags: post.data.tags?.filter((tag: string) => tag !== 'uncategorized') || [],
      url: sitePath(`/posts/${post.id.replace(/\.md$/, '')}`),
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

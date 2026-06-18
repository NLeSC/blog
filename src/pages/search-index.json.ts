import { getCollection } from 'astro:content';
import { comparePostsByDateDesc, formatDate, isListedPost, postDate, postUrl } from '../lib/archive';

export async function GET() {
  const posts = (await getCollection('posts'))
    .filter(isListedPost)
    .sort((a, b) => comparePostsByDateDesc(a, b))
    .map((post) => ({
      title: post.data.title,
      author: post.data.author,
      date: formatDate(postDate(post)),
      tags: post.data.tags?.filter((tag: string) => tag !== 'uncategorized') || [],
      url: postUrl(post),
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

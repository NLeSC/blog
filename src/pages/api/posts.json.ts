import { getCollection } from 'astro:content';
import { isListedPost, serializePost } from '../../lib/archive';

export async function GET() {
  const posts = (await getCollection('posts')).filter(isListedPost);
  const data = posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map(serializePost);

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

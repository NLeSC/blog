import { getCollection } from 'astro:content';
import { buildTopicIndex, isListedPost, serializePost } from '../../lib/archive';
import { sitePath } from '../../lib/urls';

export async function GET() {
  const posts = (await getCollection('posts')).filter(isListedPost);
  const data = buildTopicIndex(posts).map((topic) => ({
    name: topic.name,
    slug: topic.slug,
    url: sitePath(`/topics/${topic.slug}`),
    postCount: topic.count,
    latestPostDate: topic.latest.toISOString(),
    posts: topic.posts.map(serializePost),
  }));

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

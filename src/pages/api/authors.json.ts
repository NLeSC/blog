import { getCollection } from 'astro:content';
import { authorSlug, buildTopicIndex, serializePost } from '../../lib/archive';
import { getAuthorInfo } from '../../lib/authors';
import { sitePath } from '../../lib/urls';

export async function GET() {
  const posts = await getCollection('posts', ({ data }) => data.published !== false);
  const byAuthor = new Map<string, typeof posts>();

  for (const post of posts) {
    const list = byAuthor.get(post.data.author) || [];
    list.push(post);
    byAuthor.set(post.data.author, list);
  }

  const data = [...byAuthor.entries()]
    .map(([name, authorPosts]) => {
      const sorted = authorPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
      return {
        name,
        slug: authorSlug(name),
        url: sitePath(`/authors/${authorSlug(name)}`),
        bio: getAuthorInfo(name)?.bio || null,
        postCount: sorted.length,
        latestPostDate: sorted[0]?.data.date.toISOString() || null,
        topics: buildTopicIndex(sorted).slice(0, 10).map((topic) => ({
          name: topic.name,
          slug: topic.slug,
          count: topic.count,
          url: sitePath(`/topics/${topic.slug}`),
        })),
        posts: sorted.map(serializePost),
      };
    })
    .sort((a, b) => b.postCount - a.postCount || a.name.localeCompare(b.name));

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

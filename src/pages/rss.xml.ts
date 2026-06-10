import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts', ({ data }) => data.published !== false);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'eScience Center Blog',
    description: 'Research software engineering, data science, and digital scholarship — by the Netherlands eScience Center',
    site: 'https://macbook-air-3.tail33436f.ts.net',
    items: posts.map(post => {
      const slug = post.id.replace(/\.md$/, '');
      // Get first paragraph as description
      const body = post.body || '';
      const excerpt = body
        .replace(/!\[.*?\]\(\/assets\/[^)]+\)/g, '')
        .replace(/\(https?:\/\/[^)]+\)/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/[*_`\[\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 280);
      return {
        title: post.data.title,
        description: excerpt + '...',
        link: `/posts/${slug}`,
        pubDate: post.data.date,
        author: post.data.author,
      };
    }),
    customData: `<language>en</language>`,
  });
}

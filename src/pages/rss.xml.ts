import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { comparePostsByDateDesc, isListedPost, postDate, postSlug } from '../lib/archive';
import { sitePath } from '../lib/urls';

export async function GET() {
  const posts = (await getCollection('posts')).filter(isListedPost);
  posts.sort(comparePostsByDateDesc);

  return rss({
    title: 'eScience Center Blog',
    description: 'Research software engineering, data science, and digital scholarship — by the Netherlands eScience Center',
    site: 'https://blog2.esciencecenter.nl',
    stylesheet: '/rss.xsl',
    items: posts.map(post => {
      const slug = postSlug(post);
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
        link: sitePath(`/posts/${slug}`),
        pubDate: postDate(post),
        author: post.data.author,
      };
    }),
    customData: `<language>en</language>`,
  });
}

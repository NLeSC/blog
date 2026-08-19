import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import { comparePostsByDateDesc, coverImageUrl, isListedPost, postDate, postSlug } from '../lib/archive';
import { sitePath } from '../lib/urls';

const site = 'https://blog.esciencecenter.nl';

function absoluteUrls(html: string, postUrl: string): string {
  return html.replace(/\b(href|src)="(?![a-z][a-z0-9+.-]*:|\/\/|#)([^"]+)"/gi, (_, attribute, url) =>
    `${attribute}="${new URL(url, postUrl).href}"`
  );
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[character] || character);
}

export async function GET() {
  const posts = (await getCollection('posts')).filter(isListedPost);
  posts.sort(comparePostsByDateDesc);
  const container = await AstroContainer.create();
  const items = await Promise.all(posts.map(async post => {
    const slug = postSlug(post);
    const link = new URL(sitePath(`/posts/${slug}`), site).href;
    const { Content } = await render(post);
    const content = absoluteUrls(await container.renderToString(Content), link);
    const cover = coverImageUrl(post);

    return {
      title: post.data.title,
      description: content,
      content,
      link,
      pubDate: postDate(post),
      author: post.data.author,
      customData: cover
        ? `<media:content url="${escapeXml(new URL(cover, site).href)}" medium="image" />`
        : undefined,
    };
  }));

  return rss({
    title: 'eScience Center Blog',
    description: 'Research software engineering, data science, and digital scholarship — by the Netherlands eScience Center',
    site,
    items,
    xmlns: { media: 'http://search.yahoo.com/mrss/' },
    customData: `<language>en</language>`,
  });
}

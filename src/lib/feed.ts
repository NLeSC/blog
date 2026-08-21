import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import { comparePostsByDateDesc, coverImageUrl, isListedPost, postDate, postSlug } from './archive';
import { sitePath } from './urls';

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

// Builds the RSS document. Served from two routes — /rss.xml (canonical) and
// /feed (the legacy Medium-era URL our existing subscribers still poll).
// GitHub Pages cannot emit real HTTP redirects, and feed readers ignore the
// meta-refresh shim Astro falls back to, so /feed must carry the feed itself.
export async function buildFeed(): Promise<Response> {
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
    xmlns: { atom: 'http://www.w3.org/2005/Atom', media: 'http://search.yahoo.com/mrss/' },
    customData: [
      `<language>en</language>`,
      // Tells well-behaved aggregators which URL is canonical, so readers that
      // honour rel="self" can migrate /feed subscribers to /rss.xml on their own.
      `<atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />`,
    ].join(''),
  });
}

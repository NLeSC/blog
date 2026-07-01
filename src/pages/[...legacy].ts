import { getCollection } from 'astro:content';
import { postSlug } from '../lib/archive';
import { sitePath } from '../lib/urls';

export async function getStaticPaths() {
  const posts = await getCollection('posts');

  return posts.flatMap((post) => {
    if (!post.data.source_url) return [];

    let path;
    try {
      path = new URL(post.data.source_url).pathname.replace(/^\/+|\/+$/g, '');
    } catch {
      return [];
    }

    return path ? [{ params: { legacy: path }, props: { slug: postSlug(post) } }] : [];
  });
}

export function GET({ props }: { props: { slug: string } }) {
  return new Response(null, {
    status: 301,
    headers: { Location: sitePath(`/posts/${props.slug}`) },
  });
}

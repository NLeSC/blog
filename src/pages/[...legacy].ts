import { sitePath } from '../lib/urls';
import redirects from '../legacy-redirects.json';

export function getStaticPaths() {
  return Object.entries(redirects).map(([source, target]) => ({
    params: { legacy: new URL(source).pathname.replace(/^\/+|\/+$/g, '') },
    props: { target },
  }));
}

export function GET({ props }: { props: { target: string } }) {
  return new Response(null, {
    status: 301,
    headers: { Location: encodeURI(sitePath(props.target)) },
  });
}

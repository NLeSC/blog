import { buildFeed } from '../lib/feed';

// Legacy Medium-era feed URL. Serves the feed verbatim rather than redirecting:
// see src/lib/feed.ts for why a redirect cannot work on GitHub Pages.
export const GET = buildFeed;

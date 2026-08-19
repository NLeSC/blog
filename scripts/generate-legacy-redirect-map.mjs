#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative } from 'node:path';

const root = process.cwd();
const postsDir = join(root, 'content/posts');
const output = join(root, 'src/legacy-redirects.json');
const mediumHost = 'https://blog.esciencecenter.nl';

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : path;
  }))).flat();
}

function postSlug(file) {
  const path = relative(postsDir, file).replaceAll('\\', '/');
  return path.replace(/\.md$/, '').replace(/\/index$/, '');
}

function field(frontmatter, name) {
  return frontmatter.match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
}

function tags(frontmatter) {
  const block = frontmatter.match(/^tags:\s*\n((?:\s+-\s+.*\n?)*)/m)?.[1] || '';
  return [...block.matchAll(/^\s+-\s+["']?(.+?)["']?\s*$/gm)].map((match) => match[1]);
}

function similarity(a, b) {
  const left = new Set(slugify(a).split('-').filter((word) => word.length > 2));
  const right = new Set(slugify(b).split('-').filter((word) => word.length > 2));
  const overlap = [...left].filter((word) => right.has(word)).length;
  return overlap / Math.max(left.size, right.size, 1);
}

function containment(a, b) {
  const left = new Set(slugify(a).split('-').filter((word) => word.length > 2));
  const right = new Set(slugify(b).split('-').filter((word) => word.length > 2));
  const overlap = [...left].filter((word) => right.has(word)).length;
  return overlap / Math.max(Math.min(left.size, right.size), 1);
}

function urlsFromXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} fetching ${url}`);
  return response.text();
}

const files = (await walk(postsDir)).filter((file) => file.endsWith('.md'));
const posts = await Promise.all(files.map(async (file) => {
  const text = await readFile(file, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)?.[1] || '';
  const slug = postSlug(file);
  return {
    date: slug.slice(0, 10),
    slug,
    title: field(frontmatter, 'title') || basename(dirname(file)),
    sourceUrl: field(frontmatter, 'source_url'),
    tags: tags(frontmatter),
    target: `/posts/${slug.replaceAll(' ', '-')}`,
  };
}));

const redirects = new Map();
const add = (source, target) => {
  target = target.replaceAll(' ', '-');
  const url = new URL(source, mediumHost);
  url.search = '';
  url.hash = '';
  const canonical = `${mediumHost}${url.pathname.replace(/\/$/, '')}`;
  const existing = redirects.get(canonical);
  if (existing && existing !== target) throw new Error(`${canonical} maps to both ${existing} and ${target}`);
  redirects.set(canonical, target);
};

for (const post of posts) {
  if (post.sourceUrl) add(post.sourceUrl, post.target);
}

// Older publication posts disappeared from Medium's current publication sitemap.
// These canonical paths were recovered from Medium's global daily post sitemaps.
const historicalPosts = [
  ['2017-02-02', 'breaking-jargon-barriers-at-talking-escience-2017-1eb68a9506eb'],
  ['2017-02-03', 'easier-docker-in-python-3993cb12e906'],
  ['2017-02-06', 'what-happened-during-the-historic-newspapers-as-big-data-congress-1cc557b46ddf'],
  ['2017-02-06', 'travis-caching-and-incremental-builds-6518b89ee889'],
  ['2017-02-06', 'what-games-can-teach-you-about-science-41c00f437e0'],
  ['2017-02-09', 'first-light-again-shiny-new-receivers-for-the-westerbork-telescope-15dc4636af28'],
  ['2017-02-21', 'reaching-for-the-sky-wishes-for-the-european-open-science-cloud-b871d2b5b5b5'],
  ['2017-02-28', 'so-i-wanted-to-be-a-research-software-engineer-3cf3c9272350'],
  ['2017-03-02', 'five-reasons-why-the-escience-center-blog-helps-science-d0dfaf1f27f4'],
  ['2017-03-13', 'reproducible-science-the-common-workflow-language-6437889b33b4'],
  ['2017-03-20', 'mcfly-time-series-classification-made-easy-e47de8d29838'],
  ['2017-04-03', 'how-can-network-analysis-lead-to-a-new-way-of-studying-court-decisions-686ccf4d46aa'],
  ['2017-05-23', 'a-license-to-science-cd8030a4a145'],
  ['2017-07-03', 'binge-watching-science-on-youtube-b9bd2ae8de1c'],
  ['2017-07-17', 'understanding-cosmic-explosions-8d2297cc3db3', '/posts/2017-07-17 - an-ambition-for-the-global-astronomical-community'],
  ['2017-08-07', 'reading-news-visually-6e02ea9468e'],
  ['2017-08-23', 'predicting-temperatures-in-your-street-6f0f0107c130'],
  ['2017-09-11', '10-ways-to-keep-your-successful-scientific-software-alive-61ac81f36a87'],
  ['2017-10-05', 'free-as-in-free-market-e1fce8b7e655'],
  ['2017-10-17', 'demagification-of-python-git-and-shell-5e31282a7ec4'],
  ['2017-10-18', 'teaching-machines-to-recognize-cancer-420da40f547d'],
  ['2017-12-18', 'writing-testable-gpu-code-23bbda3a5d62'],
  ['2017-12-20', 'introducing-nl-rse-98431969e2b8'],
  ['2017-12-20', 'digital-technologies-to-analyze-eyewitness-accounts-of-mass-violence-dddfc6fd3866'],
  ['2017-12-20', 'escience-is-about-being-bold-enough-to-ask-the-right-questions-at-the-right-time-af95819af803'],
  ['2018-01-16', 'https-blog-esciencecenter-nl-spot-visual-scientific-data-analytics-made-easy-62e03a895bae'],
  ['2018-03-20', 'active-learning-3902fde37184'],
  ['2018-04-13', 'research-and-software-perspectives-from-different-communities-4347b86b9d88'],
  ['2018-06-05', 'blobs-bumps-clouds-and-clusters-43227bbc5e14'],
  ['2018-06-12', 'flavour-your-linked-data-with-garlic-98bfbb358e06'],
  ['2018-07-12', 'what-we-can-learn-from-tomatoes-feeding-the-planet-with-improved-plant-breeding-5a31f6927f0f'],
  ['2018-08-01', 'jump-start-your-python-project-with-this-template-ef52e6c1a2dc'],
  ['2018-08-06', 'floating-point-butterfly-effect-62ebe004200f'],
  ['2018-08-14', 'why-use-an-fpga-instead-of-a-cpu-or-gpu-b234cd4f309c'],
  ['2018-09-03', 'irregular-data-in-pandas-using-c-88ce311cb9ef', '/posts/2018-09-03 - 50-times-faster-data-loading-for-pandas-no-problem'],
  ['2018-09-06', 'is-an-escience-research-engineer-simply-a-computer-scientist-in-disguise-f73f23741cb'],
  ['2018-09-17', 'want-to-organize-a-workshop-on-image-processing-5727d2347de2'],
  ['2018-09-26', 'analyzing-the-life-of-newspapers-with-machine-learning-48f1db892c57'],
  ['2018-09-27', 'why-more-scientists-should-attend-sigggraph-for-inspiration-d9d4cda7ebc5'],
  ['2018-11-29', 'nice-hydrographs-for-everyone-from-everyone-cd24340074b7'],
  ['2018-12-03', 'how-do-we-evaluate-research-software-to-meet-different-requirements-dc5901ae6ed6'],
  ['2018-12-11', 'the-research-software-directory-and-how-it-promotes-software-citation-4bd2137a6b8'],
  ['2018-12-12', 'testing-shell-commands-from-python-2a2ec87ebf71'],
  ['2018-12-17', 'using-agile-methods-in-scientific-software-development-51500e25ff8c', '/posts/2018-12-17 - using-agile-methods-in-scientific-software-development'],
  ['2018-12-20', 'portable-hpc-workflows-with-snakemake-and-xenon-e971e5127391'],
  ['2019-01-09', 'dealing-with-dragons-and-monsters-best-practices-for-handling-legacy-code-35bb9c939b7d'],
  ['2019-01-23', 'c-compile-time-exceptions-5443f5bf06fe'],
  ['2019-01-30', 'entangled-1744448f4b9f'],
  ['2019-02-05', 'fairifying-ewatercycle-8a61cf93b81c'],
  ['2019-03-04', 'superhuman-blog-post-859f0631ebd7'],
  ['2019-04-04', 'understanding-global-corporate-networks-84e66717f7ca'],
  ['2019-05-23', 'democracy-59ae33367f22'],
  ['2019-05-29', 'some-thoughts-about-developing-software-for-scientific-applications-3dceb6209471'],
  ['2019-06-03', 'breaking-the-barrier-fluid-simulations-parallel-in-time-bbc7d38a5d16'],
  ['2019-06-12', 'can-we-have-explainable-ai-or-are-we-entering-an-infinite-loop-ab99a43b087'],
  ['2019-06-14', 'big-questions-small-data-f5a8bed0bb16'],
  ['2019-06-20', 'turning-a-panda-into-a-cat-a23d9054c8c2'],
  ['2019-06-24', 'derse-2019-first-conference-for-research-software-engineers-in-germany-fa568e62ad00'],
  ['2019-07-02', 'why-all-youll-ever-need-is-markdown-dc604f0ab309'],
];

for (const [date, path, fixedTarget] of historicalPosts) {
  if (fixedTarget) {
    add(`/${path}`, fixedTarget);
    continue;
  }
  const candidates = posts
    .filter((post) => post.date === date)
    .map((post) => ({ post, score: containment(path.replace(/-[0-9a-f]{10,14}$/, ''), post.title) }))
    .sort((a, b) => b.score - a.score);
  if (!candidates[0] || candidates[0].score < 0.45) throw new Error(`No local match for ${path}`);
  add(`/${path}`, candidates[0].post.target);
}

const currentSitemap = process.env.MEDIUM_SITEMAP_FILE
  ? await readFile(process.env.MEDIUM_SITEMAP_FILE, 'utf8')
  : await fetchText(`${mediumHost}/sitemap/sitemap.xml`);
const currentUrls = urlsFromXml(currentSitemap);
const topics = new Set(posts.flatMap((post) => post.tags.map(slugify)).filter(Boolean));

for (const source of currentUrls) {
  const path = new URL(source).pathname.replace(/\/$/, '');
  if (!path) continue;
  if (path === '/about') {
    add(source, '/');
    continue;
  }
  if (path.startsWith('/tagged/')) {
    const topic = slugify(decodeURIComponent(path.slice('/tagged/'.length)));
    add(source, topics.has(topic) ? `/topics/${topic}` : '/topics');
    continue;
  }
  if (redirects.has(`${mediumHost}${path}`)) continue;

  const sourceId = path.match(/-([0-9a-f]{10,14})$/)?.[1];
  const idMatch = [...redirects].find(([url]) => url.endsWith(`-${sourceId}`));
  if (idMatch) {
    add(source, idMatch[1]);
    continue;
  }

  const sourceSlug = path.slice(1).replace(/-[0-9a-f]{10,14}$/, '');
  const ranked = posts
    .map((post) => ({ post, score: similarity(sourceSlug, post.title) }))
    .sort((a, b) => b.score - a.score);
  if (ranked[0]?.score >= 0.75) add(source, ranked[0].post.target);
}

// Known structural routes and post aliases absent from Medium's current sitemap.
add('/archive', '/');
add('/faster-python-dict-vs-slots-a08c7d5d4f4e', '/search');
add('/literate-programming-in-science-ed94dcc8f758', '/posts/2021-07-07 - literate-programming-in-science');
add('/build-a-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-iii-molecular-91891248ee34', '/posts/2023-01-31 - build-a-mass-spectrometry-analysis-pipeline-in-python-using-');

const unresolvedCurrentPosts = currentUrls.filter((source) => {
  const path = new URL(source).pathname.replace(/\/$/, '');
  return /-[0-9a-f]{10,14}$/.test(path) && !redirects.has(`${mediumHost}${path}`);
});
if (unresolvedCurrentPosts.length) {
  throw new Error(`Unmapped current Medium posts:\n${unresolvedCurrentPosts.join('\n')}`);
}

const sorted = Object.fromEntries([...redirects].sort(([a], [b]) => a.localeCompare(b)));
await writeFile(output, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`Wrote ${redirects.size} redirects to ${relative(root, output)}.`);

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

test('co-authored posts publish with linked profiles and appear in each author archive', { timeout: 240_000 }, () => {
  const scratch = mkdtempSync(join(tmpdir(), 'blog-authorship-'));
  const fixtureDirs = [];
  const suffix = scratch.split('-').at(-1).toLowerCase();
  const first = `Authorship First ${suffix}`;
  const second = `Authorship Second ${suffix}`;
  const slug = name => name.toLowerCase().replaceAll(' ', '-');
  const run = (args, cwd = root) => {
    const result = spawnSync('bun', args, { cwd, encoding: 'utf8', timeout: 210_000 });
    assert.equal(result.status, 0, result.error?.message || result.stdout + result.stderr);
  };
  const read = path => readFileSync(join(scratch, 'dist', path), 'utf8');
  const fixtures = [
    { title: `Coauthor journey ${suffix}`, authors: [first, second, first], flags: '' },
    { title: `Single author journey ${suffix}`, authors: [first], flags: '' },
    { title: `Unlisted author journey ${suffix}`, authors: [second], flags: 'unlisted: true\n' },
  ];

  try {
    for (const fixture of fixtures) {
      // Exercise the real authoring command, including repeated authors and YAML quoting.
      run([join(root, 'scripts/new-post.mjs'), fixture.title, '--date', '2099-01-01',
        ...fixture.authors.flatMap(name => ['--author', name])], scratch);
      const dir = `2099-01-01 - ${slug(fixture.title)}`;
      const generated = join(scratch, 'content/posts', dir);
      const file = join(generated, 'index.md');
      writeFileSync(file, readFileSync(file, 'utf8').replace('published: false', `published: true\n${fixture.flags}`));
      const destination = join(root, 'content/posts', dir);
      // Claim a new directory before cleanup can own it; never remove an existing post.
      mkdirSync(destination);
      fixtureDirs.push(destination);
      cpSync(generated, destination, { recursive: true, errorOnExist: true, force: false });
      fixture.url = `/posts/2099-01-01---${slug(fixture.title)}`;
    }

    run(['run', 'build', '--outDir', join(scratch, 'dist')]);
    const [shared, single, unlisted] = fixtures;
    const html = read(`${shared.url.slice(1)}/index.html`);
    const header = html.match(/<header\b[\s\S]*?<\/header>/g).find(value => value.includes(shared.title));
    for (const name of [first, second]) {
      assert.ok(header.includes(`href="/authors/${slug(name)}"`));
      assert.ok(header.includes(name));
      assert.ok(html.includes(`name="author" content="${name}"`));
      assert.ok(html.includes(`property="article:author" content="${name}"`));
      const archive = read(`authors/${slug(name)}/index.html`);
      assert.ok(archive.includes(shared.url));
      assert.ok(!archive.includes(unlisted.url));
    }
    const authors = JSON.parse(read('api/authors.json'));
    assert.equal(authors.find(author => author.name === first).postCount, 2);
    assert.equal(authors.find(author => author.name === second).postCount, 1);
    const posts = JSON.parse(read('api/posts.json'));
    assert.deepEqual(posts.find(post => post.url === shared.url).authors.map(author => author.name), [first, second]);
    assert.deepEqual(posts.find(post => post.url === single.url).authors.map(author => author.name), [first]);
    assert.ok(!posts.some(post => post.url === unlisted.url));
    const search = JSON.parse(read('search-index.json'));
    assert.equal(search.find(post => post.url === shared.url).author, `${first}, ${second}`);
    assert.ok(!search.some(post => post.url === unlisted.url));
    const feed = read('rss.xml');
    assert.ok(feed.includes(`<author>${first}, ${second}</author>`));
    assert.ok(!feed.includes(unlisted.url));
  } finally {
    for (const dir of fixtureDirs) rmSync(dir, { recursive: true, force: true });
    rmSync(scratch, { recursive: true, force: true });
  }
});

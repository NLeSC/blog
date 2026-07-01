#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';

const root = process.cwd();
const postsDir = join(root, 'content', 'posts');
const assetsDir = join(root, 'public', 'assets');
const dryRun = process.argv.includes('--dry-run');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function rel(path) {
  return relative(root, path);
}

function postDirFor(file) {
  return join(dirname(file), basename(file, '.md'));
}

const files = walk(postsDir)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => basename(file) !== 'index.md');

let changed = 0;
const missing = new Set();

for (const file of files) {
  const dir = postDirFor(file);
  const indexFile = join(dir, 'index.md');
  if (existsSync(dir)) throw new Error(`Target directory already exists: ${rel(dir)}`);

  const copied = new Set();
  let text = readFileSync(file, 'utf8');

  function localAsset(src) {
    const name = src.replace(/^\/assets\//, '');
    const from = join(assetsDir, name);
    const to = join(dir, basename(name));
    if (!existsSync(from)) {
      missing.add(src);
      return src;
    }
    copied.add(`${from}\0${to}`);
    return `./${basename(name)}`;
  }

  text = text
    .replace(/(!\[[^\]]*\]\()\/assets\/([^\s)]+)([^)]*\))/g, (_, prefix, name, suffix) => `${prefix}${localAsset(`/assets/${name}`)}${suffix}`)
    .replace(/(<img\b[^>]*\bsrc=["'])\/assets\/([^"']+)(["'][^>]*>)/g, (_, prefix, name, suffix) => `${prefix}${localAsset(`/assets/${name}`)}${suffix}`);

  console.log(`${dryRun ? 'Would migrate' : 'Migrating'} ${rel(file)} -> ${rel(indexFile)}`);
  if (!dryRun) {
    mkdirSync(dir, { recursive: true });
    for (const pair of copied) {
      const [from, to] = pair.split('\0');
      copyFileSync(from, to);
    }
    writeFileSync(indexFile, text);
    renameSync(file, `${file}.migrated`);
  }
  changed += 1;
}

if (missing.size) {
  console.error('\nMissing assets:');
  for (const src of missing) console.error(`  - ${src}`);
  process.exitCode = 1;
}

console.log(`${dryRun ? 'Would migrate' : 'Migrated'} ${changed} posts.`);
if (!dryRun) console.log('Original Markdown files were renamed to *.md.migrated; delete them after build verification.');

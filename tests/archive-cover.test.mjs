import assert from 'node:assert/strict';
import test from 'node:test';
import { getCoverImage } from '../src/lib/cover-image.mjs';

test('uses the first captioned HTML image for the homepage cover', () => {
  assert.equal(getCoverImage(`Introduction.
<figure>
  <img alt="A model" src="./phantom.jpeg" />
  <figcaption>A phantom model.</figcaption>
</figure>
![Second image](./second.png)`), './phantom.jpeg');
});

test('recognizes HTML images outside figures and shared assets', () => {
  assert.equal(getCoverImage(`<img alt='Shared' src='/assets/shared.png'>`), '/assets/shared.png');
});

test('uses source order when Markdown and HTML images are mixed', () => {
  assert.equal(getCoverImage(`${'Introduction. '.repeat(25)}\n![First](./first.png)\n<img src="./second.png" alt="Second">`), './first.png');
});

test('preserves the early Markdown image selection rule', () => {
  assert.equal(getCoverImage('![Intro](./intro.png)\n![Cover](./cover.png)'), './cover.png');
});

test('ignores commented HTML examples from the new-post template', () => {
  assert.equal(getCoverImage('<!-- <figure><img src="./example.png" alt="Example"></figure> -->\n<figure><img src="./real.png" alt="Real"></figure>'), './real.png');
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { isCoverPath } from '../src/lib/cover-path.mjs';

test('accepts co-located and shared cover images', () => {
  assert.equal(isCoverPath('./phantom.jpeg'), true);
  assert.equal(isCoverPath('./diagrams/model.webp'), true);
  assert.equal(isCoverPath('/assets/shared.png'), true);
});

test('rejects external, missing, and escaping paths', () => {
  for (const path of ['', 'image.png', '/posts/image.png', 'https://example.com/image.png',
    './../image.png', '/assets/../private.png', './image.txt', './nested\\image.png', './image#fragment.png']) {
    assert.equal(isCoverPath(path), false, path);
  }
});

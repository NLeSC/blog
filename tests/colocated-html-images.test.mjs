import assert from 'node:assert/strict';
import test from 'node:test';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { rehypeColocatedHtmlImages } from '../src/lib/rehype-colocated-html-images.mjs';

test('co-located HTML images use the same Astro asset pipeline as Markdown images', async () => {
  const processor = await createMarkdownProcessor({
    syntaxHighlight: false,
    rehypePlugins: [rehypeColocatedHtmlImages],
  });
  const { code, metadata } = await processor.render(`
<figure>
<img alt="MRI phantom" src="./phantom.jpeg" />
<figcaption>A phantom model.</figcaption>
</figure>

![Another model](./other.png)

<img src="/assets/shared.png" alt="Shared asset" />
`, { fileURL: new URL('../content/posts/example/index.md', import.meta.url) });

  assert.deepEqual(metadata.localImagePaths, ['./other.png', './phantom.jpeg']);
  assert.match(code, /<figure>\s*<img __ASTRO_IMAGE_=/);
  assert.match(code, /<figcaption>A phantom model\.<\/figcaption>\s*<\/figure>/);
  assert.match(code, /<img src="\/assets\/shared\.png" alt="Shared asset">/);
  assert.equal((code.match(/__ASTRO_IMAGE_=/g) ?? []).length, 2);
});

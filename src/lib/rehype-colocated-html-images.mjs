import rehypeRaw from 'rehype-raw';

// Astro only discovers Markdown image nodes. Parse raw HTML before its image
// transformer so relative <img> sources receive the same asset handling.
export function rehypeColocatedHtmlImages() {
  const parseRaw = rehypeRaw();

  return (tree, file) => {
    const parsed = parseRaw(tree, file);

    const paths = file.data.astro?.localImagePaths;
    if (!paths) return parsed;

    function visit(node) {
      if (node.type === 'element' && node.tagName === 'img') {
        const src = node.properties?.src;
        if (typeof src === 'string' && src.startsWith('./') && !paths.includes(src)) {
          paths.push(src);
        }
      }
      node.children?.forEach(visit);
    }

    visit(parsed);
    return parsed;
  };
}

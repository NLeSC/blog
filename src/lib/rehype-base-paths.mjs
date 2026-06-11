export function rehypeBasePaths(options = {}) {
  const base = String(options.base || '').replace(/\/$/, '');
  const prefixes = options.prefixes || ['/assets/', '/authors/', '/favicon.svg', '/header-banner.webp'];

  function withBase(value) {
    if (!base || typeof value !== 'string') return value;
    if (!value.startsWith('/') || value.startsWith(base + '/')) return value;
    if (!prefixes.some((prefix) => value === prefix || value.startsWith(prefix))) return value;
    return `${base}${value}`;
  }

  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.properties) {
      if (typeof node.properties.src === 'string') node.properties.src = withBase(node.properties.src);
      if (typeof node.properties.href === 'string') node.properties.href = withBase(node.properties.href);
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  }

  return (tree) => visit(tree);
}

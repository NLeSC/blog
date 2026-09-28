/** @param {string} value */
export function isCoverPath(value) {
  const prefix = value.startsWith('./') ? './' : value.startsWith('/assets/') ? '/assets/' : null;
  if (!prefix) return false;
  const path = value.slice(prefix.length);
  return /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(path)
    && !/[?#\x00-\x1f]/.test(path)
    && path.split('/').every((part) => part && part !== '.' && part !== '..' && !part.includes('\\'));
}

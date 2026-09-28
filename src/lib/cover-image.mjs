/** @param {string} body */
export function getCoverImage(body) {
  // Ignore example markup in comments (including the new-post template).
  const content = body.replace(/<!--[\s\S]*?-->/g, (comment) => ' '.repeat(comment.length));
  const imgs = [
    ...[...content.matchAll(/!\[.*?\]\((\/assets\/[^)]+|\.\/[^)]+)\)/g)]
      .map((match) => ({ index: match.index, src: match[1], markdown: true })),
    ...[...content.matchAll(/<img\b[^>]*>/gi)]
      .map((match) => {
        const src = match[0].match(/\bsrc\s*=\s*(["'])(\/assets\/[^"']+|\.\/[^"']+)\1/i)?.[2];
        return src ? { index: match.index, src, markdown: false } : null;
      })
      .filter(Boolean),
  ].sort((a, b) => a.index - b.index);
  if (imgs.length === 0) return null;
  if (imgs.length >= 2 && imgs[0].markdown && imgs[0].index < 300) {
    return imgs[1].src;
  }
  return imgs[0].src;
}

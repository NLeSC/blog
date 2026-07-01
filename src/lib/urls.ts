const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const repositoryUrl = 'https://github.com/nlesc-blogging/blog';

export function sitePath(path = '/'): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}` || normalized;
}

export function assetPath(filename: string): string {
  return sitePath(`/assets/${filename}`);
}

export function repositoryPath(path = ''): string {
  const normalized = path.replace(/^\/+/, '');
  return normalized ? `${repositoryUrl}/${encodeURI(normalized)}` : repositoryUrl;
}

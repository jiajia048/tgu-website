/**
 * Image URL helper.
 *
 * Site images live in public/images/ and are served from the same origin
 * (e.g. /images/contact_us.jpg). Keep this wrapper so call sites stay stable
 * if the asset host changes later.
 *
 * Optional: set NEXT_PUBLIC_OSS_BASE_URL to prefix paths with an OSS CDN.
 */
const OSS_BASE = process.env.NEXT_PUBLIC_OSS_BASE_URL ?? "";

export function img(path: string): string {
  if (!OSS_BASE) return path;
  if (!path.startsWith("/")) return `${OSS_BASE}/${path}`;
  return `${OSS_BASE}${path}`;
}

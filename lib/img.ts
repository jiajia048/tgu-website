/**
 * Image URL helper.
 *
 * All site images live on Aliyun OSS (see NEXT_PUBLIC_OSS_BASE_URL in .env.local).
 * Pass a path that starts with "/images/..." and this returns the full public URL.
 *
 * If NEXT_PUBLIC_OSS_BASE_URL is unset (e.g. offline dev before OSS upload),
 * we fall back to the original relative path so local /public/images/ still works.
 */
const OSS_BASE = process.env.NEXT_PUBLIC_OSS_BASE_URL ?? "";

export function img(path: string): string {
  if (!OSS_BASE) return path;
  if (!path.startsWith("/")) return `${OSS_BASE}/${path}`;
  return `${OSS_BASE}${path}`;
}

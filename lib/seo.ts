export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hidromontjovancic.rs";

export const brandName = "HIDRO MONT JOVANCIC";
export const brandNameWithDiacritics = "HIDRO MONT JOVANČIĆ";

export function absoluteUrl(pathOrUrl?: string | null): string {
  if (!pathOrUrl) return siteUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function plainText(value?: string | null): string {
  return (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateMeta(value: string, max = 155): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

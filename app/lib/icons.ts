import { iconsByCategory, type Icon } from 'ghicons'

/**
 * Display names for the registry's category slugs. The registry is the source of
 * truth for which categories exist; this only decides how they are spelled on
 * screen, and falls back to the slug so a new category shows up untitled rather
 * than not at all.
 */
export const CATEGORY_LABELS: Record<string, string> = {
  adinkra: 'Adinkra',
  general: 'General',
  national: 'National',
}

export const categoryLabel = (category: string) => CATEGORY_LABELS[category] ?? category

export const iconHref = (slug: string) => `/icons/${slug}/`

/**
 * Other icons from the same category, taken as the icons that surround this one
 * in registry order and wrapping around at the end.
 *
 * Neighbours rather than `slice(0, n)` so that every icon in a category gets
 * linked from somewhere — otherwise the first six Adinkra icons would collect
 * every inbound link and the rest would be reachable only from the sitemap.
 */
export function relatedTo(icon: Icon, limit = 6): Icon[] {
  const siblings = iconsByCategory(icon.category)
  const at = siblings.findIndex((i) => i.slug === icon.slug)
  if (at === -1) return []

  const wanted = Math.min(limit, siblings.length - 1)
  const out: Icon[] = []
  for (let step = 1; out.length < wanted; step++) {
    out.push(siblings[(at + step) % siblings.length])
  }
  return out
}

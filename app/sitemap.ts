import type { MetadataRoute } from 'next'
import { icons } from 'ghicons'
import { SITE_URL } from './lib/site'

// These are generated at build time and shipped as plain files. `output: export`
// has no server to run them on request, so they must be declared static.
export const dynamic = 'force-static'

/**
 * Every page, including one entry per icon.
 *
 * The icon pages are the reason this file exists: the gallery selects an icon
 * client-side, so a crawler that only follows links from `/icons/` would never
 * reach the 106 individual pages. Listed here, they are all discoverable, and a
 * new icon in the registry adds itself to the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/icons/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/docs/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about/`, changeFrequency: 'yearly', priority: 0.5 },
  ]

  return [
    ...pages,
    ...icons.map((icon) => ({
      url: `${SITE_URL}/icons/${icon.slug}/`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}

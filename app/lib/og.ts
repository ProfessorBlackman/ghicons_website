import type { Metadata } from 'next'
import { SITE_NAME, SITE_TAGLINE } from './site'

/**
 * Shared look and wiring for the Open Graph cards.
 *
 * The cards are served from `/og/**\/image.png` route handlers rather than from
 * Next's `opengraph-image` convention, which writes an extensionless file. A
 * plain static host has no way to label that as a PNG, and a card served as
 * application/octet-stream is a card no social scraper will show.
 */
export const OG_SIZE = { width: 1200, height: 630 }

/** Matches the site's dark theme, so a shared link looks like the page it opens. */
export const OG_INK = '#e5e7eb'
export const OG_BACKDROP = '#0b1020'

export const OG_SITE_IMAGE = '/og/image.png'
export const ogImageFor = (slug: string) => `/og/${slug}/image.png`

/**
 * A page's complete Open Graph block.
 *
 * A page **replaces** the layout's `openGraph` rather than merging into it, so a
 * page that sets only `url` silently loses the site name and the card image.
 * Building the whole object here keeps that trap in one place. Title and
 * description are deliberately absent: Next fills them from the page's own
 * resolved title and description.
 */
export function openGraphFor({
  url,
  type = 'website',
  image = OG_SITE_IMAGE,
  imageAlt = SITE_TAGLINE,
}: {
  url: string
  type?: 'website' | 'article'
  image?: string
  imageAlt?: string
}): Metadata['openGraph'] {
  return {
    type,
    siteName: SITE_NAME,
    url,
    images: [{ url: image, ...OG_SIZE, alt: imageAlt }],
  }
}

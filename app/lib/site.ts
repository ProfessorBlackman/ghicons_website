/**
 * The canonical origin, needed in absolute form by the sitemap, robots.txt and
 * the Open Graph tags — relative URLs are not valid in any of them.
 *
 * It is a constant rather than an environment variable because the site is a
 * static export with exactly one home: `public/CNAME` pins the domain, and a
 * build that guessed a different origin would silently emit the wrong canonical
 * URLs.
 */
export const SITE_URL = 'https://ghicons.methuselah.site'

export const SITE_NAME = 'ghicons'

export const SITE_TAGLINE = 'ghicons — Ghanaian symbols for software'

export const SITE_DESCRIPTION =
  'Ghanaian symbols gathered in one place and standardised — Adinkra, currency, national emblems and more. For React, for any other framework, or as plain SVG.'

export const REPO_URL = 'https://github.com/ProfessorBlackman/ghicons'

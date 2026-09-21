import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

// These are generated at build time and shipped as plain files. `output: export`
// has no server to run them on request, so they must be declared static.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

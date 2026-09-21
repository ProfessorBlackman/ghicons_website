import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getIcon, icons, registry as meta } from 'ghicons'
import { categoryLabel, relatedTo } from '../../lib/icons'
import { ogImageFor, openGraphFor } from '../../lib/og'
import { SITE_NAME } from '../../lib/site'
import { readSvgSource } from '../../lib/svg-source'
import IconDetail from './icon-detail'

/**
 * One page per icon, generated from the registry. Adding an icon to the library
 * grows the site a page for it on the next dependency bump — there is no list of
 * pages to maintain here.
 */
export function generateStaticParams() {
  return icons.map((icon) => ({ slug: icon.slug }))
}

// The registry is the complete set of icons, so anything else is a 404 rather
// than something to render on demand. Required for `output: "export"`.
export const dynamicParams = false

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const icon = getIcon(slug)
  if (!icon) return {}

  const label = categoryLabel(icon.category)
  const description = icon.meaning
    ? `${icon.name} — ${icon.meaning}. Preview the symbol at any size and colour, copy the JSX, download the SVG or use the CDN URL.`
    : `${icon.name}, one of the ${label} symbols in the GHIcons collection. Preview it at any size and colour, copy the JSX, download the SVG or use the CDN URL.`

  return {
    title: icon.name,
    description,
    keywords: [icon.name, icon.slug, label, 'ghana', 'ghanaian symbol', 'svg icon', ...(icon.keywords ?? []), ...(icon.aliases ?? [])],
    alternates: { canonical: `/icons/${icon.slug}/` },
    openGraph: openGraphFor({
      url: `/icons/${icon.slug}/`,
      type: 'article',
      image: ogImageFor(icon.slug),
      imageAlt: `${icon.name} — a Ghanaian symbol from ${SITE_NAME}`,
    }),
  }
}

export default async function IconPage({ params }: PageProps) {
  const { slug } = await params
  const icon = getIcon(slug)

  // Unreachable while `generateStaticParams` comes from the registry, but it is
  // what makes the type non-optional below, and it is the correct behaviour if
  // the two ever diverge.
  if (!icon) notFound()

  return (
    <IconDetail
      icon={icon}
      svg={readSvgSource(icon.file)}
      version={meta.version}
      related={relatedTo(icon)}
    />
  )
}

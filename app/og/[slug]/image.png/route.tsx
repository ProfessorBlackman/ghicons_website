import { ImageResponse } from 'next/og'
import { getIcon, icons } from 'ghicons'
import { categoryLabel } from '../../../lib/icons'
import { OG_BACKDROP, OG_INK, OG_SIZE } from '../../../lib/og'
import { SITE_URL } from '../../../lib/site'
import { svgDataUri } from '../../../lib/svg-source'

// One card per icon, so a shared link shows the symbol itself rather than the
// generic site card. Prerendered at build time, like the pages.
export const dynamic = 'force-static'

export function generateStaticParams() {
  return icons.map((icon) => ({ slug: icon.slug }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const icon = getIcon(slug)
  if (!icon) return new Response('Not found', { status: 404 })

  const domain = SITE_URL.replace('https://', '')

  // Icon names are PascalCase, so there is no space for the renderer to wrap on
  // and a long one runs off the card. 648px is the text column between the
  // symbol and the right edge; 0.55em is a fair average glyph width for this
  // face. OnyankoponAdomNtiBiribiaraBeyeYie is the name that forces the floor.
  const titleSize = Math.min(84, Math.max(30, Math.round(648 / (icon.name.length * 0.55))))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 72,
          background: OG_BACKDROP,
          color: OG_INK,
          padding: '72px 80px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUri(icon.file, OG_INK)} width={320} height={320} alt="" />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 28, letterSpacing: 2, opacity: 0.65 }}>
            {categoryLabel(icon.category).toUpperCase()}
          </div>
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, marginTop: 12 }}>
            {icon.name}
          </div>
          {icon.meaning ? (
            <div style={{ fontSize: 32, opacity: 0.8, marginTop: 20, lineHeight: 1.35 }}>
              {icon.meaning.slice(0, 120)}
            </div>
          ) : null}
          <div style={{ fontSize: 26, opacity: 0.6, marginTop: 28 }}>
            {`${domain}/icons/${icon.slug}`}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}

import { ImageResponse } from 'next/og'
import { getIcon, icons } from 'ghicons'
import { OG_BACKDROP, OG_INK, OG_SIZE } from '../../lib/og'
import { SITE_URL } from '../../lib/site'
import { svgDataUri } from '../../lib/svg-source'

// A GET handler with no request-time input, so it is prerendered into the export
// like any page. Nothing here runs on a server.
export const dynamic = 'force-static'

// Recognisable symbols taken from the collection itself rather than a separate
// hand-made graphic, so the card cannot show an icon the library no longer has.
const SHOWCASE = ['gye-nyame', 'sankofa', 'adinkrahene', 'dwennimmen', 'nkyinkyim']

export async function GET() {
  const symbols = SHOWCASE.map((slug) => getIcon(slug)).filter((icon) => icon !== undefined)
  const domain = SITE_URL.replace('https://', '')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: OG_BACKDROP,
          color: OG_INK,
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, letterSpacing: 2, opacity: 0.7 }}>GHICONS</div>
          <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.1, marginTop: 16 }}>
            Ghanaian symbols for software
          </div>
          <div style={{ fontSize: 34, opacity: 0.75, marginTop: 20 }}>
            {`${icons.length} symbols · plain SVG, typed React, one registry · MIT`}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 36 }}>
            {symbols.map((icon) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={icon.slug}
                src={svgDataUri(icon.file, OG_INK)}
                width={104}
                height={104}
                alt=""
              />
            ))}
          </div>
          <div style={{ fontSize: 28, opacity: 0.6 }}>{domain}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}

'use client'

import * as React from 'react'
import Link from 'next/link'
import * as Icons from '@ghicons/react'
import type { Icon } from 'ghicons'
import NavBar from '../../components/nav-bar'
import { useTheme } from '../../components/theme-provider'
import { categoryLabel, iconHref } from '../../lib/icons'
import { REPO_URL } from '../../lib/site'
import '../icons.css'
import './icon-detail.css'

type IconComponent = React.ComponentType<{
  size?: number | string
  color?: string
  className?: string
  style?: React.CSSProperties
}>

const componentsByName = Icons as unknown as Record<string, IconComponent | undefined>

type Props = {
  icon: Icon
  /** The canonical SVG markup, inlined at build time by the page. */
  svg: string
  /** The `ghicons` version this page was built against, for the pinned CDN URL. */
  version: string
  related: Icon[]
}

/**
 * Renders the icon itself. The React component is preferred; where the page also
 * carries the raw markup, that is the fallback, so an icon present in the
 * registry but missing a generated component still renders instead of leaving a
 * hole. The markup is this site's own build-time content, not user input.
 */
function Symbol({
  name,
  size,
  color,
  svg,
}: {
  name: string
  size: number
  color: string
  svg?: string
}) {
  const Component = componentsByName[name]
  if (Component) return <Component size={size} color={color} />
  if (!svg) return null

  return (
    <span
      className="rawSymbol"
      style={{ width: size, height: size, color }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default function IconDetail({ icon, svg, version, related }: Props) {
  const { theme } = useTheme()
  const [size, setSize] = React.useState(96)
  // Null means "follow the theme", the same convention the gallery uses: a
  // near-black default is invisible against the dark background.
  const [customColor, setCustomColor] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState<string | null>(null)

  const themeColor = theme === 'dark' ? '#E5E7EB' : '#111827'
  const color = customColor ?? themeColor

  const cdnUrl = `https://unpkg.com/ghicons@${version}/${icon.file}`
  const jsx = `<${icon.name} size={${size}} color="${color}" />`
  const importLine = `import { ${icon.name} } from '@ghicons/react'`
  const htmlSnippet = `<img src="${cdnUrl}" alt="${icon.name}" width="${size}" height="${size}">`

  const copy = async (text: string, which: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(which)
      setTimeout(() => setCopied(null), 1600)
    } catch {
      // clipboard may be blocked; not worth surfacing
    }
  }

  // Downloaded from the inlined markup rather than fetched from the CDN, so it
  // works offline and cannot be broken by a cross-origin policy change.
  const download = () => {
    const url = URL.createObjectURL(new Blob([`${svg}\n`], { type: 'image/svg+xml' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${icon.name}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  const label = (which: string, idle = 'Copy') => (copied === which ? 'Copied' : idle)

  return (
    <div className={`demoRoot ${theme === 'dark' ? 'isDark' : 'isLight'}`}>
      <NavBar />

      <div className="demoContent detailContent">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/icons/">All icons</Link>
          <span aria-hidden="true">/</span>
          <span className="crumbCategory">{categoryLabel(icon.category)}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{icon.name}</span>
        </nav>

        <header className="detailHead">
          <div>
            <h1 className="detailTitle">{icon.name}</h1>
            <p className="detailSub">
              {icon.meaning ?? `One of the ${categoryLabel(icon.category)} symbols in the collection.`}
            </p>
          </div>
          <span className="catBadge">{categoryLabel(icon.category)}</span>
        </header>

        <main className="detailCols">
          <section className="detailStageCard" aria-label={`${icon.name} preview`}>
            <div className="previewStage detailStage">
              <Symbol name={icon.name} size={size} color={color} svg={svg} />
            </div>

            <div className="detailControls">
              <label className="control">
                <span className="controlLabel">Size: {size}px</span>
                <input
                  className="range"
                  type="range"
                  min={16}
                  max={256}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </label>

              <label className="control">
                <span className="controlLabel">Color</span>
                <div className="colorRow">
                  <input
                    className="color"
                    type="color"
                    value={color}
                    onChange={(e) => setCustomColor(e.target.value)}
                    aria-label="Icon color"
                  />
                  <input
                    className="input mono"
                    value={color}
                    onChange={(e) => setCustomColor(e.target.value)}
                    aria-label="Icon color hex"
                  />
                  {customColor && (
                    <button
                      type="button"
                      className="resetColor"
                      onClick={() => setCustomColor(null)}
                      title="Follow the current theme"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </label>
            </div>

            <div className="detailActions">
              <button type="button" className="copyBtn" onClick={download}>
                Download SVG
              </button>
              <button type="button" className="copyBtn" onClick={() => copy(svg, 'svg')}>
                {label('svg', 'Copy SVG')}
              </button>
              <button type="button" className="copyBtn" onClick={() => copy(cdnUrl, 'cdn')}>
                {label('cdn', 'Copy CDN URL')}
              </button>
            </div>
          </section>

          <div className="detailSide">
            <section className="detailCard" aria-label="Usage">
              <h2 className="detailCardTitle">Use it</h2>

              <div className="snippet">
                <div className="snippetHead">
                  <span className="snippetLabel">React</span>
                  <button
                    type="button"
                    className="copyBtn small"
                    onClick={() => copy(`${importLine}\n\n${jsx}`, 'jsx')}
                  >
                    {label('jsx')}
                  </button>
                </div>
                <pre className="snippetBody mono">
                  <code>{`${importLine}\n\n${jsx}`}</code>
                </pre>
              </div>

              <div className="snippet">
                <div className="snippetHead">
                  <span className="snippetLabel">Plain HTML</span>
                  <button type="button" className="copyBtn small" onClick={() => copy(htmlSnippet, 'html')}>
                    {label('html')}
                  </button>
                </div>
                <pre className="snippetBody mono">
                  <code>{htmlSnippet}</code>
                </pre>
              </div>

              <p className="snippetNote">
                The CDN URL is pinned to <code className="mono">ghicons@{version}</code>, so it keeps
                serving these exact bytes. Icons use <code className="mono">currentColor</code> — inline
                the SVG and it takes its colour from CSS.
              </p>
            </section>

            <section className="detailCard" aria-label="Details">
              <h2 className="detailCardTitle">Details</h2>
              <dl className="iconMeta">
                <dt>Category</dt>
                <dd>{categoryLabel(icon.category)}</dd>
                <dt>Slug</dt>
                <dd className="mono">{icon.slug}</dd>
                <dt>Canvas</dt>
                <dd className="mono">{icon.viewBox}</dd>
                <dt>File</dt>
                <dd className="mono breakAll">
                  <a href={cdnUrl} target="_blank" rel="noopener noreferrer">
                    {icon.file}
                  </a>
                </dd>
                {icon.aliases && icon.aliases.length > 0 && (
                  <>
                    <dt>Also known as</dt>
                    <dd>{icon.aliases.join(', ')}</dd>
                  </>
                )}
                {icon.keywords && icon.keywords.length > 0 && (
                  <>
                    <dt>Keywords</dt>
                    <dd>{icon.keywords.join(', ')}</dd>
                  </>
                )}
              </dl>

              {icon.meaning ? (
                <p className="iconMeaning">{icon.meaning}</p>
              ) : (
                <p className="iconMeaningMissing">
                  The documented meaning of this symbol has not been written up yet.{' '}
                  <a
                    href={`${REPO_URL}/blob/master/docs/wiki/Cultural-Guidelines.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contribute the research
                  </a>{' '}
                  — you do not need to write code.
                </p>
              )}
            </section>
          </div>
        </main>

        {related.length > 0 && (
          <section className="relatedSection" aria-label={`More ${categoryLabel(icon.category)} icons`}>
            <h2 className="detailCardTitle">More {categoryLabel(icon.category)} symbols</h2>
            <div className="relatedGrid">
              {related.map((other) => (
                <Link key={other.slug} href={iconHref(other.slug)} className="tile relatedTile">
                  <div className="iconWrap" aria-hidden="true">
                    <Symbol name={other.name} size={28} color={themeColor} />
                  </div>
                  <div className="iconName">{other.name}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="siteFooter">
        <a href="https://methuselah.site" target="_blank" rel="noopener noreferrer">
          Built by The Laughing Chicken
        </a>
      </footer>
    </div>
  )
}

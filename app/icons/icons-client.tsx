'use client'

import * as React from 'react'
import './icons.css'
import * as Icons from '@ghicons/react'
import { icons as registry, categories as allCategories, registry as meta } from 'ghicons'
import NavBar from '../components/nav-bar'
import { useTheme } from '../components/theme-provider'

type IconComponent = React.ComponentType<{
  size?: number | string
  color?: string
  className?: string
  style?: React.CSSProperties
}>

// Derived from the package's own type rather than restated, so the site cannot
// drift from the registry schema when new fields are added.
type RegistryIcon = (typeof registry)[number]
type Entry = RegistryIcon & { Component: IconComponent }

const componentsByName = Icons as unknown as Record<string, IconComponent | undefined>

/**
 * The gallery is driven by the `ghicons` registry rather than by enumerating the
 * React package. The registry is the same index that ships to every consumer, so
 * categories and slugs here are the ones everyone else sees — there is no second
 * list to keep in step.
 */
const ALL_ICONS: Entry[] = registry
  .map((icon) => {
    const Component = componentsByName[icon.name]
    return Component ? { ...icon, Component } : null
  })
  .filter((entry): entry is Entry => entry !== null)

const CATEGORY_LABELS: Record<string, string> = {
  adinkra: 'Adinkra',
  general: 'General',
  national: 'National',
}

const countFor = (category: string) =>
  category === 'all' ? ALL_ICONS.length : ALL_ICONS.filter((i) => i.category === category).length

function buildUsageCode(name: string, size: number, color: string) {
  return `<${name} size={${size}} color="${color}" />`
}

export default function IconsClient() {
  const { theme } = useTheme()
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState<string>('all')
  const [size, setSize] = React.useState<number>(32)
  // Null means "follow the theme". Without this the preview defaults to near-black
  // and is invisible against the dark background; once the user picks a colour we
  // respect it in both themes.
  const [customColor, setCustomColor] = React.useState<string | null>(null)
  const [selectedName, setSelectedName] = React.useState<string>(() => ALL_ICONS[0]?.name ?? '')
  const [copied, setCopied] = React.useState<'code' | 'svg' | null>(null)

  const themeColor = theme === 'dark' ? '#E5E7EB' : '#111827'
  const color = customColor ?? themeColor

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_ICONS.filter((icon) => {
      if (category !== 'all' && icon.category !== category) return false
      if (!q) return true
      // Search the slug and keywords too, so people who know a symbol by meaning
      // rather than by its Akan name can still find it.
      return (
        icon.name.toLowerCase().includes(q) ||
        icon.slug.includes(q) ||
        (icon.meaning?.toLowerCase().includes(q) ?? false) ||
        (icon.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false)
      )
    })
  }, [query, category])

  React.useEffect(() => {
    if (!selectedName) return
    if (!filtered.some((i) => i.name === selectedName) && filtered[0]) {
      setSelectedName(filtered[0].name)
    }
  }, [filtered, selectedName])

  const selected = React.useMemo(
    () => ALL_ICONS.find((i) => i.name === selectedName),
    [selectedName],
  )

  const usageCode = React.useMemo(
    () => buildUsageCode(selectedName || 'Icon', size, color),
    [selectedName, size, color],
  )

  // The core package publishes the raw SVGs at stable paths, so every icon has a
  // CDN URL that works with no framework at all.
  const svgUrl = selected ? `https://unpkg.com/ghicons@${meta.version}/${selected.file}` : ''

  const copy = async (text: string, which: 'code' | 'svg') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(which)
      setTimeout(() => setCopied(null), 1600)
    } catch {
      // clipboard may be blocked; not worth surfacing
    }
  }

  return (
    <div className={`demoRoot ${theme === 'dark' ? 'isDark' : 'isLight'}`}>
      <NavBar />
      <div className="demoContent">
        <header className="demoHeader">
          <div className="titleBlock">
            <p className="subtitle">
              {ALL_ICONS.length} Ghanaian symbols. Pick one, tweak it, and copy the JSX — or grab
              the raw SVG and use it with no framework at all.
            </p>
          </div>

          <div className="controls">
            <label className="control">
              <span className="controlLabel">Search</span>
              <input
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Sankofa, cedi, faith..."
                spellCheck={false}
              />
            </label>

            <div className="control">
              <span className="controlLabel">Category</span>
              <div className="segmented cats" role="group" aria-label="Filter by category">
                {['all', ...allCategories].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`segBtn ${category === c ? 'active' : ''}`}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                  >
                    {c === 'all' ? 'All' : (CATEGORY_LABELS[c] ?? c)}{' '}
                    <span className="segCount">{countFor(c)}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="control">
              <span className="controlLabel">Size: {size}px</span>
              <input
                className="range"
                type="range"
                min={12}
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
        </header>

        <main className="demoMain">
          <div className="metaRow">
            <div className="badge">
              {filtered.length} {filtered.length === 1 ? 'icon' : 'icons'}
              {category !== 'all' && ` in ${CATEGORY_LABELS[category] ?? category}`}
            </div>
            <div className="hint">Click a tile to preview it on the right.</div>
          </div>

          <div className="twoCol">
            <section className="grid" aria-label="Icon gallery">
              {filtered.map(({ name, Component }) => {
                const isSelected = name === selectedName
                return (
                  <button
                    key={name}
                    type="button"
                    className={`tile ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedName(name)}
                    title={`Preview "${name}"`}
                  >
                    <div className="iconWrap" aria-hidden="true">
                      <Component size={28} color={themeColor} />
                    </div>
                    <div className="iconName">{name}</div>
                  </button>
                )
              })}
              {filtered.length === 0 && (
                <p className="emptyState">
                  No icons match “{query}”.{' '}
                  <a
                    href="https://github.com/ProfessorBlackman/ghicons/issues/new?template=icon_request.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request this symbol
                  </a>
                  .
                </p>
              )}
            </section>

            <aside className="previewPanel" aria-label="Selected icon preview">
              <div className="previewHeader">
                <div className="previewTitleBlock">
                  <div className="previewTitle">{selectedName || 'Select an icon'}</div>
                  <div className="previewSub">Live preview updates as you change size/color.</div>
                </div>

                <div className="previewActions">
                  <div className="previewCode mono" title={usageCode} aria-label="Usage code">
                    {usageCode}
                  </div>
                  <button
                    type="button"
                    className="copyBtn"
                    onClick={() => copy(usageCode, 'code')}
                    title="Copy usage code"
                  >
                    {copied === 'code' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="previewStage" aria-label="Preview stage">
                {selected ? (
                  <div className="previewIcon">
                    {React.createElement(selected.Component, { size, color })}
                  </div>
                ) : (
                  <div className="previewEmpty">No icon selected.</div>
                )}
              </div>

              <div className="previewFooter">
                <div className="previewHelp mono">
                  import {'{'} {selectedName || 'Icon'} {'}'} from &apos;@ghicons/react&apos;
                </div>
              </div>

              {selected && (
                <div className="infoPanel">
                  <div className="infoTitle">About this icon</div>
                  <div className="infoContent">
                    <dl className="iconMeta">
                      <dt>Category</dt>
                      <dd>{CATEGORY_LABELS[selected.category] ?? selected.category}</dd>
                      <dt>Slug</dt>
                      <dd className="mono">{selected.slug}</dd>
                      <dt>Canvas</dt>
                      <dd className="mono">{selected.viewBox}</dd>
                    </dl>

                    {selected.meaning ? (
                      <p className="iconMeaning">{selected.meaning}</p>
                    ) : (
                      <p className="iconMeaningMissing">
                        The documented meaning of this symbol has not been written up yet.{' '}
                        <a
                          href="https://github.com/ProfessorBlackman/ghicons/blob/master/docs/wiki/Cultural-Guidelines.md"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Contribute the research
                        </a>{' '}
                        — you do not need to write code.
                      </p>
                    )}

                    <div className="rawSvg">
                      <span className="rawSvgLabel">Raw SVG</span>
                      <a className="mono rawSvgUrl" href={svgUrl} target="_blank" rel="noopener noreferrer">
                        {selected.file}
                      </a>
                      <button
                        type="button"
                        className="copyBtn"
                        onClick={() => copy(svgUrl, 'svg')}
                        title="Copy the CDN URL for this SVG"
                      >
                        {copied === 'svg' ? 'Copied' : 'Copy URL'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </main>

        <footer className="siteFooter">
          <a href="https://methuselah.site" target="_blank" rel="noopener noreferrer">
            Built by The Laughing Chicken
          </a>
        </footer>
      </div>
    </div>
  )
}

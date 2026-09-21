import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// The installed core package, addressed as a directory rather than through
// `require.resolve('ghicons/<file>')`: the bundler rewrites resolver calls and
// then cannot resolve an `.svg` as a module, so resolution has to stay out of
// its hands. A wrong path fails the build on the first icon.
const CORE_PACKAGE = join(process.cwd(), 'node_modules', 'ghicons')

/**
 * A canonical SVG, read out of the installed package at build time.
 *
 * Inlining it lets a page copy and download the real markup with no network
 * call, and means the bytes on the page are the same bytes the npm package and
 * the CDN serve.
 *
 * Build-time only — this reads from disk, so it must not be imported into a
 * client component.
 */
export function readSvgSource(file: string) {
  try {
    return readFileSync(join(CORE_PACKAGE, file), 'utf8').trim()
  } catch (cause) {
    throw new Error(`Could not read ${file} from ${CORE_PACKAGE} — is ghicons installed?`, {
      cause,
    })
  }
}

/**
 * The same SVG as a data URI, with `currentColor` resolved to a literal.
 *
 * Open Graph images are rendered by satori, which has no CSS cascade to inherit
 * a colour from — an icon left on `currentColor` comes out black on a dark card.
 */
export function svgDataUri(file: string, color: string) {
  const svg = readSvgSource(file).replaceAll('currentColor', color)
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

# ghicons.methuselah.site

The public icon browser and documentation site for [GHIcons](https://github.com/ProfessorBlackman/ghicons) — a collection of Ghanaian cultural symbols.

Live at **[ghicons.methuselah.site](https://ghicons.methuselah.site)**.

## What it does

- **Browse** all 106 icons, filter by category, search by name, slug or keyword
- **Preview** any icon at any size and colour, and copy the JSX
- **A page per icon** at `/icons/<slug>/` — its meaning, its metadata, React and plain-HTML snippets, an SVG download and related symbols
- **Copy a CDN URL** for the raw SVG, for people not using React
- **Docs** covering both packages, the registry, accessibility and migration

## How it relates to the library

This site is a **consumer** of GHIcons, not part of it. It installs the published packages from npm rather than linking to the source, so a library change reaches the site only after a release and a dependency bump here.

| Package | Used for |
|---|---|
| [`ghicons`](https://www.npmjs.com/package/ghicons) | The registry — names, slugs, categories, and the SVG paths behind the CDN links |
| [`@ghicons/react`](https://www.npmjs.com/package/@ghicons/react) | The components rendered in the gallery |

The gallery, the 106 icon pages, their Open Graph cards and the sitemap are all driven by the registry rather than by enumerating the React package, so categories and counts here are the same ones every other consumer sees. There is no second list to keep in step, and nothing to add by hand when an icon arrives.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export to out/
pnpm lint
```

## Deployment

The site is a **static export** — `output: "export"` in `next.config.ts` — and is
published to GitHub Pages by `.github/workflows/deploy.yml` on every push to
`main`. Pull requests build and lint but do not deploy.

Nothing runs at request time: no middleware, no server actions, no image
optimisation, and no route handler that reads the request. Everything is
produced at build time and served as a file. Keep it that way, or the export
stops working — if you ever need request-time behaviour, the site needs a
different host.

Four details that the export depends on:

| File | Why |
|---|---|
| `trailingSlash: true` | Emits `icons/index.html` rather than `icons.html`, so a plain static host resolves `/icons` |
| `public/CNAME` | Holds the custom domain, which GitHub Pages otherwise forgets on each deploy |
| `public/.nojekyll` | Stops Jekyll stripping `_next/`. Not needed by the Actions-based deploy, which serves the artifact as-is, but required if publishing from a branch — cheap insurance |
| `dynamic = 'force-static'` | On `app/sitemap.ts`, `app/robots.ts` and the two Open Graph routes. Without it the export refuses to build them, since it has no server to run them on |

The workflow checks the export before publishing: every route, `sitemap.xml`,
`robots.txt`, the Open Graph cards, `CNAME`, `.nojekyll` and a populated
`_next/` must be present, and the icon pages, cards and sitemap entries must
each number exactly as many as the registry has icons. A silent export
regression fails the build instead of the live site.

### Search and social metadata

| Where | What it does |
|---|---|
| `app/layout.tsx` | `metadataBase`, the `%s — ghicons` title template, and the site-wide Open Graph and Twitter tags |
| `app/lib/og.ts` | `openGraphFor()` — a page **replaces** the layout's `openGraph` rather than merging into it, so every page builds the whole block through this helper or silently loses the card |
| `app/sitemap.ts` | All four pages plus one entry per icon. The gallery selects an icon client-side, so without the sitemap a crawler would never reach the 106 icon pages |
| `app/robots.ts` | Allows everything and points at the sitemap |
| `app/og/image.png/`, `app/og/[slug]/image.png/` | 1200×630 cards rendered at build time — the site card, and one per icon showing the symbol itself |

The cards are `.png` route handlers rather than Next's `opengraph-image`
convention, which writes an **extensionless** file. A static host has no way to
label that as an image, and a card served as `application/octet-stream` is a card
no social scraper will show.

To preview exactly what gets deployed:

```bash
pnpm build && npx serve out
```

## Updating to a new GHIcons release

```bash
pnpm update ghicons @ghicons/react
pnpm build
```

New icons appear automatically — the gallery, the icon pages, the Open Graph cards and the sitemap all read the registry. If a release renames or removes an icon, check that nothing on the site references it by name: `app/components/nav-bar.tsx` imports one directly for the logo, and `app/og/image.png/route.tsx` names five for the site card. A rename also changes that icon's URL, so it is worth a redirect or a note if anything linked to the old one.

## Contributing icons

Icon contributions go to the [main repository](https://github.com/ProfessorBlackman/ghicons), not here. You only need to supply an SVG — see the [icon specification](https://github.com/ProfessorBlackman/ghicons/blob/master/docs/ICON-SPEC.md).

Cultural research is just as valuable and needs no code: many icons still have no documented meaning, and the site shows a prompt wherever one is missing.

## License

MIT

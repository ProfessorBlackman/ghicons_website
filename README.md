# ghicons.methuselah.site

The public icon browser and documentation site for [GHIcons](https://github.com/ProfessorBlackman/ghicons) — a collection of Ghanaian cultural symbols.

Live at **[ghicons.methuselah.site](https://ghicons.methuselah.site)**.

## What it does

- **Browse** all 106 icons, filter by category, search by name, slug or keyword
- **Preview** any icon at any size and colour, and copy the JSX
- **Copy a CDN URL** for the raw SVG, for people not using React
- **Docs** covering both packages, the registry, accessibility and migration

## How it relates to the library

This site is a **consumer** of GHIcons, not part of it. It installs the published packages from npm rather than linking to the source, so a library change reaches the site only after a release and a dependency bump here.

| Package | Used for |
|---|---|
| [`ghicons`](https://www.npmjs.com/package/ghicons) | The registry — names, slugs, categories, and the SVG paths behind the CDN links |
| [`@ghicons/react`](https://www.npmjs.com/package/@ghicons/react) | The components rendered in the gallery |

The gallery is driven by the registry rather than by enumerating the React package, so categories and counts here are the same ones every other consumer sees. There is no second list to keep in step.

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

There is nothing server-side: no route handlers, middleware, server actions or
image optimisation. Keep it that way, or the export stops working. If you ever
need one of those, the site needs a different host.

Three details that the export depends on:

| File | Why |
|---|---|
| `trailingSlash: true` | Emits `icons/index.html` rather than `icons.html`, so a plain static host resolves `/icons` |
| `public/CNAME` | Holds the custom domain, which GitHub Pages otherwise forgets on each deploy |
| `public/.nojekyll` | Stops Jekyll stripping `_next/`. Not needed by the Actions-based deploy, which serves the artifact as-is, but required if publishing from a branch — cheap insurance |

The workflow checks the export before publishing: every route, `CNAME`,
`.nojekyll` and a populated `_next/` must be present, so a silent export
regression fails the build instead of the live site.

To preview exactly what gets deployed:

```bash
pnpm build && npx serve out
```

## Updating to a new GHIcons release

```bash
pnpm update ghicons @ghicons/react
pnpm build
```

New icons appear automatically — the gallery reads the registry. If a release renames or removes an icon, check that nothing on the site references it by name (`app/components/nav-bar.tsx` imports one directly for the logo).

## Contributing icons

Icon contributions go to the [main repository](https://github.com/ProfessorBlackman/ghicons), not here. You only need to supply an SVG — see the [icon specification](https://github.com/ProfessorBlackman/ghicons/blob/master/docs/ICON-SPEC.md).

Cultural research is just as valuable and needs no code: many icons still have no documented meaning, and the site shows a prompt wherever one is missing.

## License

MIT

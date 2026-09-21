import Link from 'next/link'
import NavBar from '../components/nav-bar'
import DocsRoot from './docs-client'
import '../docs/docs.css'

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="codeBlock">
      <code>{children}</code>
    </pre>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="docSection">
      <h2 className="sectionTitle">{title}</h2>
      {children}
    </section>
  )
}

const REPO = 'https://github.com/ProfessorBlackman/ghicons'

export const metadata = {
  title: 'Docs — ghicons',
  description:
    'Installation and usage for GHIcons — Ghanaian cultural icons for React and for any other framework.',
}

export default function DocsPage() {
  return (
    <DocsRoot>
      <NavBar />

      <div className="docsContent">
        <aside className="docsSidebar">
          <nav className="sidebarNav">
            <p className="sidebarHeading">On this page</p>
            <a href="#packages" className="sidebarLink">Which package?</a>
            <a href="#installation" className="sidebarLink">Installation</a>
            <a href="#basic-usage" className="sidebarLink">React usage</a>
            <a href="#props" className="sidebarLink">Props</a>
            <a href="#typescript" className="sidebarLink">TypeScript</a>
            <a href="#without-react" className="sidebarLink">Without React</a>
            <a href="#registry" className="sidebarLink">The icon registry</a>
            <a href="#accessibility" className="sidebarLink">Accessibility</a>
            <a href="#migrating" className="sidebarLink">Migrating from 0.0.x</a>
            <a href="#raise-issue" className="sidebarLink">Raise an issue</a>
            <a href="#contributing" className="sidebarLink">Contributing</a>
            <div className="sidebarDivider" />
            <p className="sidebarHeading">Links</p>
            <a href="https://www.npmjs.com/package/@ghicons/react" target="_blank" rel="noopener noreferrer" className="sidebarLink sidebarExternal">
              @ghicons/react ↗
            </a>
            <a href="https://www.npmjs.com/package/ghicons" target="_blank" rel="noopener noreferrer" className="sidebarLink sidebarExternal">
              ghicons (core) ↗
            </a>
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="sidebarLink sidebarExternal">
              GitHub repo ↗
            </a>
            <a href={`${REPO}/issues`} target="_blank" rel="noopener noreferrer" className="sidebarLink sidebarExternal">
              Issues ↗
            </a>
          </nav>
        </aside>

        <main className="docsMain">
          <div className="docsHero">
            <h1 className="docsTitle">Documentation</h1>
            <p className="docsLead">
              <strong>GHIcons</strong> is a collection of Ghanaian cultural symbols — Adinkra,
              national emblems, and other motifs — maintained as optimised SVGs. React components
              are generated from that collection, and the SVGs themselves are published too, so
              you can use the icons with any framework, or none.
            </p>
            <div className="heroLinks">
              <a href="https://www.npmjs.com/package/@ghicons/react" target="_blank" rel="noopener noreferrer" className="heroBtn heroBtnPrimary">
                @ghicons/react on npm
              </a>
              <a href="https://www.npmjs.com/package/ghicons" target="_blank" rel="noopener noreferrer" className="heroBtn">
                ghicons on npm
              </a>
              <a href={REPO} target="_blank" rel="noopener noreferrer" className="heroBtn">
                GitHub repo
              </a>
            </div>
          </div>

          <div className="callout calloutWarn">
            <p className="calloutTitle">Upgrading from ghicons 0.0.x?</p>
            <p className="docsPara">
              The <code>ghicons</code> package changed meaning in <code>0.1.0</code>. It is now the
              framework-agnostic core; the React components moved to <code>@ghicons/react</code>.
              See <a href="#migrating" className="docsLink">Migrating from 0.0.x</a>.
            </p>
          </div>

          <Section id="packages" title="Which package?">
            <div className="propsTable">
              <div className="propsRow propsRowWide propsHeader">
                <span>You are building with</span>
                <span>Install</span>
              </div>
              <div className="propsRow propsRowWide">
                <span>React</span>
                <code className="propName">@ghicons/react</code>
              </div>
              <div className="propsRow propsRowWide">
                <span>Vue, Svelte, Angular, Astro, Django, Laravel, WordPress, plain HTML…</span>
                <code className="propName">ghicons</code>
              </div>
              <div className="propsRow propsRowWide">
                <span>An icon picker, docs site, or your own generator</span>
                <code className="propName">ghicons</code>
              </div>
            </div>
            <p className="docsPara">
              <code>ghicons</code> is the canonical collection: the optimised SVG files plus a
              machine-readable registry, with no dependencies. <code>@ghicons/react</code> is
              generated from it.
            </p>
          </Section>

          <Section id="installation" title="Installation">
            <CodeBlock>{`# React components
npm install @ghicons/react

# the SVGs and the registry — works with anything
npm install ghicons`}</CodeBlock>
            <p className="docsPara">
              <code>@ghicons/react</code> lists React 18 or 19 as a peer dependency and has no
              runtime dependencies of its own. <code>ghicons</code> has no dependencies at all.
            </p>
          </Section>

          <Section id="basic-usage" title="React usage">
            <p className="docsPara">
              Import icons individually by name. Tree-shaking is supported, so only the icons you
              use end up in your bundle.
            </p>
            <CodeBlock>{`import { GyeNyame, Sankofa } from '@ghicons/react';

function MyComponent() {
  return (
    <div>
      <GyeNyame />
      <Sankofa size={40} color="#b30000" />
    </div>
  );
}`}</CodeBlock>
            <p className="docsPara">
              Browse every icon — with a copy-ready snippet — on the{' '}
              <Link href="/" className="docsLink">Browse page</Link>.
            </p>
          </Section>

          <Section id="props" title="Props">
            <p className="docsPara">Every icon accepts the same optional props:</p>
            <div className="propsTable">
              <div className="propsRow propsHeader">
                <span>Prop</span>
                <span>Type</span>
                <span>Default</span>
                <span>Description</span>
              </div>
              <div className="propsRow">
                <code className="propName">size</code>
                <code className="propType">number | string</code>
                <code className="propDefault">24</code>
                <span>Width and height. Numbers are pixels; strings accept any CSS unit (e.g. <code>&quot;2rem&quot;</code>).</span>
              </div>
              <div className="propsRow">
                <code className="propName">color</code>
                <code className="propType">string</code>
                <code className="propDefault">currentColor</code>
                <span>Fill color. Defaults to inheriting the text color of the parent element.</span>
              </div>
              <div className="propsRow">
                <code className="propName">viewBox</code>
                <code className="propType">string</code>
                <code className="propDefault">0 0 24 24</code>
                <span>SVG viewBox. Rarely needs overriding — every icon is drawn on the same canvas.</span>
              </div>
              <div className="propsRow">
                <code className="propName">className</code>
                <code className="propType">string</code>
                <code className="propDefault">—</code>
                <span>Additional CSS class names applied to the root <code>&lt;svg&gt;</code>.</span>
              </div>
              <div className="propsRow">
                <code className="propName">style</code>
                <code className="propType">CSSProperties</code>
                <code className="propDefault">—</code>
                <span>Inline styles applied to the root <code>&lt;svg&gt;</code>.</span>
              </div>
            </div>
            <p className="docsPara">
              Components render real <code>&lt;svg&gt;</code> elements, so every standard SVG
              attribute works too — <code>onClick</code>, <code>aria-*</code>, <code>data-*</code>,{' '}
              <code>role</code>, and the rest.
            </p>

            <h3 className="subsectionTitle">Sizing</h3>
            <CodeBlock>{`<Adinkrahene size={32} />       {/* 32px */}
<Adinkrahene size="2.5rem" />    {/* 2.5rem */}`}</CodeBlock>

            <h3 className="subsectionTitle">Coloring</h3>
            <p className="docsPara">
              Icons use <code>currentColor</code>, so they inherit the surrounding text color.
              Override with the <code>color</code> prop when needed.
            </p>
            <CodeBlock>{`{/* Inherits text color from parent */}
<div style={{ color: 'blue' }}>
  <Akoben />
</div>

{/* Explicit color */}
<Akoben color="gold" />`}</CodeBlock>

            <h3 className="subsectionTitle">Classes and inline styles</h3>
            <CodeBlock>{`<Fihankra className="my-icon" style={{ marginTop: '8px' }} />`}</CodeBlock>
          </Section>

          <Section id="typescript" title="TypeScript">
            <p className="docsPara">
              Full type definitions are included. <code>IconProps</code> is exported for building
              wrapper components.
            </p>
            <CodeBlock>{`import { GyeNyame, type IconProps } from '@ghicons/react';

interface IconButtonProps extends IconProps {
  label: string;
}

const IconButton = ({ label, ...iconProps }: IconButtonProps) => (
  <button>
    <GyeNyame {...iconProps} />
    {label}
  </button>
);`}</CodeBlock>
          </Section>

          <Section id="without-react" title="Without React">
            <p className="docsPara">
              The <code>ghicons</code> package ships the SVG files themselves at stable, predictable
              paths. No build step, no framework.
            </p>
            <CodeBlock>{`npm install ghicons`}</CodeBlock>
            <CodeBlock>{`<img src="node_modules/ghicons/svg/adinkra/GyeNyame.svg" alt="Gye Nyame">`}</CodeBlock>
            <p className="docsPara">
              Or straight from a CDN, with no install at all:
            </p>
            <CodeBlock>{`<img src="https://unpkg.com/ghicons/svg/adinkra/GyeNyame.svg" alt="Gye Nyame">`}</CodeBlock>

            <div className="callout">
              <p className="calloutTitle">To control the color, inline the SVG</p>
              <p className="docsPara">
                Icons use <code>fill=&quot;currentColor&quot;</code>, which only inherits when the
                SVG is part of the document. An <code>&lt;img&gt;</code> renders the icon in its own
                color and cannot inherit yours — that is a browser rule, not a GHIcons limitation.
                Inline the markup, or use a build-time inliner such as{' '}
                <code>vite-plugin-svg-icons</code> or your framework&apos;s equivalent.
              </p>
            </div>

            <CodeBlock>{`<span class="icon">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="…" />
  </svg>
</span>

<style>
  .icon { color: #b8860b; }
  .icon svg { width: 2rem; height: 2rem; }
</style>`}</CodeBlock>

            <p className="docsPara">
              Vue, Svelte, Web Components and Flutter packages are planned — see the{' '}
              <a href={`${REPO}/blob/master/docs/wiki/Roadmap.md`} target="_blank" rel="noopener noreferrer" className="docsLink">
                roadmap ↗
              </a>
              . Until then, the core package covers those cases.
            </p>
          </Section>

          <Section id="registry" title="The icon registry">
            <p className="docsPara">
              <code>ghicons</code> also publishes <code>registry.json</code>, a machine-readable
              index of the whole collection. This page is built on it.
            </p>
            <CodeBlock>{`import { icons, categories, getIcon, iconsByCategory } from 'ghicons';

getIcon('gye-nyame');
// { name: 'GyeNyame', slug: 'gye-nyame', category: 'adinkra',
//   viewBox: '0 0 24 24', file: 'svg/adinkra/GyeNyame.svg' }

iconsByCategory('national');   // [BlackStar, GhanaFlag]
categories;                    // ['adinkra', 'general', 'national']`}</CodeBlock>
            <p className="docsPara">
              Read the JSON directly from any language, not just JavaScript:
            </p>
            <CodeBlock>{`import registry from 'ghicons/registry.json';`}</CodeBlock>
            <p className="docsPara">
              <code>name</code>, <code>slug</code>, <code>category</code>, <code>viewBox</code> and{' '}
              <code>file</code> are always present. <code>meaning</code>, <code>keywords</code> and{' '}
              <code>aliases</code> are optional and are being researched and filled in across the
              collection — <a href={`${REPO}/blob/master/docs/wiki/Cultural-Guidelines.md`} target="_blank" rel="noopener noreferrer" className="docsLink">contributions welcome ↗</a>.
            </p>
          </Section>

          <Section id="accessibility" title="Accessibility">
            <p className="docsPara">
              Whether an icon is decorative or meaningful depends on how you use it, so GHIcons
              leaves the decision to you and makes both straightforward.
            </p>
            <CodeBlock>{`{/* Meaningful — give it an accessible name */}
<GyeNyame role="img" aria-label="Gye Nyame symbol" />

{/* Decorative — hide it when adjacent text carries the meaning */}
<button>
  <GyeNyame aria-hidden="true" />
  Learn more
</button>`}</CodeBlock>
            <p className="docsPara">
              The same applies to an inlined raw SVG. No external CSS file is required in either
              case — icons are inline SVG with no stylesheet.
            </p>
          </Section>

          <Section id="migrating" title="Migrating from 0.0.x">
            <p className="docsPara">
              In <code>0.1.0</code>, <code>ghicons</code> became the framework-agnostic core and the
              React components moved to <code>@ghicons/react</code>. Two steps:
            </p>
            <CodeBlock>{`npm uninstall ghicons
npm install @ghicons/react`}</CodeBlock>
            <CodeBlock>{`- import { GyeNyame, Sankofa } from 'ghicons';
+ import { GyeNyame, Sankofa } from '@ghicons/react';`}</CodeBlock>
            <p className="docsPara">
              The component API is unchanged. Two icons were also renamed:
            </p>
            <div className="propsTable">
              <div className="propsRow propsHeader">
                <span>Before</span>
                <span>After</span>
                <span>Why</span>
              </div>
              <div className="propsRow propsRow3col">
                <code className="propName">GhanaCedisIcon</code>
                <code className="propName">GhanaCedi</code>
                <span>The <code>Icon</code> suffix was redundant. This icon also rendered blank in 0.0.x — its artwork sat outside the declared viewBox — and now displays correctly.</span>
              </div>
              <div className="propsRow propsRow3col">
                <code className="propName">Sankofa1</code>
                <code className="propName">SankofaHeart</code>
                <span>It is the stylised heart form of Sankofa. <code>Sankofa</code> itself, the standard bird form, is unchanged.</span>
              </div>
            </div>
            <p className="docsPara">
              Full details in the{' '}
              <a href={`${REPO}/blob/master/docs/MIGRATION.md`} target="_blank" rel="noopener noreferrer" className="docsLink">
                migration guide ↗
              </a>
              .
            </p>
          </Section>

          <Section id="raise-issue" title="Raise an issue">
            <p className="docsPara">
              Found a bug, a rendering problem, or a missing icon? Open an issue and a maintainer
              will respond as soon as possible.
            </p>
            <div className="callout">
              <p className="calloutTitle">Before opening an issue</p>
              <ul className="calloutList">
                <li>Check the <a href={`${REPO}/issues`} target="_blank" rel="noopener noreferrer" className="docsLink">existing issues</a> to avoid duplicates.</li>
                <li>Include the package and version (<code>npm list @ghicons/react</code> or <code>npm list ghicons</code>), your framework version, and a minimal reproduction.</li>
                <li>For icon requests, include the symbol name, its cultural meaning, and a reference image.</li>
              </ul>
            </div>
            <a
              href={`${REPO}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="heroBtn heroBtnPrimary"
              style={{ display: 'inline-flex', marginTop: '8px' }}
            >
              Open an issue on GitHub ↗
            </a>
          </Section>

          <Section id="contributing" title="Contributing">
            <p className="docsPara">
              Contributions are very welcome, and the most valuable one is an icon. You only need to
              produce an <strong>SVG</strong> — the project generates every framework package from
              it, so you never have to write React or any other framework code.
            </p>

            <h3 className="subsectionTitle">Ways to contribute</h3>
            <ul className="docsList">
              <li><strong>Submit a new icon</strong> — add a clean SVG under <code>svg/&lt;category&gt;/</code> and open a PR.</li>
              <li><strong>Contribute cultural research</strong> — meanings, context and references for symbols already in the collection. No code required, and it is what powers search and the descriptions on this site.</li>
              <li><strong>Submit a non-SVG for conversion</strong> — open an issue with your PNG/JPEG and a volunteer will convert it.</li>
              <li><strong>Request an icon</strong> — open an issue with the symbol name, meaning, and a reference image.</li>
              <li><strong>Review PRs</strong> — check submissions against the icon specification.</li>
              <li><strong>Build a framework integration</strong> — Vue, Svelte, Web Components and Flutter are all planned.</li>
            </ul>

            <h3 className="subsectionTitle">SVG requirements</h3>
            <p className="docsPara">
              These are enforced automatically on every pull request, across the whole collection.
            </p>
            <div className="propsTable">
              <div className="propsRow propsHeader">
                <span>Requirement</span>
                <span>Detail</span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">viewBox</code>
                <span>Must be exactly <code>0 0 24 24</code></span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">Color</code>
                <span>Use <code>fill=&quot;currentColor&quot;</code> or <code>none</code> — never a hardcoded color, not even white</span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">Naming</code>
                <span>PascalCase, e.g. <code>GyeNyame.svg</code>. No numeric suffix, no <code>Icon</code> suffix</span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">Paths</code>
                <span>Pure vector — no embedded rasters, base64 data, or editor artifacts</span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">Safety</code>
                <span>No <code>&lt;script&gt;</code>, no <code>@import</code>, no remote references</span>
              </div>
            </div>

            <CodeBlock>{`<!-- A valid icon -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <path d="M18.24 3.38L16.16 1.3L12 5.46..." />
</svg>`}</CodeBlock>

            <p className="docsPara">
              The full rules live in the{' '}
              <a href={`${REPO}/blob/master/docs/ICON-SPEC.md`} target="_blank" rel="noopener noreferrer" className="docsLink">
                icon specification ↗
              </a>
              , and the contribution process in{' '}
              <a href={`${REPO}/blob/master/docs/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="docsLink">
                CONTRIBUTING.md ↗
              </a>
              .
            </p>
          </Section>
        </main>
      </div>
      <footer className="siteFooter">
        <a href="https://methuselah.site" target="_blank" rel="noopener noreferrer">
          Built by The Laughing Chicken
        </a>
      </footer>
    </DocsRoot>
  )
}

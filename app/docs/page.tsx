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

export const metadata = {
  title: 'Docs — ghicons',
  description: 'Installation, usage guide, and contributing instructions for ghicons.',
}

export default function DocsPage() {
  return (
    <DocsRoot>
      <NavBar />

      <div className="docsContent">
        <aside className="docsSidebar">
          <nav className="sidebarNav">
            <p className="sidebarHeading">On this page</p>
            <a href="#installation" className="sidebarLink">Installation</a>
            <a href="#basic-usage" className="sidebarLink">Basic usage</a>
            <a href="#props" className="sidebarLink">Props</a>
            <a href="#typescript" className="sidebarLink">TypeScript</a>
            <a href="#accessibility" className="sidebarLink">Accessibility</a>
            <a href="#raise-issue" className="sidebarLink">Raise an issue</a>
            <a href="#contributing" className="sidebarLink">Contributing</a>
            <div className="sidebarDivider" />
            <p className="sidebarHeading">Links</p>
            <a
              href="https://www.npmjs.com/package/ghicons"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebarLink sidebarExternal"
            >
              npm package ↗
            </a>
            <a
              href="https://github.com/ProfessorBlackman/ghicons"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebarLink sidebarExternal"
            >
              GitHub repo ↗
            </a>
            <a
              href="https://github.com/ProfessorBlackman/ghicons/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebarLink sidebarExternal"
            >
              Issues ↗
            </a>
          </nav>
        </aside>

        <main className="docsMain">
          <div className="docsHero">
            <h1 className="docsTitle">Documentation</h1>
            <p className="docsLead">
              <strong>ghicons</strong> is a React icon library of traditional Ghanaian cultural
              symbols — Adinkra, national icons, and more — packaged as optimized SVG components.
            </p>
            <div className="heroLinks">
              <a
                href="https://www.npmjs.com/package/ghicons"
                target="_blank"
                rel="noopener noreferrer"
                className="heroBtn heroBtnPrimary"
              >
                View on npm
              </a>
              <a
                href="https://github.com/ProfessorBlackman/ghicons"
                target="_blank"
                rel="noopener noreferrer"
                className="heroBtn"
              >
                GitHub repo
              </a>
              <a
                href="https://github.com/ProfessorBlackman/ghicons/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="heroBtn"
              >
                Issues
              </a>
            </div>
          </div>

          <Section id="installation" title="Installation">
            <p className="docsPara">
              Install with your preferred package manager. No peer dependencies beyond React are
              required.
            </p>
            <CodeBlock>{`# npm
npm install ghicons

# pnpm
pnpm add ghicons

# yarn
yarn add ghicons`}</CodeBlock>
          </Section>

          <Section id="basic-usage" title="Basic usage">
            <p className="docsPara">
              Import icons individually by name. Tree-shaking is supported, so only the icons you
              use will end up in your bundle.
            </p>
            <CodeBlock>{`import { GyeNyame, Sankofa } from 'ghicons';

function MyComponent() {
  return (
    <div>
      <GyeNyame />
      <Sankofa size={40} color="#b30000" />
    </div>
  );
}`}</CodeBlock>
            <p className="docsPara">
              You can also browse and preview every icon — along with a copy-ready JSX snippet —
              on the <a href="/" className="docsLink">Browse page</a>.
            </p>
          </Section>

          <Section id="props" title="Props">
            <p className="docsPara">
              Every icon accepts the same set of optional props:
            </p>
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
                <span>Width and height. Numbers are treated as pixels; strings accept any CSS unit (e.g. <code>&quot;2rem&quot;</code>).</span>
              </div>
              <div className="propsRow">
                <code className="propName">color</code>
                <code className="propType">string</code>
                <code className="propDefault">currentColor</code>
                <span>Fill color. Defaults to inheriting the text color of the parent element.</span>
              </div>
              <div className="propsRow">
                <code className="propName">title</code>
                <code className="propType">string</code>
                <code className="propDefault">—</code>
                <span>Adds an SVG <code>&lt;title&gt;</code> for screen readers.</span>
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

            <h3 className="subsectionTitle">Sizing</h3>
            <CodeBlock>{`<Adinkrahene size={32} />       {/* 32px */}
<Adinkrahene size="2.5rem" />    {/* 2.5rem */}`}</CodeBlock>

            <h3 className="subsectionTitle">Coloring</h3>
            <p className="docsPara">
              Icons use <code>currentColor</code> by default, so they automatically inherit the
              surrounding text color. Override with the <code>color</code> prop when needed.
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
              Full TypeScript definitions are included. The library exports an{' '}
              <code>IconProps</code> interface you can extend when building wrapper components.
            </p>
            <CodeBlock>{`import { GyeNyame, type IconProps } from 'ghicons';

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

          <Section id="accessibility" title="Accessibility">
            <p className="docsPara">
              Icons are rendered as decorative SVGs by default (no implicit role or label). If an
              icon conveys meaningful information, add a <code>title</code> prop or an{' '}
              <code>aria-label</code> on a wrapper element.
            </p>
            <CodeBlock>{`{/* Decorative — no extra attributes needed */}
<GyeNyame aria-hidden="true" />

{/* Meaningful — provide a label */}
<GyeNyame title="Gye Nyame" role="img" aria-label="Gye Nyame symbol" />`}</CodeBlock>
            <p className="docsPara">
              No external CSS file is required. Icons use inline SVG styles only.
            </p>
          </Section>

          <Section id="raise-issue" title="Raise an issue">
            <p className="docsPara">
              Found a bug, rendering problem, or missing icon? Open an issue on GitHub and a
              maintainer will respond as soon as possible.
            </p>
            <div className="callout">
              <p className="calloutTitle">Before opening an issue</p>
              <ul className="calloutList">
                <li>Check the <a href="https://github.com/ProfessorBlackman/ghicons/issues" target="_blank" rel="noopener noreferrer" className="docsLink">existing issues</a> to avoid duplicates.</li>
                <li>Include the package version (<code>npm list ghicons</code>), your React version, and a minimal reproduction.</li>
                <li>For icon requests, include the symbol name, its cultural meaning, and a reference image.</li>
              </ul>
            </div>
            <a
              href="https://github.com/ProfessorBlackman/ghicons/issues/new"
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
              Contributions are very welcome. The most impactful way to help is to submit new icons,
              but code fixes and documentation improvements are equally appreciated.
            </p>

            <h3 className="subsectionTitle">Ways to contribute</h3>
            <ul className="docsList">
              <li><strong>Submit a new icon</strong> — place a clean SVG in the <code>/svg</code> directory and open a PR.</li>
              <li><strong>Submit a non-SVG for conversion</strong> — open an issue with your PNG/JPEG and a maintainer will convert it.</li>
              <li><strong>Request an icon</strong> — open an issue with the symbol name, meaning, and a reference image.</li>
              <li><strong>Review PRs</strong> — check icon quality against the SVG requirements below.</li>
              <li><strong>Fix bugs or improve the build</strong> — see the <a href="https://github.com/ProfessorBlackman/ghicons/issues" target="_blank" rel="noopener noreferrer" className="docsLink">Issues</a> tab for open tasks.</li>
            </ul>

            <h3 className="subsectionTitle">SVG requirements</h3>
            <div className="propsTable">
              <div className="propsRow propsHeader">
                <span>Requirement</span>
                <span>Detail</span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">viewBox</code>
                <span>Must be <code>0 0 24 24</code></span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">fill</code>
                <span>Use <code>fill=&quot;currentColor&quot;</code> — do not hardcode colors</span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">Naming</code>
                <span>PascalCase filename, e.g. <code>GyeNyame.svg</code></span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">Paths</code>
                <span>Pure vector — no embedded PNGs, raster content, or editor artifacts</span>
              </div>
              <div className="propsRow propsRow2col">
                <code className="propName">Color</code>
                <span>Monochrome only — multi-color icons are not currently supported</span>
              </div>
            </div>

            <CodeBlock>{`<!-- Example of a valid icon SVG -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.24 3.38L16.16 1.3L12 5.46..." />
</svg>`}</CodeBlock>

            <p className="docsPara">
              For the full contributing guide, see{' '}
              <a href="https://github.com/ProfessorBlackman/ghicons/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="docsLink">
                CONTRIBUTING.md on GitHub ↗
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

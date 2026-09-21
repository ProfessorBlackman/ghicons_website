import Link from 'next/link'
import {
  Adinkrahene,
  Akofena,
  Akoma,
  AnanseNtontan,
  Aya,
  Denkyem,
  Duafe,
  Dwennimmen,
  Eban,
  Fihankra,
  GyeNyame,
  MateMasie,
  Mmusuyidee,
  Nkyinkyim,
  Nyansapo,
  Sankofa,
} from '@ghicons/react'
import { icons, categories } from 'ghicons'
import NavBar from './components/nav-bar'
import HomeRoot from './home-client'
import './home.css'

/**
 * Adinkra cloth is a grid of stamped symbols divided by comb-drawn lines
 * (nkyimu). The hero borrows that directly: real icons from the library,
 * stamped into a panel. It is the most characteristic image in this subject's
 * world, and it doubles as a live demo.
 */
const CLOTH = [
  GyeNyame, Sankofa, Adinkrahene, Dwennimmen,
  Akoma, Nkyinkyim, Aya, Duafe,
  Fihankra, Nyansapo, Akofena, Eban,
  MateMasie, Mmusuyidee, Denkyem, AnanseNtontan,
]

export const metadata = {
  title: 'ghicons — Ghanaian symbols for software',
  description:
    'A collection of Ghanaian cultural symbols — Adinkra, national emblems and more — as plain SVG, typed React components, and a machine-readable index.',
}

export default function Home() {
  return (
    <HomeRoot>
      <NavBar />

      <header className="hero">
        <div className="heroText">
          <h1 className="heroTitle">Ghanaian symbols for software.</h1>
          <p className="heroLead">
            {icons.length} Adinkra symbols, national emblems and other Ghanaian motifs. Plain SVG
            for any framework, typed React components, and an index you can build on.
          </p>
          <div className="heroActions">
            <Link href="/icons" className="btn btnPrimary">
              Browse the icons
            </Link>
            <Link href="/docs" className="btn">
              Read the docs
            </Link>
          </div>
          <p className="heroNote">
            Free and open source under MIT. {icons.length} symbols across {categories.length}{' '}
            categories, and the core package has no dependencies.
          </p>
        </div>

        <div className="cloth" aria-hidden="true">
          <div className="clothGrid">
            {CLOTH.map((Symbol, i) => (
              <div className="clothCell" key={i} style={{ '--i': i } as React.CSSProperties}>
                <Symbol size="100%" />
              </div>
            ))}
          </div>
          <p className="clothCaption">
            Adinkra cloth is printed as a grid of carved stamps, divided by comb-drawn lines.
          </p>
        </div>
      </header>

      <main className="homeMain">
        <section className="band" id="why">
          <h2 className="bandTitle">Why this exists</h2>
          <div className="prose">
            <p>
              Ghana has hundreds of Adinkra symbols, national emblems and cultural motifs, each
              carrying a specific meaning. Almost no icon library includes any of them, so
              developers building for Ghanaian audiences reach for generic sets that have nothing
              to do with the people using their software.
            </p>
            <p>
              GHIcons exists to close that gap, and to do it carefully. These are real cultural
              symbols, not decorative shapes — so the project documents what it knows, says when it
              does not know, and prefers a smaller accurate collection to a larger questionable
              one.
            </p>
            <p>
              <Link href="/about" className="inlineLink">
                More on the symbols and how they are researched
              </Link>
            </p>
          </div>
        </section>

        <section className="band bandSteps" id="how">
          <h2 className="bandTitle">How it works</h2>
          <p className="bandLead">
            One SVG becomes every package. Contributors only ever draw an icon — nobody writes the
            same symbol twice for a second framework.
          </p>
          <ol className="steps">
            <li className="step">
              <h3 className="stepTitle">An icon is one SVG</h3>
              <p>
                Every symbol lives once, in a single file on a 24×24 canvas using{' '}
                <code>currentColor</code>. That file is the source of truth for everything
                downstream.
              </p>
            </li>
            <li className="step">
              <h3 className="stepTitle">It is checked against a spec</h3>
              <p>
                Canvas, colour, naming and safety rules are enforced automatically on the whole
                collection, so an icon cannot drift out of shape unnoticed.
              </p>
            </li>
            <li className="step">
              <h3 className="stepTitle">Packages are generated</h3>
              <p>
                The SVGs, the registry and the React components are all produced from that one
                source. Adding Vue or Svelte means adding an output, not redrawing 106 icons.
              </p>
            </li>
          </ol>
        </section>

        <section className="band" id="install">
          <h2 className="bandTitle">Two packages</h2>
          <div className="packages">
            <div className="package">
              <h3 className="packageName">@ghicons/react</h3>
              <p className="packageWhat">
                Typed React components. Tree-shakeable, no runtime dependencies.
              </p>
              <pre className="snippet">
                <code>npm install @ghicons/react</code>
              </pre>
              <pre className="snippet snippetCode">
                <code>{`import { GyeNyame } from '@ghicons/react';

<GyeNyame size={32} color="gold" />`}</code>
              </pre>
            </div>

            <div className="package">
              <h3 className="packageName">ghicons</h3>
              <p className="packageWhat">
                The SVG files and a machine-readable index. Works with any framework, or none.
              </p>
              <pre className="snippet">
                <code>npm install ghicons</code>
              </pre>
              <pre className="snippet snippetCode">
                <code>{`import { getIcon } from 'ghicons';

<img src="node_modules/ghicons/svg/adinkra/GyeNyame.svg">`}</code>
              </pre>
            </div>
          </div>
          <p className="bandFoot">
            Vue, Svelte, Web Components and Flutter are planned.{' '}
            <Link href="/about#roadmap" className="inlineLink">
              See what is coming
            </Link>
          </p>
        </section>

        <section className="band bandClose">
          <h2 className="bandTitle">Add a symbol</h2>
          <div className="prose">
            <p>
              The collection grows by contribution, and most of what it needs is not code. Drawing
              a symbol takes an SVG. Documenting what a symbol means takes research and careful
              sourcing — many icons still have no recorded meaning, and that is the work the
              project most needs right now.
            </p>
          </div>
          <div className="heroActions">
            <Link href="/about#contributing" className="btn btnPrimary">
              How to contribute
            </Link>
            <a
              className="btn"
              href="https://github.com/ProfessorBlackman/ghicons"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the repository
            </a>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <a href="https://methuselah.site" target="_blank" rel="noopener noreferrer">
          Built by The Laughing Chicken
        </a>
      </footer>
    </HomeRoot>
  )
}

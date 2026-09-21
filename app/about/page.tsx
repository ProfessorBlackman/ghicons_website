import Link from 'next/link'
import { Adinkrahene, GhanaCedi, GhanaFlag } from '@ghicons/react'
import { icons } from 'ghicons'
import NavBar from '../components/nav-bar'
import HomeRoot from '../home-client'
import '../home.css'
import './about.css'

const REPO = 'https://github.com/ProfessorBlackman/ghicons'

const countIn = (category: string) => icons.filter((i) => i.category === category).length
const documented = icons.filter((i) => i.meaning).length

export const metadata = {
  title: 'About — ghicons',
  description:
    'What Adinkra symbols are, how GHIcons researches and represents them, and how to contribute — including the work that needs no code.',
}

export default function AboutPage() {
  return (
    <HomeRoot>
      <NavBar />

      <header className="aboutHead">
        <h1 className="heroTitle aboutTitle">About the collection</h1>
        <p className="heroLead">
          GHIcons is a collection of Ghanaian cultural symbols kept in a form software can use.
          This page covers what the symbols are, how the project handles their meanings, and how
          to help.
        </p>
      </header>

      <main className="homeMain">
        <section className="band" id="adinkra">
          <h2 className="bandTitle">What Adinkra symbols are</h2>
          <div className="prose">
            <p>
              Adinkra are visual symbols of Akan origin, associated most closely with the Asante of
              Ghana. Each one stands for a concept, a proverb or an aphorism — Gye Nyame for the
              supremacy of God, Sankofa for learning from the past, Dwennimmen for humility
              together with strength.
            </p>
            <p>
              They are traditionally printed onto cloth with stamps carved from calabash, arranged
              in a grid and divided by lines drawn with a comb. That grid is where the shape of
              this site&apos;s home page comes from, and it is also why the symbols translate so
              readily into icons: they were designed to be stamped, repeated, and read at a glance.
            </p>
          </div>
        </section>

        <section className="band" id="categories">
          <h2 className="bandTitle">What is in the collection</h2>
          <div className="categoryList">
            <article className="categoryItem">
              <Adinkrahene className="categoryMark" aria-hidden="true" />
              <div>
                <h3 className="categoryName">
                  Adinkra <span className="categoryCount">{countIn('adinkra')}</span>
                </h3>
                <p>
                  The largest part of the collection, and the best documented. Traditional Akan
                  symbols, each carrying a specific meaning.
                </p>
              </div>
            </article>

            <article className="categoryItem">
              <GhanaFlag className="categoryMark" aria-hidden="true" />
              <div>
                <h3 className="categoryName">
                  National <span className="categoryCount">{countIn('national')}</span>
                </h3>
                <p>
                  Symbols representing Ghana as a nation. Several national emblems are multicolour
                  in life; the collection is monochrome for now, so they ship as silhouettes until
                  colour support lands.
                </p>
              </div>
            </article>

            <article className="categoryItem">
              <GhanaCedi className="categoryMark" aria-hidden="true" />
              <div>
                <h3 className="categoryName">
                  General <span className="categoryCount">{countIn('general')}</span>
                </h3>
                <p>
                  Ghanaian concepts and objects outside the Adinkra canon — currency, everyday
                  iconography, and the things that do not fit elsewhere.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="band" id="accuracy">
          <h2 className="bandTitle">On meanings and accuracy</h2>
          <div className="prose">
            <p>
              These are real cultural symbols, so getting them wrong has a cost. An icon with
              perfect geometry and the wrong name or meaning spreads misinformation about Ghanaian
              culture, and it does it at the scale of every app that installs the package.
            </p>
            <p>
              So the project holds to a few rules. Meanings come from reliable sources, not from
              what sounds plausible. Where interpretations differ, that is said plainly rather than
              one reading being presented as settled. And where nobody has done the research yet,
              the icon says so instead of inventing something.
            </p>
            <p className="statLine">
              Documented meanings so far: {documented} of {icons.length}.
            </p>
            <p>
              That is the honest state of the collection today. The field is there in the registry
              and waiting to be filled, and moving that number is the most useful thing anyone can
              do here.{' '}
              <a
                className="inlineLink"
                href={`${REPO}/blob/master/docs/wiki/Cultural-Guidelines.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the cultural guidelines
              </a>
            </p>
          </div>
        </section>

        <section className="band" id="contributing">
          <h2 className="bandTitle">How to contribute</h2>
          <p className="bandLead">
            Most of what this project needs is not code. Pick whichever of these fits you.
          </p>

          <div className="ways">
            <article className="way">
              <h3 className="wayTitle">Research a symbol&apos;s meaning</h3>
              <p>
                Take a symbol that has no recorded meaning, find reliable sources, and write up
                what it represents with citations. No code, no design tools. This is the work the
                collection is most short of.
              </p>
              <a className="inlineLink" href={`${REPO}/issues/new`} target="_blank" rel="noopener noreferrer">
                Open an issue with what you find
              </a>
            </article>

            <article className="way">
              <h3 className="wayTitle">Draw a symbol</h3>
              <p>
                Add a Ghanaian symbol that is missing. You supply one SVG on a 24×24 canvas using{' '}
                <code>currentColor</code> — the project generates every package from it, so you
                never write framework code.
              </p>
              <a
                className="inlineLink"
                href={`${REPO}/blob/master/docs/ICON-SPEC.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the icon specification
              </a>
            </article>

            <article className="way">
              <h3 className="wayTitle">Request or correct one</h3>
              <p>
                Know a symbol that should be here, or spot one that is named or drawn wrongly?
                Say so. Corrections to existing icons are as valuable as new ones.
              </p>
              <a
                className="inlineLink"
                href={`${REPO}/issues/new?template=icon_request.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a symbol
              </a>
            </article>

            <article className="way">
              <h3 className="wayTitle">Build an integration</h3>
              <p>
                Vue, Svelte, Web Components and Flutter are all planned and all unclaimed. An
                integration is a generator over the existing collection, not a redraw of 106 icons.
              </p>
              <a
                className="inlineLink"
                href={`${REPO}/blob/master/docs/ARCHITECTURE.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the architecture
              </a>
            </article>
          </div>
        </section>

        <section className="band bandClose" id="roadmap">
          <h2 className="bandTitle">What is coming</h2>
          <div className="prose">
            <p>
              GHIcons is pre-1.0. The icon collection and the React API are usable now; the pieces
              below are in progress or planned.
            </p>
          </div>
          <ul className="roadmap">
            <li>
              <span className="roadmapWhen">Next</span>
              Documented meanings, search keywords and alternate names for the whole collection
            </li>
            <li>
              <span className="roadmapWhen">Next</span>
              Automated tests across the generation pipeline
            </li>
            <li>
              <span className="roadmapWhen">1.0</span>
              A stable icon specification, registry format and React API
            </li>
            <li>
              <span className="roadmapWhen">Later</span>
              More of the collection — ceremonial objects, the coat of arms, Kente-inspired motifs
            </li>
            <li>
              <span className="roadmapWhen">Later</span>
              Multicolour support, so symbols that are not monochrome in life can be represented
              faithfully
            </li>
            <li>
              <span className="roadmapWhen">Later</span>
              Vue, Svelte, Web Components and Flutter packages
            </li>
          </ul>
          <p className="bandFoot">
            The full roadmap, with everything it depends on, lives{' '}
            <a
              className="inlineLink"
              href={`${REPO}/blob/master/docs/wiki/Roadmap.md`}
              target="_blank"
              rel="noopener noreferrer"
            >
              in the repository
            </a>
            .
          </p>
          <div className="heroActions">
            <Link href="/icons" className="btn btnPrimary">
              Browse the icons
            </Link>
            <a className="btn" href={REPO} target="_blank" rel="noopener noreferrer">
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

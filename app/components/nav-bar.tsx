'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AbusuaPa } from '@ghicons/react'
import { useTheme } from './theme-provider'
import './nav-bar.css'

export default function NavBar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={`navBar${theme === 'dark' ? ' isDark' : ''}`}>
      <Link href="/" className="navLogo">
        <AbusuaPa size={28} color="currentColor" />
        <span className="navLogoText">ghicons</span>
      </Link>

      <div className="navLinks">
        <button
          type="button"
          className="themeToggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm9-9a1 1 0 0 1 0 2h-1a1 1 0 1 1 0-2h1zM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm14.657-5.657a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-12.728 12.728a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm12.728 0a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM5.929 6.757a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 0 1 5.222 4.636l.707.707a1 1 0 0 1 0 1.414zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          )}
        </button>
        <Link href="/" className={`navLink ${pathname === '/' ? 'navLinkActive' : ''}`}>
          Browse
        </Link>
        <Link href="/docs" className={`navLink ${pathname === '/docs' ? 'navLinkActive' : ''}`}>
          Docs
        </Link>
        <a
          href="https://www.npmjs.com/package/ghicons"
          target="_blank"
          rel="noopener noreferrer"
          className="navLinkExternal"
        >
          <svg width="16" height="16" viewBox="0 0 780 250" fill="currentColor" aria-hidden="true">
            <path d="M240 250H0V0h240v210h60V0h60v250h-60V40h-60z" />
            <path d="M480 0h300v250H480V40h60v170h60V40h60v170h60V0z" />
          </svg>
          npm
        </a>
        <a
          href="https://github.com/ProfessorBlackman/ghicons"
          target="_blank"
          rel="noopener noreferrer"
          className="navLinkExternal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </nav>
  )
}

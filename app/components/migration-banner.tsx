'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from './theme-provider'
import './migration-banner.css'

const DISMISS_KEY = 'ghicons:migration-notice:0.1.0'

/**
 * Site-wide notice for the 0.1.0 break, where `ghicons` stopped being the React
 * package and the components moved to `@ghicons/react`.
 *
 * Dismissible and remembered, because someone who has already migrated should
 * not keep being told to. Rendered only after mount so the server and client
 * markup agree — reading localStorage during render would hydrate mismatched.
 *
 * Sits inside ThemeProvider so it follows the in-page toggle rather than the
 * OS preference, which would leave it light on a dark page.
 */
export default function MigrationBanner() {
  const { theme } = useTheme()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) !== 'dismissed') setVisible(true)
    } catch {
      // private mode or blocked storage — show it rather than hide it
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      window.localStorage.setItem(DISMISS_KEY, 'dismissed')
    } catch {
      // nothing to do; it will reappear next visit
    }
  }

  if (!visible) return null

  return (
    <div
      className={`migrationBanner ${theme === 'dark' ? 'isDark' : ''}`}
      role="region"
      aria-label="Package migration notice"
    >
      <div className="migrationBannerInner">
        <span className="migrationBannerTag">Heads up</span>
        <p className="migrationBannerText">
          <strong>
            <code>ghicons</code> changed meaning in 0.1.0.
          </strong>{' '}
          It is now the framework-agnostic core; React components moved to{' '}
          <code>@ghicons/react</code>.
        </p>
        <Link href="/docs#migrating" className="migrationBannerLink">
          How to upgrade
        </Link>
        <button
          type="button"
          className="migrationBannerClose"
          onClick={dismiss}
          aria-label="Dismiss this notice"
          title="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  )
}

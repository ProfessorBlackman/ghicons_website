'use client'

import { useTheme } from '../components/theme-provider'

export default function DocsRoot({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return (
    <div className={`docsRoot ${theme === 'dark' ? 'isDark' : 'isLight'}`}>
      {children}
    </div>
  )
}

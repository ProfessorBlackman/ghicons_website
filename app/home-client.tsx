'use client'

import { useTheme } from './components/theme-provider'

export default function HomeRoot({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return <div className={`homeRoot ${theme === 'dark' ? 'isDark' : 'isLight'}`}>{children}</div>
}

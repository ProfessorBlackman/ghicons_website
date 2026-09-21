import { icons } from 'ghicons'
import { openGraphFor } from '../lib/og'
import IconsClient from './icons-client'

export const metadata = {
  title: 'Browse icons',
  description: `Browse all ${icons.length} Ghanaian symbols. Filter by category, search by name or slug, preview at any size and colour, and copy the code or the raw SVG.`,
  alternates: { canonical: '/icons/' },
  openGraph: openGraphFor({ url: '/icons/' }),
}

export default function IconsPage() {
  return <IconsClient />
}

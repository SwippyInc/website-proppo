import Showreel from '@/components/Showreel'

// Ambient product showreel for demo screens / background tabs.
// Deliberately noindex — an internal utility screen, not a marketing page.
export const metadata = {
  title: 'Proppo — Product Showreel',
  description: 'A looping product tour of Proppo: one system for every property, from a single cottage to a full resort.',
  robots: { index: false, follow: false },
}

export default function LoopPage() {
  return <Showreel />
}

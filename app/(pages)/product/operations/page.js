'use client'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FeatureSection from '@/components/FeatureSection'
import { FinalCTABand } from '@/components/Sections'

// Content per proppo-site-spec.md Section 9 (tone: neutral)
const SECTIONS = [
  {
    id: 'restaurant',
    eyebrow: 'Restaurant',
    headline: 'Turn your in-house restaurant into a self-service menu',
    features: [
      { lead: 'QR Menu', rest: '— digital menu, QR ordering, table & room ordering' },
      { lead: 'Kitchen Management', rest: '— kitchen dashboard, live orders, KOT printing, order queue, order status' },
      { lead: 'Billing', rest: '— restaurant billing, room posting, GST invoices, multiple payment modes' },
    ],
    assets: [
      { label: 'QR menu ordering demo', path: '/assets/product/restaurant/qr-menu-demo.mp4' },
      { label: 'Kitchen dashboard — live orders & KOT queue', path: '/assets/product/restaurant/kitchen-dashboard.png' },
    ],
  },
  {
    id: 'housekeeping',
    eyebrow: 'Housekeeping',
    headline: 'Know the state of every room, without a single walkie-talkie call',
    body: 'Housekeeping staff get their own login and view — built for their workflow, not a stripped-down version of the front desk screen.',
    features: [
      'Room status (dirty/clean/in progress)',
      'Staff assignment',
      'Cleaning tracking',
      'Room readiness',
      'Real-time updates',
      'Dedicated housekeeping login',
    ],
    flip: true,
    alt: true,
  },
  {
    id: 'vendors',
    eyebrow: 'Vendors & Procurement',
    headline: 'Know what your F&B actually costs, down to the ingredient',
    body: 'Beyond tracking purchases, Proppo ties vendor and stock data to recipe costing — so you know true food cost, not just what you spent.',
    features: [
      'Vendor management',
      'Purchase entries by category',
      'Stock management',
      'Recipe-based cost tracking',
      'Inventory valuation',
      'Purchase history',
    ],
  },
]

export default function Operations() {
  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/product', label: 'Product', current: 'Operations' }}
        title={<span className="italic text-brand-primary">Operations</span>}
        sub="Restaurant, housekeeping, and vendors — the back of house, finally in the same system as the front."
      />

      {SECTIONS.map((section) => (
        <FeatureSection key={section.id} {...section} />
      ))}

      <FinalCTABand />
      <Footer />
    </>
  )
}

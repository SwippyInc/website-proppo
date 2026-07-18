'use client'
import SolutionPage from '@/components/SolutionPage'

// proppo-site-spec.md Section 11.1 — tone: formal · path: /solutions/hotels-resorts
export default function HotelsResorts() {
  return (
    <SolutionPage
      tone="formal"
      crumb={{ href: '/', label: 'Home', current: 'Hotels & Resorts' }}
      title={<>Full-service operations, <span className="italic text-brand-primary">run from one system</span></>}
      sub="Room inventory, F&B, housekeeping, finance, and distribution — for properties with departments to coordinate, not just rooms to sell."
      body="Larger properties bring more moving parts: bigger room counts, in-house restaurants, multi-department staff, and OTA distribution at scale. Proppo covers the full operation — not just the booking calendar — with role-based access so each department works from the view built for them."
      painsTitle="What this segment struggles with"
      pains={[
        'Coordinating housekeeping and room status across a large property',
        'Running F&B alongside room operations without separate systems',
        'Managing OTA distribution at scale without manual rate updates',
        'Giving finance and ops teams the reporting they need without IT overhead',
      ]}
      features={['Channel Manager', 'Multi-Property & Command Center', 'Restaurant', 'Finance & GST', 'User Management & Roles']}
      asset="/assets/solutions/hotels/property-hero.jpg"
      extraAsset={{ label: 'Multi-department dashboard view', path: '/assets/solutions/hotels/dashboard-multi-dept.png' }}
    />
  )
}

'use client'
import SolutionPage from '@/components/SolutionPage'

// proppo-site-spec.md Section 11.3 — tone: playful · path: /solutions/homestays-bnbs
export default function HomestaysBnbs() {
  return (
    <SolutionPage
      tone="playful"
      crumb={{ href: '/', label: 'Home', current: 'Homestays & BnBs' }}
      title={<>Run it like a pro. <span className="italic text-brand-primary">Still just you.</span></>}
      sub="Everything a small property needs, nothing it doesn’t."
      body="Most homestays run on one or two people, sometimes just the owner. Proppo is built so you can manage bookings, guest questions, and every OTA listing without needing a front desk team you don’t have."
      painsTitle="Pain points"
      pains={[
        'Answering the same guest questions on repeat, with no front desk to hand it to',
        'Keeping a handful of listings in sync by hand',
        'Wanting a professional booking experience without hotel-scale software',
      ]}
      features={['Communication (WhatsApp)', 'Web Check-in', 'Direct Booking Engine', 'Channel Manager']}
      asset="/assets/solutions/homestays/property-hero.jpg"
    />
  )
}

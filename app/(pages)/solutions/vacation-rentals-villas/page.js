'use client'
import SolutionPage from '@/components/SolutionPage'

// proppo-site-spec.md Section 11.2 — tone: playful · path: /solutions/vacation-rentals-villas
export default function VacationRentalsVillas() {
  return (
    <SolutionPage
      tone="playful"
      crumb={{ href: '/', label: 'Home', current: 'Vacation Rentals & Villas' }}
      title={<>Sell it whole. Sell it by the room. <span className="italic text-brand-primary">Never sell it twice.</span></>}
      sub="Virtual inventory built for exactly how villas actually get booked."
      body="Villa and vacation rental guests don’t all book the same way — some want the whole place, some just need a room. Proppo’s virtual inventory was built around that, so you can list both without ever risking a double booking."
      painsTitle="Pain points"
      pains={[
        'Selling a villa whole and by room without overlap',
        'Keeping Airbnb, Booking.com, and direct bookings in sync',
        'Managing a growing portfolio from one dashboard',
      ]}
      features={['Virtual Inventory', 'Channel Manager', 'Direct Booking Engine', 'Rate Plans & Pricing']}
      asset="/assets/solutions/villas/property-hero.jpg"
    />
  )
}

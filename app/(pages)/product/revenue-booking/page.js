'use client'
import { BadgeCheck, BedDouble, CalendarDays, ChevronDown, Users } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FeatureSection from '@/components/FeatureSection'
import BrowserFrame from '@/components/BrowserFrame'
import { FinalCTABand } from '@/components/Sections'

// Content per proppo-site-spec.md Section 7 (tone: neutral)
const SECTIONS = [
  {
    id: 'rate-plans',
    eyebrow: 'Rate Plans & Pricing',
    headline: 'Price the way your guests actually book',
    features: [
      'Seasonal pricing',
      'Weekend pricing',
      'Occupancy pricing',
      'Extra adult/child pricing',
      'Taxes & GST',
      'Discounts & coupons',
      'Corporate rates',
      'Travel agent rates',
    ],
  },
  {
    id: 'direct-booking-engine',
    eyebrow: 'Direct Booking Engine',
    headline: 'Get more bookings without paying commission',
    features: [
      'Website booking widget',
      'Mobile-friendly booking engine',
      'Zero-commission direct bookings',
      'Live availability',
      'Secure payments',
      'Google Free Booking Links',
      'Promo codes',
      'Automated direct booking confirmation',
    ],
    visual: 'booking-widget',
    flip: true,
    alt: true,
  },
  {
    id: 'website-builder',
    eyebrow: 'Website Builder',
    headline: 'A property website that\u2019s built to convert, not just to look nice',
    features: [
      'Templates for hotel website generation',
      'Native booking engine integration',
      'Mobile responsive',
      'SEO-ready',
      'Contact forms',
      'Gallery',
      'Amenities listing',
      'Nearby attractions',
    ],
  },
]

// Pure-CSS booking-widget mock for Section 7.2 — illustrative mock labels only, not a working widget.
function BookingWidgetMock() {
  return (
    <BrowserFrame url="book.yourproperty.in">
      <div className="rounded-xl bg-surface-bg p-4 md:p-5">
        {/* property header + zero-commission chip */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <BedDouble size={16} className="text-brand-primary" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink leading-tight">Your Property</p>
              <p className="text-[11px] text-ink-muted">Direct booking · best available rate</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-semantic-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-semantic-success">
            <BadgeCheck size={11} /> Zero commission
          </span>
        </div>

        {/* check-in / check-out */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-line bg-surface-card px-3 py-2.5">
            <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              <CalendarDays size={11} /> Check-in
            </p>
            <p className="text-sm font-medium text-ink mt-0.5">Fri, 18 Jul</p>
          </div>
          <div className="rounded-xl border border-line bg-surface-card px-3 py-2.5">
            <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              <CalendarDays size={11} /> Check-out
            </p>
            <p className="text-sm font-medium text-ink mt-0.5">Sun, 20 Jul</p>
          </div>
        </div>

        {/* guests selector */}
        <div className="mt-2.5 flex items-center justify-between rounded-xl border border-line bg-surface-card px-3 py-2.5">
          <div>
            <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              <Users size={11} /> Guests
            </p>
            <p className="text-sm font-medium text-ink mt-0.5">2 adults · 1 room</p>
          </div>
          <ChevronDown size={14} className="text-ink-muted" />
        </div>

        {/* CTA */}
        <button type="button" className="btn btn_v2_pri mt-3 w-full rounded-pill px-4 py-2.5 text-sm font-medium">
          Check availability
        </button>
        <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-semantic-success" />
          Live availability · secure payment · instant confirmation
        </p>
      </div>
    </BrowserFrame>
  )
}

export default function RevenueBooking() {
  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/product', label: 'Product', current: 'Revenue & Booking' }}
        title={<>Revenue <span className="italic text-brand-primary">&amp;</span> Booking</>}
        sub="Rate plans, the direct booking engine, and the website builder — everything that turns lookers into bookers."
      />

      {SECTIONS.map((section) => (
        <FeatureSection key={section.id} {...section}>
          {section.visual === 'booking-widget' ? <BookingWidgetMock /> : undefined}
        </FeatureSection>
      ))}

      <FinalCTABand />
      <Footer />
    </>
  )
}

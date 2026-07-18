'use client'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FeatureSection from '@/components/FeatureSection'
import BrowserFrame from '@/components/BrowserFrame'
import { BookingEngineScene, WebsiteBuilderScene, RatePlansScene } from '@/components/ProductScenes'
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
    visual: 'rate-plans',
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
    visual: 'website-builder',
  },
]

const VISUALS = {
  'rate-plans': () => <RatePlansScene />,
  'booking-widget': () => (
    <BrowserFrame url="book.yourproperty.in">
      <BookingEngineScene />
    </BrowserFrame>
  ),
  'website-builder': () => <WebsiteBuilderScene />,
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
          {VISUALS[section.visual]?.()}
        </FeatureSection>
      ))}

      <FinalCTABand />
      <Footer />
    </>
  )
}

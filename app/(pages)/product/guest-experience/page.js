'use client'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FeatureSection from '@/components/FeatureSection'
import SceneMedia from '@/components/SceneMedia'
import { FinalCTABand } from '@/components/Sections'

// Content per proppo-site-spec.md Section 8
const SECTIONS = [
  {
    id: 'web-check-in',
    eyebrow: 'Web Check-in',
    headline: 'Let guests check in before they even arrive',
    features: [
      'Online check-in ahead of arrival',
      'ID upload',
      'Faster front desk turnaround',
    ],
  },
  {
    id: 'guidebook',
    eyebrow: 'Guidebook',
    headline: 'Everything a guest needs to know, sent as one link',
    subheadline: 'A digital guide, unique to each property, delivered automatically or by your team.',
    body: 'Every property\u2019s Guidebook is fully configurable, house rules, Wi-Fi, restaurant menu, nearby attractions, emergency contacts, and check-out instructions, all specific to that property. It\u2019s sent to guests via automated WhatsApp (when enabled) or shared manually by staff.',
    features: [
      'Property information',
      'House rules',
      'Wi-Fi details',
      'Restaurant menu',
      'Nearby attractions',
      'Emergency contacts',
      'Check-out instructions',
      'Delivered via automated WhatsApp or manual staff share',
    ],
    visual: 'phone',
    flip: true,
    alt: true,
  },
  {
    id: 'communication',
    eyebrow: 'Communication',
    headline: 'Answer guests before they have to ask',
    features: [
      'Email confirmations',
      'WhatsApp Business integration',
      'Automated guest messaging',
      'Booking confirmations',
      'Check-in reminders',
    ],
    visual: 'chat',
  },
]

// 8.2 visual — the guest-facing Guidebook on a phone. SceneMedia renders the
// animated guidebook scene for this asset path (see components/SceneMedia.jsx).
function GuidebookPhone() {
  return (
    <div className="rounded-[2.5rem] border border-line bg-surface-card p-3 shadow-2xl max-w-[280px] mx-auto w-full">
      {/* speaker hint so the wrapper reads as a phone */}
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-line" />
      <SceneMedia
        label="Guidebook · guest view (mobile)"
        path="/assets/product/guidebook/guest-view-mobile.png"
        aspect="aspect-[9/16]"
      />
    </div>
  )
}

// 8.3 visual — WhatsApp-style mock of the automated guest messages (illustrative labels only).
const CHAT_MESSAGES = [
  { text: 'Booking confirmed · Cedar Villa, 12-14 Jun', time: '10:02' },
  { text: 'Your check-in link: proppo.in/checkin/\u2026', time: '10:02' },
  { text: 'Check-in reminder: tomorrow, from 1:00 PM', time: '09:30' },
]

function ChatMock() {
  return (
    <div className="bg-[#ECE5DD] rounded-2xl border border-line p-4 flex flex-col gap-2.5">
      {CHAT_MESSAGES.map((message) => (
        <div key={message.text} className="max-w-[85%] self-start bg-white rounded-xl px-3 py-2 shadow-sm">
          <p className="text-xs text-ink-secondary leading-relaxed">{message.text}</p>
          <p className="text-[10px] text-ink-muted text-right mt-1">{message.time}</p>
        </div>
      ))}
    </div>
  )
}

export default function GuestExperience() {
  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/product', label: 'Product', current: 'Guest Experience' }}
        title={<>Guest <span className="italic text-brand-primary">Experience</span></>}
        sub="Web check-in, the guidebook, and guest communication, the stay, before and after arrival."
      />

      {SECTIONS.map((section) => (
        <FeatureSection key={section.id} {...section}>
          {section.visual === 'phone' ? <GuidebookPhone /> : section.visual === 'chat' ? <ChatMock /> : undefined}
        </FeatureSection>
      ))}

      <FinalCTABand />
      <Footer />
    </>
  )
}

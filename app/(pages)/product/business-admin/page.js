'use client'
import { motion } from 'framer-motion'
import { Check, Building2 } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FeatureSection from '@/components/FeatureSection'
import { FinalCTABand } from '@/components/Sections'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Content per proppo-site-spec.md Section 10 (tone: neutral, slightly more formal)

// 10.3 — the 10 named roles, rendered as chips below the feature list
const ROLES = ['Owner', 'Admin', 'Reception', 'Front Desk', 'Finance', 'Housekeeping', 'Kitchen', 'Restaurant Staff', 'Manager', 'Accountant']

// 10.8 — the five integrations, rendered as chips; Airpay gets the coming-soon treatment
const INTEGRATIONS = [
  { name: 'Channel Manager' },
  { name: 'Razorpay' },
  { name: 'Airpay (coming soon)', soon: true },
  { name: 'WhatsApp Business API' },
  { name: 'Google Free Booking Links' },
]

const CHIP = 'border border-line rounded-pill px-3 py-1 text-xs text-ink-secondary bg-surface-card'
const CHIP_SOON = 'rounded-pill px-3 py-1 text-xs font-medium text-brand-accent bg-brand-accent/10'

const SECTIONS = [
  {
    id: 'finance-gst',
    eyebrow: 'Finance & GST',
    headline: 'Month-end, without the spreadsheet archaeology',
    body: (
      <>
        GST and accounting reporting is built around how Indian properties actually file, a monthly order-level export broken down by HSN/SAC code and slab rate, with a full B2B invoice summary including buyer details, ready to hand to your accountant.
      </>
    ),
    features: [
      'Revenue reports',
      'Payment reports',
      'Outstanding payments & collections',
      'Accounting records',
      { lead: 'GST-ready monthly export', rest: '· HSN/SAC-wise breakdown, B2B invoice summary' },
      'Cash tracking',
    ],
  },
  {
    id: 'reports',
    eyebrow: 'Reports & Analytics',
    headline: 'Your numbers, without building your own dashboard',
    features: [
      'Occupancy',
      'Revenue',
      'ADR',
      'Booking trends',
      'Channel mix',
      'Payment reports',
      'Outstanding reports',
      'Room performance',
      'Export to CSV and Excel',
    ],
    alt: true,
  },
  {
    id: 'user-management',
    eyebrow: 'User Management & Roles',
    headline: 'Everyone sees exactly what they need, nothing more',
    body: '10+ roles, each with defined permissions, Owner, Admin, Reception, Front Desk, Finance, Housekeeping, Kitchen, Restaurant Staff, Manager, Accountant, and more.',
    features: [
      'Role-based access with defined permissions per role',
      'No shared logins',
    ],
    extra: 'roles',
  },
  {
    id: 'multi-property',
    eyebrow: 'Multi-Property & Command Center',
    headline: 'Run one property, or twenty, from the same login',
    body: 'Switch between properties instantly, or step back and view all of them at once in the Command Center, cumulative performance across your entire portfolio in one screen.',
    features: [
      'Multi-property switching',
      { lead: 'Command Center', rest: '· cumulative cross-property view' },
      'Separate inventory per property',
      'Separate staff per property',
      'Property-wise reporting',
    ],
    visual: 'command-center',
    flip: true,
    alt: true,
  },
  {
    id: 'payments',
    eyebrow: 'Payments',
    headline: 'Collect payments the way your guests want to pay',
    body: 'Live via Razorpay, cards, UPI, netbanking, wallets, and EMI, plus support for partial deposits. Airpay integration is coming soon.',
    features: [
      'Full range of Razorpay-supported payment methods',
      'Partial deposit support',
      'Payment links',
      'Online payment collection',
    ],
    extra: 'airpay',
  },
  {
    id: 'mobile-apps',
    eyebrow: 'Mobile Apps',
    headline: 'Your property, in your pocket, full stop',
    body: 'The Proppo mobile app isn\u2019t a stripped-down companion to the dashboard. It has full feature parity with web, including rate and inventory management.',
    features: [
      'Full feature parity with web dashboard',
      'Booking management',
      'Check-ins',
      'Revenue overview',
      'Real-time notifications',
      'Multi-property support',
    ],
    extra: 'badges',
    alt: true,
  },
  {
    id: 'travel-agents',
    eyebrow: 'Travel Agent Module',
    headline: 'Every agent booking, tracked automatically',
    body: 'Add travel agents once. Choose them as a booking source, and it\u2019s automatically logged to that agent\u2019s ledger, with automated messages sent on any action related to their booking.',
    features: [
      'Travel agent directory',
      'Per-agent booking ledger',
      'Automated agent notifications',
      'Offline partner management',
    ],
  },
  {
    id: 'integrations',
    eyebrow: 'Integrations',
    headline: 'Proppo works with what you already use',
    extra: 'integrations',
    alt: true,
  },
]

// FeatureSection has no slot below the feature list, so sections whose spec
// content sits under the features (role chips, Airpay chip, store badges,
// integration chips) render through this mirror of its text-only layout —
// same tokens, same spacing, plus a children slot after the list.
function TextSection({ id, eyebrow, headline, body, features = [], alt = false, children }) {
  return (
    <section id={id} className={`py-12 md:py-24 ${alt ? 'bg-surface-bg-alt' : 'bg-surface-bg'}`}>
      <div className="w_80_90 max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">{eyebrow}</p>}
          <h2 className="font-display text-2xl md:text-4xl font-medium text-ink mb-3">{headline}</h2>
          {body && <p className="text-sm md:text-base text-ink-secondary mb-6">{body}</p>}
          {features.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-6">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <Check size={16} className="text-semantic-success shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}

function ChipGrid({ items }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {items.map((item, i) => {
        const name = typeof item === 'string' ? item : item.name
        return (
          <motion.span
            key={name}
            className={item.soon ? CHIP_SOON : CHIP}
            variants={fadeInUp}
            transition={{ delay: i * 0.04 }}
          >
            {name}
          </motion.span>
        )
      })}
    </div>
  )
}

// 10.6 — stand-ins for the real App Store / Google Play badge assets
function AppBadges() {
  return (
    <div className="flex flex-wrap gap-3 mt-8">
      {['App Store', 'Google Play'].map((store) => (
        <button
          key={store}
          type="button"
          className="border border-line rounded-xl px-5 py-2.5 text-sm font-medium text-ink bg-surface-card transition-colors hover:border-brand-primary/50"
        >
          {store}
        </button>
      ))}
    </div>
  )
}

// 10.4 — pure-CSS Command Center stand-in: per-property rows + portfolio total
function CommandCenterMock() {
  const properties = [
    { name: 'Cedar Villa', detail: '3 rooms', revenue: '₹2.4L', occupancy: '86%' },
    { name: 'Pine Lodge', detail: '8 rooms', revenue: '₹5.1L', occupancy: '72%' },
    { name: 'Hillcrest Resort', detail: '24 rooms', revenue: '₹11.8L', occupancy: '64%' },
  ]
  return (
    <div className="bg-surface-card border border-line rounded-2xl shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-surface-bg-alt">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <Building2 size={16} className="text-brand-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink leading-tight">Command Center</p>
            <p className="text-[11px] text-ink-muted">3 properties · this month</p>
          </div>
        </div>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-semantic-success" />
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2.5">
        {properties.map((property) => (
          <div key={property.name} className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{property.name}</p>
              <p className="text-[11px] text-ink-muted">{property.detail}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-ink">{property.revenue}</p>
              <p className="text-[11px] text-semantic-success">{property.occupancy} occupancy</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-xl bg-brand-primary text-ink-inverse px-4 py-3">
          <p className="text-sm font-semibold">Portfolio total</p>
          <p className="text-sm font-semibold">₹19.3L</p>
        </div>
      </div>
      <p className="px-5 pb-4 text-[10px] font-mono text-ink-muted/70 text-center">illustrative preview · not live data</p>
    </div>
  )
}

export default function BusinessAdmin() {
  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/product', label: 'Product', current: 'Business & Admin' }}
        title={<>Business <span className="italic text-brand-primary">&amp;</span> Admin</>}
        sub="Finance, reporting, roles, and multi-property control, built for the people who answer for the numbers."
      />

      {SECTIONS.map((section) =>
        section.extra ? (
          <TextSection key={section.id} {...section}>
            {section.extra === 'roles' && <ChipGrid items={ROLES} />}
            {section.extra === 'airpay' && <span className={`inline-block mt-6 ${CHIP_SOON}`}>Airpay · coming soon</span>}
            {section.extra === 'badges' && <AppBadges />}
            {section.extra === 'integrations' && <ChipGrid items={INTEGRATIONS} />}
          </TextSection>
        ) : (
          <FeatureSection key={section.id} {...section}>
            {section.visual === 'command-center' ? <CommandCenterMock /> : undefined}
          </FeatureSection>
        )
      )}

      <FinalCTABand />
      <Footer />
    </>
  )
}

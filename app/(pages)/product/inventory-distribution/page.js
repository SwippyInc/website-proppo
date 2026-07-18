'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FeatureSection from '@/components/FeatureSection'
import VillaDiagram from '@/components/VillaDiagram'
import Marquee from '@/components/Marquee'
import { VerifyTag } from '@/components/MediaPlaceholder'
import { FinalCTABand } from '@/components/Sections'
import { OTAS } from '@/constants'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Content per proppo-site-spec.md Section 6
const SECTIONS = [
  {
    id: 'rooms-inventory',
    eyebrow: 'Rooms & Physical Inventory',
    headline: 'Room types, beds, amenities — set up once, used everywhere',
    features: ['Room types', 'Individual rooms', 'Bed configuration', 'Amenities', 'Capacity'],
  },
  {
    id: 'virtual-inventory',
    eyebrow: 'Virtual Inventory',
    differentiator: true,
    headline: 'Sell the whole villa, and every room inside it — without ever double-selling a bed',
    subheadline: 'One of Proppo\u2019s core differentiators: list entire properties and individual rooms as linked inventory.',
    body: 'Guests don\u2019t all book the same way. Some want a whole villa; others just need one room. Proppo lets you list both — entire villas, individual rooms, and combined configurations — from linked inventory that automatically prevents double bookings between them.',
    features: [
      'Entire villa listings',
      'Individual room listings',
      'Combined room configurations',
      'Linked inventory with automatic overbooking prevention across every configuration',
    ],
    visual: 'villa',
    flip: true,
    alt: true,
  },
  {
    id: 'channel-manager',
    eyebrow: 'Channel Manager',
    differentiator: true,
    headline: 'Never double-book a room again',
    subheadline: 'Real-time inventory, rate, restriction, and booking sync across every connected OTA.',
    features: [
      'Real-time inventory sync',
      'Rate sync',
      'Restriction sync — Stop Sell, Min/Max Stay, Closed to Arrival/Departure',
      'Booking sync',
      '300+ OTA connectivity',
    ],
    assets: [{ label: 'Real-time sync across connected OTAs', path: '/assets/product/channel-manager/sync-diagram.mp4' }],
  },
]

export default function InventoryDistribution() {
  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/product', label: 'Product', current: 'Inventory & Distribution' }}
        title={<>Inventory &amp; <span className="italic text-brand-primary">Distribution</span></>}
        sub="Rooms, virtual inventory, and the channel manager — what you sell, and everywhere it gets sold."
      />

      {SECTIONS.map((section) => (
        <FeatureSection key={section.id} {...section}>
          {section.visual === 'villa' ? <VillaDiagram /> : undefined}
        </FeatureSection>
      ))}

      {/* OTA directory (spec 6.4) */}
      <section className="py-12 md:py-24 bg-surface-bg-alt">
        <div className="w_80_90">
          <motion.div
            className="max-w-2xl mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Directly connected OTAs</p>
            <h2 className="font-display text-2xl md:text-4xl font-medium text-ink mb-3">Every channel you sell on, in sync</h2>
            <p className="text-sm md:text-base text-ink-secondary">Each connection has its own sync details — pick a channel to see how it works.</p>
          </motion.div>
          <Marquee items={OTAS.map((o) => o.name)} className="mb-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]" />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {OTAS.map((ota, i) => (
              <motion.div key={ota.slug} variants={fadeInUp} transition={{ delay: i * 0.03 }}>
                <Link
                  href={`/product/inventory-distribution/channel-manager/${ota.slug}`}
                  className="group flex items-start gap-4 bg-surface-card border border-line rounded-2xl p-5 h-full transition-all duration-300 hover:border-brand-primary/40 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="h-11 w-11 shrink-0 rounded-xl bg-brand-primary/10 flex items-center justify-center font-display text-xl font-medium text-brand-primary">
                    {ota.name[0]}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-1.5 font-semibold text-ink">
                      {ota.name}
                      {ota.verify && <VerifyTag>{ota.verify}</VerifyTag>}
                      <ArrowRight size={14} className="ml-auto text-brand-primary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </span>
                    <span className="block text-sm text-ink-secondary mt-1 leading-snug">{ota.line}</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FinalCTABand />
      <Footer />
    </>
  )
}

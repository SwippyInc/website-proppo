'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import FeatureSection from '@/components/FeatureSection'
import { FinalCTABand } from '@/components/Sections'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Content per proppo-site-spec.md Section 5
const SECTIONS = [
  {
    id: 'reservations',
    eyebrow: 'Reservations & Booking Calendar',
    headline: 'Every booking, one calendar — drag to change rooms in seconds',
    subheadline: 'Manual, OTA, travel agent, or group bookings all land in the same live calendar.',
    body: 'Move a guest between same-type rooms with drag and drop. Every booking — however it came in — is editable, trackable, and fully audited.',
    features: [
      { lead: 'Manual, OTA, travel agent & group bookings', rest: '— all sources in one dashboard' },
      { lead: 'Drag-and-drop room changes', rest: '— move a reservation between rooms of the same type instantly' },
      { lead: 'Booking history', rest: '— a full audit trail of every action taken on a booking' },
      { lead: 'Booking notes', rest: '— internal context attached to any reservation' },
      { lead: 'Split payments', rest: '— split across OTA, guest, and other payers on the same booking' },
      { lead: 'Automated confirmations', rest: '— email and WhatsApp sent automatically to guest, agent, and hotel' },
    ],
    assets: [
      { label: 'Looping demo — booking calendar in use', path: '/assets/product/reservations/calendar-demo.mp4' },
      { label: 'Drag-and-drop room change', path: '/assets/product/reservations/drag-drop.gif' },
    ],
    alt: true,
  },
  {
    id: 'front-office',
    eyebrow: 'Front Office',
    headline: 'Check-in to check-out, without the paper trail',
    features: [
      'Check-in / Check-out',
      'Room assignment',
      'Early check-in / late check-out',
      'Extend stay',
      'Guest registration & documents',
      'Folios & Invoices',
    ],
    flip: true,
  },
  {
    id: 'availability',
    eyebrow: 'Availability Management',
    headline: 'See what\u2019s open, right now — not what a spreadsheet said this morning',
    features: [
      'Live room availability',
      'Occupancy calendar',
      'Reservation timeline',
      'Block rooms',
      'Maintenance blocks',
      'Hold inventory',
    ],
    alt: true,
  },
]

export default function PropertyManagement() {
  return (
    <>
      <NavBar />
      <div className="pt-28 md:pt-36 pb-12 md:pb-16 bg-surface-bg">
        <motion.div
          className="w_80_90 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <p className="flex items-center justify-center gap-1 text-xs md:text-sm text-ink-muted mb-4">
            <Link href="/product" className="hover:text-brand-primary transition-colors">Product</Link>
            <ChevronRight size={14} />
            <span className="text-ink-secondary">Property Management</span>
          </p>
          <h1 className="font-display font-medium text-3xl md:text-5xl text-ink">
            <span className="underline-accent">Property Management</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-sm md:text-lg text-ink-secondary">
            Reservations, front office, and availability — the day-to-day core of running a property.
          </p>
        </motion.div>
      </div>
      {SECTIONS.map((section) => (
        <FeatureSection key={section.id} {...section} />
      ))}
      <FinalCTABand />
      <Footer />
    </>
  )
}

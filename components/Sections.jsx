'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Radio, Globe, LayoutGrid, MessageCircle, ArrowRight, CalendarDays, RefreshCw, ChefHat, BedDouble, ConciergeBell, Briefcase } from 'lucide-react'
import Button from "./Button"
import { VerifyTag } from "./MediaPlaceholder"
import { SOLUTION_SCENES, CaseStudyScene } from "./SolutionScenes"
import { AlertsPhoneScene } from "./ProductScenes"
import Marquee from "./Marquee"
import { useBookCallForm } from "@/hooks/useForm"
import { SOLUTIONS, OTAS } from "@/constants"

const OTA_NAMES = OTAS.map((ota) => ota.name)

// Animation variants for reusability
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

const PILLARS = [
  { icon: Radio, hook: 'Never double-book a room again', module: 'Channel Manager', body: 'Real-time inventory and rate sync across every OTA you sell on.' },
  { icon: Globe, hook: 'Get more bookings without paying commission', module: 'Direct Booking Engine', body: 'A fast, branded booking flow on your own site.' },
  { icon: LayoutGrid, hook: 'Sell a villa whole, or room by room', module: 'Virtual Inventory', body: 'List both ways from one inventory, with zero risk of overlap.' },
  { icon: MessageCircle, hook: 'Let guests message you on WhatsApp, automatically', module: 'Communication', body: 'Confirmations, check-in links, and updates sent without anyone typing them.' },
]

// Decorative stand-ins for the "system sprawl" the copy calls out
const SPRAWL = ['OTA calendar', 'Rate spreadsheet', 'Guest phone', 'Restaurant login']

export function TrustBar() {
  return (
    <section className="py-6 bg-surface-bg-alt border-y border-line">
      <motion.p
        className="w_80_90 text-center text-xs md:text-sm uppercase tracking-widest text-ink-muted"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        Running on properties across India — from boutique hill-station cottages to full-service resorts
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Marquee items={OTA_NAMES} className="mt-5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]" />
      </motion.div>
    </section>
  )
}

export function ProblemFraming() {
  return (
    <section className="py-12 md:py-24 bg-surface-bg">
      <div className="w_80_90 max-w-3xl text-center flex flex-col items-center">
        <motion.p
          className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          The problem
        </motion.p>
        <motion.h2
          className="font-display text-3xl md:text-[40px] md:leading-[1.15] font-medium text-ink mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          Your property runs on <span className="italic text-brand-accent">more systems</span> than it should.
        </motion.h2>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {SPRAWL.map((item, i) => (
            <motion.span
              key={item}
              className="text-xs md:text-sm text-ink-muted line-through decoration-semantic-error/60 decoration-2 border border-line bg-surface-card rounded-pill px-3 py-1"
              variants={fadeInUp}
              transition={{ delay: i * 0.06 }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          className="text-base md:text-lg text-ink-secondary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          A calendar for OTAs, a spreadsheet for rates, a phone for guest questions, a separate login for the restaurant. Proppo replaces the sprawl with one connected system — without asking you to change how your property actually runs.
        </motion.p>
      </div>
    </section>
  )
}

export function FourPillars() {
  return (
    <section className="py-12 md:py-24 bg-surface-bg-alt" id="pillars">
      <div className="w_80_90">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.module}
                className="group bg-surface-card border border-line rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-brand-primary/40 hover:-translate-y-1 hover:shadow-lg"
                variants={fadeInUp}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <Icon className="text-brand-primary" size={20} />
                  </div>
                  <span className="font-display text-2xl font-medium text-line-strong group-hover:text-brand-accent transition-colors">0{i + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-ink leading-snug mb-1">{pillar.hook}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-accent">{pillar.module}</p>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed">{pillar.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function SolutionsTeaser() {
  return (
    <section className="py-12 md:py-24 bg-surface-bg-alt">
      <div className="w_80_90">
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="font-display text-3xl md:text-[40px] md:leading-[1.15] font-medium text-ink mb-4">Built around how your property actually operates</h2>
          <p className="text-base md:text-lg text-ink-secondary">A single-room homestay and a 40-room resort don&apos;t need the same tool wearing different skins — they need the parts that matter to them, without the parts that don&apos;t.</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SOLUTIONS.map((solution, i) => {
            const Scene = SOLUTION_SCENES[solution.name]
            return (
            <motion.div
              key={solution.name}
              variants={scaleIn}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={solution.href} className="group block">
                <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                  <Scene />
                </div>
                <p className="font-display text-xl font-medium text-ink flex items-center gap-1.5">
                  {solution.name}
                  <ArrowRight size={16} className="text-brand-primary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </p>
                <p className="text-sm text-ink-secondary mt-1">{solution.desc}</p>
              </Link>
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function SocialProof() {
  return (
    <section className="py-12 md:py-24 bg-surface-bg-alt">
      <div className="w_80_90 max-w-5xl">
        <motion.h2
          className="font-display text-3xl md:text-[40px] md:leading-[1.15] font-medium text-ink mb-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          Real properties, running on Proppo
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-12 items-center bg-surface-overlay-dark text-ink-inverse rounded-3xl p-6 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <CaseStudyScene />
          <div>
            <p className="font-display italic text-xl md:text-2xl leading-relaxed">
              &ldquo;Proppo brought every OTA and our direct bookings into one calendar — no more double-checking three tabs before we confirm a room.&rdquo;
              <VerifyTag>quote/outcome unconfirmed</VerifyTag>
            </p>
            <p className="text-sm mt-5 font-medium opacity-70">Cedar Cottages, Mashobra</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function FinalCTABand() {
  const { renderCBForm, CBFComp } = useBookCallForm()
  return (
    <section className="py-12 md:py-24 bg-brand-primary text-ink-inverse relative overflow-hidden">
      {CBFComp}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)' }}
      />
      <motion.div
        className="w_80_90 max-w-2xl text-center flex flex-col items-center gap-5 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2 className="font-display text-3xl md:text-[40px] md:leading-[1.15] font-medium">See it running on your own property</h2>
        <p className="text-base md:text-lg opacity-80">Most properties are fully onboarded within a week, OTA connections included.</p>
        <Button styles="btn_v2_accent text-base px-8 py-3 mt-2" onClick={renderCBForm}>Book a demo</Button>
      </motion.div>
    </section>
  )
}

// Product tour — v2 adaptation of the legacy "What does Proppo do?" module grid.
// Each card deep-links into the matching product category page/anchor.
const MODULES = [
  { icon: CalendarDays, name: 'PMS Dashboard', text: 'Bookings, check-ins, and room status — live, in one calendar.', aside: 'your entire property at a glance', href: '/product/property-management' },
  { icon: RefreshCw, name: 'Channel Manager', text: 'Rates, availability, and bookings synced across every OTA.', aside: '(no more copy-paste marathons)', href: '/product/inventory-distribution#channel-manager' },
  { icon: Globe, name: 'Direct Booking Engine', text: 'Guests book on your own site — zero commission.', aside: 'more bookings, more control', href: '/product/revenue-booking#direct-booking-engine' },
  { icon: LayoutGrid, name: 'Virtual Inventory', text: 'Sell the whole villa or room by room, from one inventory.', aside: 'never sell it twice', href: '/product/inventory-distribution#virtual-inventory' },
  { icon: ChefHat, name: 'QR Menu & Kitchen', text: 'Guests scan and order; the kitchen gets the KOT instantly.', aside: '(no more "two chai to 204" calls)', href: '/product/operations#restaurant' },
  { icon: BedDouble, name: 'Housekeeping', text: 'A live status board for every room, updated as it happens.', aside: 'no walkie-talkie chaos', href: '/product/operations#housekeeping' },
  { icon: ConciergeBell, name: 'Web Check-in', text: 'Guests check in before they even arrive.', aside: '(goodbye queues)', href: '/product/guest-experience#web-check-in' },
  { icon: Briefcase, name: 'Finance & GST', text: 'Reports and GST-ready exports built for your accountant.', aside: 'month-end without the migraine', href: '/product/business-admin#finance-gst' },
]

export function WhatDoesProppoDo() {
  return (
    <section className="py-12 md:py-24 bg-surface-bg" id="what-proppo-does">
      <div className="w_80_90">
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="font-display text-3xl md:text-[40px] md:leading-[1.15] font-medium text-ink mb-4">
            What does <span className="italic text-brand-primary">Proppo</span> do?
          </h2>
          <p className="text-base md:text-lg text-ink-secondary">Everything a property runs on — in one login.</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {MODULES.map((module, i) => {
            const Icon = module.icon
            return (
              <motion.div key={module.name} variants={scaleIn} transition={{ delay: i * 0.04 }}>
                <Link
                  href={module.href}
                  className="group flex flex-col gap-4 h-full bg-surface-card border border-line rounded-2xl p-6 transition-all duration-300 hover:border-brand-primary/40 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <Icon className="text-brand-primary" size={20} />
                    </div>
                    <ArrowRight size={15} className="text-brand-primary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium text-ink">{module.name}</p>
                    <p className="text-sm text-ink-secondary mt-1 leading-relaxed">{module.text}</p>
                    <p className="text-xs italic text-brand-accent mt-2">{module.aside}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Persuasion section — v2 adaptation of the legacy "Why choose Proppo?" list.
const WHY_PROPPO = [
  { name: 'All-in-one', text: 'Stop juggling 6 logins and 9 spreadsheets.' },
  { name: 'OTA Zen', text: 'Sync your rates everywhere at once. (Namaste.)' },
  { name: 'More bookings, less commission', text: 'Keep your profits — no middlemen, no drama.' },
  { name: 'Affordable', text: '₹150/room/month.' },
  { name: 'Real-time alerts', text: 'New bookings, check-ins, kitchen orders — the moment they happen.' },
  { name: 'Role-based access', text: '10 staff roles. Everyone sees only what they need.' },
  { name: 'Multi-property ready', text: 'Run one property or twenty, from a single account.' },
]

export function WhyChooseProppo() {
  const { renderCBForm, CBFComp } = useBookCallForm()
  return (
    <section className="py-12 md:py-24 bg-surface-bg" id="why-proppo">
      {CBFComp}
      <div className="w_80_90 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
        <motion.div
          className="md:sticky md:top-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4">Why Proppo</p>
          <h2 className="font-display text-3xl md:text-[40px] md:leading-[1.15] font-medium text-ink mb-4">
            Why choose <span className="italic text-brand-primary">Proppo</span>?
          </h2>
          <p className="text-base md:text-lg text-ink-secondary italic mb-6">Because smooth operations mean happier guests.</p>
          <Button styles="btn_v2_pri px-6 py-3" onClick={renderCBForm}>Book a demo</Button>
          <div className="mt-8 max-w-[240px]">
            <AlertsPhoneScene />
          </div>
        </motion.div>
        <motion.div
          className="border-b border-line"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {WHY_PROPPO.map((item, i) => (
            <motion.div
              key={item.name}
              className="flex items-start gap-5 py-5 border-t border-line"
              variants={fadeInUp}
              transition={{ delay: i * 0.05 }}
            >
              <span className="font-display text-2xl font-medium text-brand-accent/70 shrink-0 w-10">0{i + 1}</span>
              <div>
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-ink-secondary mt-0.5">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

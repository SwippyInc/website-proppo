'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// Live example cards — real customer properties running on Proppo.
// Screenshot thumbnails (fast, crisp) linking out to the live sites.
// Iframes were technically allowed (no X-Frame-Options) but heavy and janky
// at card size; this is the standard SaaS showcase pattern.
// To add a property: one entry here + a 640x400 screenshot in /public/images/live/.

const EXAMPLES = [
  { name: 'Cedar Cottages', place: 'Mashobra, Shimla', kind: 'Website', url: 'https://www.cedarcottages.in/', img: '/images/live/cedar-website.jpg' },
  { name: 'Cedar Cottages', place: 'Mashobra, Shimla', kind: 'Guidebook', url: 'https://booking.proppo.in/guidebook/PROP-50A69BF4', img: '/images/live/cedar-guidebook.jpg' },
  { name: 'Sakya Abode', place: 'Kaza, Spiti', kind: 'Website', url: 'https://sakyaabode.com', img: '/images/live/sakya-website.jpg' },
  { name: 'Sakya Abode', place: 'Kaza, Spiti', kind: 'Booking engine', url: 'https://booking.proppo.in/PROP-26E1BCE2', img: '/images/live/sakya-booking.jpg' },
  { name: 'Devlok Himachal by Zebi', place: 'Manali', kind: 'Website', url: 'https://devlokhimachal.in/', img: '/images/live/devlok-website.jpg' },
  { name: 'Mountain Majesty', place: 'Himachal', kind: 'Booking engine', url: 'https://booking.proppo.in/PROP-E9CC6014', img: '/images/live/mountain-majesty-booking.jpg' },
  { name: 'Swarg by Zebi', place: 'Manali', kind: 'Booking engine', url: 'https://booking.proppo.in/PROP-02FB4149', img: '/images/live/swarg-booking.jpg' },
  { name: 'Swarg by Zebi', place: 'Manali', kind: 'Guidebook', url: 'https://booking.proppo.in/guidebook/PROP-02FB4149', img: '/images/live/swarg-guidebook.jpg' },
]

const KIND_STYLES = {
  Website: 'bg-brand-primary text-white',
  'Booking engine': 'bg-semantic-success text-white',
  Guidebook: 'bg-semantic-warning text-white',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

function ExampleCard({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-[280px] md:w-[320px] shrink-0 rounded-2xl border border-line bg-surface-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-primary/40"
    >
      <div className="relative aspect-[8/5] overflow-hidden bg-surface-bg-alt">
        <Image
          src={item.img}
          alt={`${item.name} — ${item.kind}`}
          fill
          sizes="320px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className={`absolute top-3 left-3 rounded-pill px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${KIND_STYLES[item.kind]}`}>
          {item.kind}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
          <p className="text-[11px] text-ink-muted truncate">{item.place}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-primary shrink-0">
          Live <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  )
}

export default function LiveExamples() {
  const row = [...EXAMPLES, ...EXAMPLES] // duplicated for the seamless marquee loop
  return (
    <section className="py-12 md:py-24 bg-surface-bg overflow-hidden" id="live-examples">
      <div className="w_80_90">
        <motion.div
          className="max-w-2xl mx-auto text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Live examples</p>
          <h2 className="font-display text-3xl md:text-[40px] md:leading-[1.15] font-medium text-ink mb-4">
            Real properties. Real bookings. <span className="italic text-brand-primary">Live right now.</span>
          </h2>
          <p className="text-base md:text-lg text-ink-secondary">Not mockups — actual Proppo websites and booking engines, taking guests today.</p>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee_track flex items-stretch" style={{ animationDuration: '55s' }}>
            {row.map((item, i) => (
              <div key={`${item.url}-${i}`} className="px-2.5 shrink-0 flex">
                <ExampleCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

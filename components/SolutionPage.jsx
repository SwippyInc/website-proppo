'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import { FinalCTABand } from '@/components/Sections'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Relevant-features chips → product category page anchors (proppo-site-spec.md Sections 5-10)
const FEATURE_LINKS = {
  'Channel Manager': '/product/inventory-distribution#channel-manager',
  'Virtual Inventory': '/product/inventory-distribution#virtual-inventory',
  'Direct Booking Engine': '/product/revenue-booking#direct-booking-engine',
  'Rate Plans & Pricing': '/product/revenue-booking#rate-plans',
  'Multi-Property & Command Center': '/product/business-admin#multi-property',
  'Finance & GST': '/product/business-admin#finance-gst',
  'User Management & Roles': '/product/business-admin#user-management',
  'Restaurant': '/product/operations#restaurant',
  'Communication (WhatsApp)': '/product/guest-experience#communication',
  'Web Check-in': '/product/guest-experience#web-check-in',
}

// Shared Solutions page (proppo-site-spec.md Section 11).
// tone 'formal' (hotels): numbered pains with font-display numerals and hairline rows, restrained.
// tone 'playful' (villas/homestays): tilted pains cards with brass accents.
// extraAsset: optional second spec asset (11.1 lists dashboard-multi-dept.png alongside property-hero.jpg)
export default function SolutionPage({ tone = 'formal', crumb, title, sub, body, painsTitle, pains = [], features = [], asset, extraAsset }) {
  const playful = tone === 'playful'
  return (
    <>
      <NavBar />
      <PageHero crumb={crumb} title={title} sub={sub} />

      {/* Body + property hero asset */}
      <section className="py-12 md:py-24 bg-surface-bg">
        <div className="w_80_90">
          <motion.p
            className="max-w-3xl mx-auto text-center text-base md:text-lg text-ink-secondary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {body}
          </motion.p>
          <motion.div
            className="mt-10 md:mt-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <MediaPlaceholder label={crumb?.current} path={asset} aspect="aspect-[21/9]" />
          </motion.div>
        </div>
      </section>

      {/* Pains */}
      <section className="py-12 md:py-24 bg-surface-bg-alt">
        <div className="w_80_90">
          <motion.h2
            className="font-display text-2xl md:text-4xl font-medium text-ink mb-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {painsTitle}
          </motion.h2>
          {playful ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {pains.map((pain, i) => (
                <motion.div
                  key={pain}
                  className={`bg-surface-card border border-line rounded-2xl p-6 transition-all duration-300 hover:rotate-0 hover:-translate-y-1 hover:shadow-lg ${i % 2 === 1 ? '-rotate-1' : ''}`}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="font-display text-2xl font-medium text-brand-accent mb-3">0{i + 1}</p>
                  <p className="text-sm md:text-base text-ink-secondary leading-relaxed">{pain}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className={extraAsset ? 'grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center' : 'max-w-3xl mx-auto'}>
              <motion.div
                className="border-b border-line"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {pains.map((pain, i) => (
                  <motion.div
                    key={pain}
                    className="flex items-start gap-5 py-5 border-t border-line"
                    variants={fadeInUp}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="font-display text-2xl font-medium text-line-strong shrink-0 w-10">0{i + 1}</span>
                    <p className="text-sm md:text-base text-ink-secondary leading-relaxed">{pain}</p>
                  </motion.div>
                ))}
              </motion.div>
              {extraAsset && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                >
                  <MediaPlaceholder label={extraAsset.label} path={extraAsset.path} aspect="aspect-[4/3]" />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Relevant features */}
      <section className="py-12 md:py-24 bg-surface-bg">
        <div className="w_80_90 text-center">
          <motion.h2
            className="font-display text-2xl md:text-4xl font-medium text-ink mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            Relevant features
          </motion.h2>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, i) => (
              <motion.span key={feature} className="inline-block" variants={fadeInUp} transition={{ delay: i * 0.04 }}>
                <Link
                  href={FEATURE_LINKS[feature] ?? '/product'}
                  className="border border-line rounded-pill px-4 py-2 text-sm text-ink bg-surface-card hover:border-brand-primary/40 transition-colors inline-flex items-center gap-1.5"
                >
                  {feature}
                  <ArrowRight size={12} className="text-brand-primary" />
                </Link>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <FinalCTABand />
      <Footer />
    </>
  )
}

'use client'
import { motion } from 'framer-motion'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import SceneMedia from '@/components/SceneMedia'
import { FinalCTABand } from '@/components/Sections'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Case Studies per proppo-site-spec.md Section 13 (tone: neutral) —
// one featured story (Cedar Cottages) plus reserved slots pending confirmed customers
export default function CaseStudies() {
  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/resources', label: 'Resources', current: 'Case Studies' }}
        title="Real properties, running on Proppo"
      />

      <section className="py-12 md:py-24 bg-surface-bg">
        <div className="w_80_90 max-w-5xl">
          <motion.div
            className="bg-surface-card border border-line rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <SceneMedia
              label="Cedar Cottages, Mashobra"
              path="/assets/home/case-study-cedar-cottages.jpg"
              aspect="aspect-[4/3]"
            />
            <div>
              <p className="font-display italic text-xl leading-relaxed text-ink">
                &ldquo;Proppo brought every OTA and our direct bookings into one calendar, no more double-checking three tabs before we confirm a room.&rdquo;
              </p>
              <p className="text-sm mt-5 font-medium text-ink-secondary">Cedar Cottages, Mashobra</p>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[0, 1].map((slot) => (
              <motion.div
                key={slot}
                className="border border-dashed border-line-strong rounded-2xl p-8 text-center text-ink-muted text-sm flex flex-col items-center justify-center gap-3"
                variants={fadeInUp}
                transition={{ delay: slot * 0.05 }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-inverse bg-surface-overlay-dark/70 rounded-pill px-2 py-0.5">Coming soon</span>
                <p>Another property story is on the way.</p>
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

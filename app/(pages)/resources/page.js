'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { FinalCTABand } from '@/components/Sections'
import { RESOURCES } from '@/constants'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Resources overview per proppo-site-spec.md Section 13 (tone: neutral) —
// tile pattern mirrors the /product overview; only entries with a real href are links
export default function Resources() {
  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/', label: 'Home', current: 'Resources' }}
        title="Resources"
        sub="Guides, stories, and help, whether you're evaluating Proppo or already running on it."
      />

      <section className="py-12 md:py-24 bg-surface-bg">
        <div className="w_80_90">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {RESOURCES.map((resource, i) => {
              const inner = (
                <>
                  {!resource.href && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wide text-ink-inverse bg-surface-overlay-dark/70 rounded-pill px-2 py-0.5">Coming soon</span>
                  )}
                  <p className="text-lg font-semibold text-ink mb-2">{resource.name}</p>
                  <p className="text-sm text-ink-secondary">{resource.desc}</p>
                  {resource.href && (
                    <p className="flex items-center gap-1 text-sm font-medium text-brand-primary mt-4">
                      Explore <ArrowRight size={14} />
                    </p>
                  )}
                </>
              )
              const tileClass = "relative bg-surface-card rounded-xl border border-line p-6 h-full"
              return (
                <motion.div key={resource.name} variants={fadeInUp} transition={{ delay: i * 0.05 }}>
                  {resource.href ? (
                    <Link href={resource.href} className={`${tileClass} block hover:border-brand-primary/50 transition-colors`}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={tileClass}>{inner}</div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <FinalCTABand />
      <Footer />
    </>
  )
}

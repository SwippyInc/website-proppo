'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Shared inner-page header: breadcrumb + display headline + sub, on the v2 paper background.
export default function PageHero({ crumb, title, sub }) {
  return (
    <div className="pt-28 md:pt-40 pb-12 md:pb-20 bg-surface-bg relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(55% 60% at 50% 0%, rgba(28,75,66,0.07) 0%, transparent 70%)' }}
      />
      <motion.div
        className="w_80_90 text-center relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {crumb && (
          <p className="flex items-center justify-center gap-1 text-xs md:text-sm text-ink-muted mb-5">
            <Link href={crumb.href} className="hover:text-brand-primary transition-colors">{crumb.label}</Link>
            <ChevronRight size={14} />
            <span className="text-ink-secondary">{crumb.current}</span>
          </p>
        )}
        <h1 className="font-display font-medium text-[34px] leading-[1.1] md:text-[56px] text-ink">{title}</h1>
        {sub && <p className="max-w-2xl mx-auto mt-6 text-base md:text-lg text-ink-secondary">{sub}</p>}
      </motion.div>
    </div>
  )
}

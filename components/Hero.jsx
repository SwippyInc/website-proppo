'use client'
import Button from './Button'
import { motion } from 'framer-motion'
import { useBookCallForm } from '@/hooks/useForm'
import MediaPlaceholder from './MediaPlaceholder'
import BrowserFrame from './BrowserFrame'
import { RefreshCw } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
}

function scrollToPillars() {
  document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { renderCBForm, CBFComp } = useBookCallForm()
  return (
    <>
    {CBFComp}
    <section className="relative min-h-screen flex items-center bg-surface-bg overflow-hidden">
      {/* soft brand wash behind the visual side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(60% 50% at 75% 30%, rgba(28,75,66,0.08) 0%, transparent 70%)' }}
      />
      <div className="w_80_90 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-10 items-center pt-28 pb-16 md:pt-24 md:pb-0 relative">
        <motion.div
          className="flex flex-col items-center md:items-start gap-5 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface-card px-3 py-1 text-xs font-medium text-ink-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            Property Management System
          </span>
          <motion.h1
            className="font-display font-medium text-ink text-[34px] leading-[1.1] md:text-[44px] lg:text-[56px]"
            variants={fadeInUp}
          >
            One system for every property, from a <span className="italic text-brand-primary">single cottage</span> to a <span className="italic text-brand-primary">full resort</span>.
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-ink-secondary max-w-xl"
            variants={fadeInUp}
          >
            Proppo brings bookings, OTAs, payments, and guest communication into one place — built for hosts who run everything themselves, and for teams running full-service hotels.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto"
            variants={fadeInUp}
          >
            <Button styles="btn_v2_pri text-base px-7 py-3 w-full sm:w-auto" onClick={renderCBForm}>Book a demo</Button>
            <Button styles="btn_v2_sec text-base px-7 py-3 w-full sm:w-auto" onClick={scrollToPillars}>Explore the product</Button>
          </motion.div>
        </motion.div>

        {/* product visual: placeholder framed as a live app window */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
        >
          <BrowserFrame url="pms.proppo.in/calendar">
            <MediaPlaceholder label="Looping demo — booking calendar in use" path="/assets/home/hero-dashboard.mp4" aspect="aspect-[4/3]" className="rounded-lg" />
          </BrowserFrame>
          <motion.div
            className="absolute -bottom-5 left-4 md:-left-6 flex items-center gap-3 bg-surface-card border border-line rounded-xl shadow-lg px-4 py-3"
            variants={fadeInUp}
          >
            <span className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <RefreshCw size={15} className="text-brand-primary" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-ink">Real-time OTA sync</span>
              <span className="block text-[10px] text-ink-muted">300+ channels via Su</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  )
}

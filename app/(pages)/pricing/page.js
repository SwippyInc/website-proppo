'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import { useBookCallForm } from '@/hooks/useForm'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Pricing per proppo-site-spec.md Section 12 (tone: neutral) — single flat rate card;
// no tier table until the spec's open item on tiers is resolved
export default function Pricing() {
  const { renderCBForm, CBFComp } = useBookCallForm()
  return (
    <>
      <NavBar />
      {CBFComp}
      <PageHero
        title={<>Simple pricing that <span className="italic text-brand-primary">scales</span> with your property</>}
      />

      <section className="py-12 md:py-24 bg-surface-bg">
        <motion.div
          className="max-w-xl mx-auto bg-surface-card border border-line rounded-3xl p-8 md:p-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <p className="font-display text-6xl md:text-7xl font-medium text-ink">
            ₹150<span className="text-2xl md:text-3xl font-normal text-ink-secondary">/room/month</span>
          </p>
          <p className="text-ink-secondary mt-4">No commission on direct bookings.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button styles="btn_v2_pri text-base px-8 py-3" onClick={renderCBForm}>Book a demo</Button>
            <div className="flex flex-col items-center gap-1.5">
              <Link href="mailto:mail@proppo.in">
                <Button styles="btn_v2_sec text-base px-8 py-3">Contact us for custom pricing</Button>
              </Link>
              <p className="text-xs text-ink-muted">for multi-property and chain accounts</p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}

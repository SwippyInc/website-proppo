'use client'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import PricingCalculator from '@/components/PricingCalculator'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Pricing() {
  return (
    <>
      <NavBar />
      <PageHero
        title={<>Price it the way <span className="italic text-brand-primary">you&apos;ll actually run it.</span></>}
        sub="Pick your room count and the modules your property needs. No bundles you won't use."
      />

      <section className="py-12 md:py-20 bg-surface-bg">
        <motion.div
          className="w_80_90 max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <PricingCalculator />
          <p className="text-center text-xs text-ink-muted mt-8">
            Estimate only · final pricing confirmed at onboarding · GST extra as applicable
          </p>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}

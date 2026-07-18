'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FeatureSection from '@/components/FeatureSection'
import BrowserFrame from '@/components/BrowserFrame'
import MediaPlaceholder, { VerifyTag } from '@/components/MediaPlaceholder'
import { FinalCTABand } from '@/components/Sections'
import { OTAS } from '@/constants'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Shared template for all ten OTA pages (proppo-site-spec.md Section 6.4).
// Copy: headline/body verbatim from the spec template + the OTAS table in constants.js;
// feature one-liners are neutral phrasings of the spec's four template features,
// grounded in the Section 6.3 channel-manager capabilities.
export default function OtaPage({ ota }) {
  const features = [
    { lead: 'Connection method', rest: '— direct connection, set up once from your Proppo dashboard' },
    { lead: 'Rate/availability sync', rest: `— rates and availability pushed to ${ota.name} in real time` },
    { lead: 'Restriction sync', rest: '— Stop Sell, Min/Max Stay, and Closed to Arrival/Departure' },
    { lead: 'Booking import', rest: `— ${ota.name} bookings land in the Proppo calendar automatically` },
  ]
  const others = OTAS.filter((o) => o.slug !== ota.slug)

  return (
    <>
      <NavBar />
      <PageHero
        crumb={{ href: '/product/inventory-distribution', label: 'Inventory & Distribution', current: ota.name }}
        title={<>Sync <span className="italic text-brand-primary">{ota.name}</span> with every other channel you sell on</>}
        sub={<>{ota.line}{ota.verify && <VerifyTag>{ota.verify}</VerifyTag>}</>}
      />

      <FeatureSection
        id="channel-connection"
        eyebrow="Channel connection"
        headline={`How the ${ota.name} connection works`}
        features={features}
      >
        <BrowserFrame url={`pms.proppo.in/channels/${ota.slug}`}>
          <MediaPlaceholder label={`${ota.name} logo`} path={`/assets/product/ota/${ota.slug}/logo.svg`} />
          <div className="flex items-center justify-between gap-3 px-3 py-2.5 mt-2 rounded-xl border border-line bg-surface-bg-alt">
            <span className="flex items-center gap-2 text-xs font-medium text-ink shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-semantic-success" />
              </span>
              Connected
            </span>
            <span className="text-[10px] font-mono text-ink-muted truncate">inventory · rates · restrictions · bookings</span>
          </div>
        </BrowserFrame>
      </FeatureSection>

      {/* Other directly connected OTAs (spec 6.4) */}
      <section className="py-12 md:py-24 bg-surface-bg-alt">
        <div className="w_80_90">
          <motion.div
            className="max-w-2xl mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Directly connected OTAs</p>
            <h2 className="font-display text-2xl md:text-4xl font-medium text-ink mb-3">Also connected</h2>
            <p className="text-sm md:text-base text-ink-secondary">Each connection has its own sync details — pick a channel to see how it works.</p>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {others.map((other, i) => (
              <motion.div key={other.slug} variants={fadeInUp} transition={{ delay: i * 0.03 }}>
                <Link
                  href={`/product/inventory-distribution/channel-manager/${other.slug}`}
                  className="group inline-flex items-center gap-2.5 bg-surface-card border border-line rounded-pill pl-1.5 pr-4 py-1.5 transition-all duration-300 hover:border-brand-primary/40 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center font-display text-sm font-medium text-brand-primary">
                    {other.name[0]}
                  </span>
                  <span className="text-sm font-medium text-ink">{other.name}</span>
                </Link>
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

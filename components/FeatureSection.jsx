'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import SceneMedia from './SceneMedia'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Reusable v2 product-category feature block (proppo-site-spec.md Sections 5-10).
// features: array of strings or { lead, rest } (lead is bolded)
// assets: array of { label, path } — rendered via SceneMedia (animated scene when the path has one, MediaPlaceholder otherwise)
// children: optional custom visual (diagram, mock) that replaces the assets column
export default function FeatureSection({ id, eyebrow, differentiator = false, headline, subheadline, body, features = [], assets = [], flip = false, alt = false, children }) {
  const hasMedia = Boolean(children) || assets.length > 0
  return (
    <section id={id} className={`py-12 md:py-24 ${alt ? 'bg-surface-bg-alt' : 'bg-surface-bg'}`}>
      <div className={`w_80_90 ${hasMedia ? 'grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center' : 'max-w-3xl mx-auto'}`}>
        <motion.div
          className={hasMedia && flip ? 'md:order-2' : ''}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          {eyebrow && (
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">
              {differentiator && <Star size={13} className="fill-brand-accent text-brand-accent" />}
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-2xl md:text-4xl font-medium text-ink mb-3">{headline}</h2>
          {subheadline && <p className="text-base md:text-lg text-ink mb-3">{subheadline}</p>}
          {body && <p className="text-sm md:text-base text-ink-secondary mb-6">{body}</p>}
          {features.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-6">
              {features.map((feature) => {
                const isString = typeof feature === 'string'
                const key = isString ? feature : feature.lead
                return (
                  <li key={key} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <Check size={16} className="text-semantic-success shrink-0 mt-0.5" />
                    <span>
                      {isString ? feature : <><span className="font-semibold text-ink">{feature.lead}</span> {feature.rest}</>}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </motion.div>
        {hasMedia && (
          <motion.div
            className={`flex flex-col gap-4 ${flip ? 'md:order-1' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {children ?? assets.map((asset) => (
              <SceneMedia key={asset.path} label={asset.label} path={asset.path} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import { PRODUCT_CATEGORIES } from "@/constants"

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Product() {
  return (
    <>
      <NavBar/>
      <div className="bg-surface-bg">
        <div className="w-[95%] md:w-[80%] mx-auto py-20 md:pt-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h1 className="font-display font-medium text-2xl md:text-4xl lg:text-5xl text-center text-ink">
              <span className="underline-accent">Product</span>
            </h1>
            <p className="w-fit mx-auto my-4 max-w-[90vw] md:max-w-2xl text-sm md:text-base text-ink-secondary text-center">
              Proppo isn&apos;t a checklist of modules — it&apos;s the set of tools that run a property day to day. Explore by what you&apos;re trying to get done, not by feature name.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PRODUCT_CATEGORIES.map((category, i) => {
              const Icon = category.icon
              const inner = (
                <>
                  {!category.href && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wide text-ink-inverse bg-surface-overlay-dark/70 rounded-pill px-2 py-0.5">Coming soon</span>
                  )}
                  <div className="h-10 w-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4">
                    <Icon className="text-brand-primary" size={20} />
                  </div>
                  <p className="text-lg font-semibold text-ink mb-2">{category.name}</p>
                  <p className="text-sm text-ink-secondary">{category.desc}</p>
                  {category.href && (
                    <p className="flex items-center gap-1 text-sm font-medium text-brand-primary mt-4">
                      Explore <ArrowRight size={14} />
                    </p>
                  )}
                </>
              )
              const tileClass = "relative bg-surface-card rounded-xl border border-line p-6 h-full"
              return (
                <motion.div key={category.name} variants={fadeInUp} transition={{ delay: i * 0.05 }}>
                  {category.href ? (
                    <Link href={category.href} className={`${tileClass} block hover:border-brand-primary/50 transition-colors`}>
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
      </div>
      <Footer/>
    </>
  )
}

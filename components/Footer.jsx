'use client'
import Image from "next/image";

import proppo_white_logo from '../public/images/proppo_logo.png'

import Link from "next/link";
import { motion } from 'framer-motion'
import { PRODUCT_CATEGORIES, SOLUTIONS } from '@/constants'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const linkClass = "hover:text-brand-primary transition-colors"
const listClass = "list-none flex flex-col gap-2.5 text-sm text-ink-secondary"
const headingClass = "text-xs font-semibold uppercase tracking-widest text-ink mb-4"

export default function Footer() {
  const links = [
    {name:'Instagram',url:'https://www.instagram.com/swippytech/',icon:'instagram_logo'},
    {name:'Facebook',url:'https://www.facebook.com/swippycrm/',icon:'fb_logo'},
    {name:'YouTube',url:'https://www.youtube.com/@SwippyTech',icon:'youtube_logo'},
    {name:'X',url:'https://x.com/Swippy_tech',icon:'x_logo'},
    {name:'LinkedIn',url:'https://in.linkedin.com/company/swippytech',icon:'linkedin_logo'},
    {name:'F6S',url:'https://www.f6s.com/company/swippy-tech-llp',icon:'f6s_logo'},
    {name:'Crunchbase',url:'https://www.crunchbase.com/organization/swippy-tech',icon:'crunchbase_logo'},
  ]
  return (
    // extra bottom padding on mobile keeps content clear of the NavBar's sticky CTA bar
    <footer className="pt-14 pb-24 md:pb-10 bg-surface-bg-alt border-t border-line">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w_80_90">
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col items-start gap-3">
            <Image src={proppo_white_logo} height={100} width={300} className="h-8 w-auto" alt="Proppo" />
            <p className="text-[10px] text-ink-muted uppercase tracking-widest">
              Copyright &copy; Proppo. All Rights Reserved.
            </p>
          </div>
          <div>
            <p className={headingClass}>Product</p>
            <ul className={listClass}>
              <li><Link href="/product" className={linkClass}>Overview</Link></li>
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.name}><Link href={category.href} className={linkClass}>{category.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className={headingClass}>Solutions</p>
            <ul className={listClass}>
              {SOLUTIONS.map((solution) => (
                <li key={solution.name}><Link href={solution.href} className={linkClass}>{solution.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className={headingClass}>Company</p>
            <ul className={listClass}>
              <li><Link href="/pricing" className={linkClass}>Pricing</Link></li>
              <li><Link href="/resources" className={linkClass}>Resources</Link></li>
              <li><Link href="/resources/case-studies" className={linkClass}>Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <p className={headingClass}>Legal</p>
            <ul className={listClass}>
              <li><Link href="/termsandconditions" className={linkClass}>Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link href="/refundandcancellation" className={linkClass}>Refund and Cancellation</Link></li>
              <li><Link href="/data-deletion" className={linkClass}>Data Policy</Link></li>
            </ul>
          </div>
          <div>
            <p className={headingClass}>Contact</p>
            <ul className="list-none flex flex-col gap-2 text-sm text-ink-secondary leading-relaxed">
              <li>
                Swippy Tech LLP<br />
                Kasumpti, Shimla (HP) - 171009
              </li>
              <li><Link href="mailto:mail@proppo.in" title="Mail Us" className={linkClass}>mail@proppo.in</Link></li>
              <li><Link href="tel:+919418855294" title="Call Us" className={linkClass}>+91 94188 55294</Link></li>
            </ul>
          </div>
        </div>
        <div className="w_80_90 mt-10 pt-6 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs italic text-ink-muted">Built with ❤️ by Proppo</p>
          <ul className="flex items-center gap-1.5 flex-wrap">
            {links.map((link) => (
              <Link
                className="flex items-center justify-center border border-line rounded-full p-2 transition duration-300 hover:border-brand-primary bg-surface-card"
                key={link.name}
                href={link.url}
                target="_blank"
                title={link.name}
              >
                <img src={`/icons/${link.icon}.png`} alt={link.name} className="w-4 object-contain" />
              </Link>
            ))}
          </ul>
        </div>
      </motion.div>
    </footer>
  )
}

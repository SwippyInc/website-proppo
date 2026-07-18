'use client'
import Link from 'next/link'
import proppo_logo from '../public/images/proppo_logo.png'
import Image from 'next/image'
import Button from './Button'
import { useState } from 'react'
import { useBookCallForm, useSignUpForm } from '@/hooks/useForm'
import { PRODUCT_CATEGORIES, SOLUTIONS, RESOURCES } from '@/constants'
import { ChevronDown, Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from './ui/dropdown-menu'

const NAV_SECTIONS = [
  { label: 'Product', items: PRODUCT_CATEGORIES },
  { label: 'Solutions', items: SOLUTIONS },
  { label: 'Resources', items: RESOURCES },
]

function MegaMenu({ label, items }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-1 text-sm font-medium text-ink-secondary hover:text-ink transition-colors outline-none data-[state=open]:text-ink">
        {label}
        <ChevronDown size={14} className="transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={12} className="w-[92vw] max-w-[600px] p-3 grid grid-cols-1 sm:grid-cols-2 gap-1 rounded-2xl border-line bg-surface-card shadow-xl">
        {items.map((item) => {
          const Icon = item.icon
          const inner = (
            <>
              {Icon && (
                <span className="h-9 w-9 shrink-0 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Icon size={16} className="text-brand-primary" />
                </span>
              )}
              <span className="flex flex-col gap-0.5">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {item.name}
                  {!item.href && <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-inverse bg-surface-overlay-dark/70 rounded-pill px-2 py-0.5">Soon</span>}
                </span>
                <span className="text-xs text-ink-muted leading-snug">{item.desc}</span>
              </span>
            </>
          )
          return item.href ? (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-start gap-3 rounded-xl p-3 hover:bg-surface-bg-alt transition-colors"
            >
              {inner}
            </Link>
          ) : (
            <div key={item.name} className="flex items-start gap-3 rounded-xl p-3 opacity-70">
              {inner}
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null) // section label | null
  const { renderCBForm, CBFComp } = useBookCallForm()

  const closeMobile = () => { setMobileOpen(false); setMobileSection(null) }

  return (
    <>
      {CBFComp}
      <nav className="fixed top-0 inset-x-0 z-40 bg-white backdrop-blur-md border-b border-line">
        <div className="w_80_90 flex items-center justify-between py-3">
          <Link href="/" className="flex items-center" onClick={closeMobile}>
            <Image src={proppo_logo} alt="Proppo" height={500} width={500} className="h-4 md:h-6 w-auto" />
          </Link>

          {/* desktop */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            <MegaMenu label="Product" items={PRODUCT_CATEGORIES} />
            <MegaMenu label="Solutions" items={SOLUTIONS} />
            <Link href="/pricing" className="text-sm font-medium text-ink-secondary hover:text-ink transition-colors">Pricing</Link>
            <MegaMenu label="Resources" items={RESOURCES} />
            <div className="flex items-center gap-2">
              <Link href="https://pms.proppo.in" target="_blank">
                <Button styles="btn_v2_sec text-sm px-5 py-2">Login</Button>
              </Link>
              <Button styles="btn_v2_pri text-sm px-5 py-2" onClick={renderCBForm}>Book a demo</Button>
            </div>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden h-9 w-9 flex items-center justify-center text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* mobile panel */}
        {mobileOpen && (
          <div className="md:hidden border-t border-line bg-surface-bg max-h-[calc(100vh-60px)] overflow-y-auto">
            <div className="w_80_90 py-4 flex flex-col">
              {NAV_SECTIONS.map((section, idx) => (
                <div key={section.label} className={idx > 0 ? 'border-t border-line' : ''}>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-3 text-base font-medium text-ink"
                    onClick={() => setMobileSection(mobileSection === section.label ? null : section.label)}
                  >
                    {section.label}
                    <ChevronDown size={16} className={`transition-transform ${mobileSection === section.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSection === section.label && (
                    <div className="flex flex-col pb-2">
                      {section.items.map((item) => (
                        item.href ? (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={closeMobile}
                            className="py-2.5 pl-4 text-sm text-ink-secondary border-l border-line ml-1"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <span key={item.name} className="py-2.5 pl-4 text-sm text-ink-muted border-l border-line ml-1 flex items-center gap-2">
                            {item.name}
                            <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-inverse bg-surface-overlay-dark/70 rounded-pill px-2 py-0.5">Soon</span>
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/pricing" onClick={closeMobile} className="py-3 text-base font-medium text-ink border-t border-line">Pricing</Link>
              <div className="flex flex-col gap-2 pt-4 pb-2">
                <Button styles="btn_v2_pri w-full py-3" onClick={renderCBForm}>Book a demo</Button>
                <Link href="https://pms.proppo.in" target="_blank" className="w-full">
                  <Button styles="btn_v2_sec w-full py-3">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* mobile sticky CTA (spec Section 2: CTA pinned as a sticky bottom bar) */}
      {!mobileOpen && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-card/95 backdrop-blur-md border-t border-line p-3">
          <Button styles="btn_v2_pri w-full py-3 text-sm" onClick={renderCBForm}>Book a demo</Button>
        </div>
      )}
    </>
  )
}

export function NavBar1() {
  const {renderSUForm, formComponent} = useSignUpForm()
  return (
    <>
    {formComponent}
    <nav className="flex items-center justify-center fixed top-0 left-0 h-auto w-screen bg-white/70 dark:bg-black/90">
        <div className="flex items-center justify-between w-[90%] md:w-[80%] py-4 madiv">
            <Link href={"/"} className='flex items-center justify-start logo_a'><Image src={proppo_logo} alt='Proppo' height={500} width={500} className="h-6 md:h-8 w-auto p-0 m-0"/></Link>
            <button className="menu_toggle -mt-2" role='button' onClick={()=>{
              document.querySelector('nav')?.classList.toggle('show')
            }}><div className='menu_line'></div></button>
            <div className="menu">
              <ul className="menu_ul">
                <li><Link className="menu_lia" href={"/"}>Home</Link></li>
                <li><Link className="menu_lia" href={"/pricing"}>Pricing</Link></li>
              </ul>
              <div className="flex flex-col md:flex-row items-center justify-start w-[90%] md:w-auto md:justify-center gap-2 mt-2 mb-8 md:mb-0">
                <Button styles="btn_pri px-5 block w-full md:w-auto text-lg md:text-base" onClick={renderSUForm}>Sign Up</Button>
                <Link className='block w-full md:w-auto' href={"https://pms.proppo.in"} target='_blank'><Button styles="btn_sec px-5 block w-full md:w-auto text-lg md:text-base">Login</Button></Link>
              </div>
            </div>
        </div>
    </nav>
    </>
  )
}

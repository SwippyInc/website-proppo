'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useReducedMotion } from 'framer-motion'
import { useBookCallForm } from '@/hooks/useForm'

// Interactive pricing calculator (ported from the pricing-calculator prototype,
// restyled to the site's design system). Price figures tween between states,
// breakdown rows animate, enterprise view swaps in for 50+ rooms / chains.

const BASE_RATE = 75
const FLOOR_BASE = 1500
const FLOOR_WITH_CHANNEL = 2000
const WEBSITE_FLAT = 799
const ENTERPRISE_ROOM_THRESHOLD = 50

const MODULES = [
  { id: 'channel', title: 'Channel Manager', desc: 'Booking.com, Agoda, Airbnb, Expedia, MakeMyTrip, Trip.com sync', rate: 75, flat: false, defaultOn: true },
  { id: 'pos', title: 'Restaurant POS', desc: 'F&B and restaurant revenue reporting', rate: 40, flat: false, defaultOn: false },
  { id: 'whatsapp', title: 'WhatsApp Guest Messaging', desc: 'Automated confirmations, reminders, check-in alerts', rate: 10, flat: false, defaultOn: false },
  { id: 'booking', title: 'Booking Engine', desc: 'Direct booking widget for your website', rate: 50, flat: false, defaultOn: false },
  { id: 'website', title: 'Website', desc: 'Marketing site build and hosting, flat fee, not room-based', rate: WEBSITE_FLAT, flat: true, defaultOn: false },
]

const fmt = (v) => Math.round(v).toLocaleString('en-IN')

// number that springs to its new value instead of jumping
function Tween({ value, format = fmt }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(value)
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    if (reduce) { setDisplay(value); return }
    const controls = animate(mv, value, { duration: 0.45, ease: 'easeOut', onUpdate: (v) => setDisplay(v) })
    return () => controls.stop()
  }, [value, reduce])
  return <>{format(display)}</>
}

function CheckBox({ on }) {
  return (
    <motion.span
      animate={{
        backgroundColor: on ? '#fff' : 'rgba(0,0,0,0)',
        borderColor: on ? '#fff' : '#8A8474',
      }}
      transition={{ duration: 0.2 }}
      className="mt-0.5 h-[18px] w-[18px] rounded-[5px] border-[1.5px] shrink-0 flex items-center justify-center"
    >
      <svg width="10" height="10" viewBox="0 0 10 10">
        <motion.path
          d="M1.5 5.2 L4 7.5 L8.5 2.5"
          fill="none" stroke="#6840ff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </svg>
    </motion.span>
  )
}

export default function PricingCalculator() {
  const reduce = useReducedMotion()
  const { renderCBForm, CBFComp } = useBookCallForm()
  const [rooms, setRooms] = useState(15)
  const [multi, setMulti] = useState(false)
  const [period, setPeriod] = useState('monthly')
  const [active, setActive] = useState(() => Object.fromEntries(MODULES.map((m) => [m.id, m.defaultOn])))

  const enterprise = rooms >= ENTERPRISE_ROOM_THRESHOLD || multi

  // ── pricing math (ported from the prototype) ──
  const baseTotal = rooms * BASE_RATE
  const channelOn = active.channel
  const FLOOR = channelOn ? FLOOR_WITH_CHANNEL : FLOOR_BASE
  const addonRows = MODULES.filter((m) => active[m.id] && !m.flat)
  const addonTotal = addonRows.reduce((s, m) => s + rooms * m.rate, 0)
  const websiteOn = active.website
  const raw = baseTotal + addonTotal
  const floorApplied = raw < FLOOR
  const billable = floorApplied ? FLOOR : raw
  const total = billable + (websiteOn ? WEBSITE_FLAT : 0)
  const annual = period === 'annual'
  const displayTotal = annual ? Math.round(total * 12 * 0.9) : total
  const perRoomBasis = annual ? total * 0.9 : total
  const annualSaving = Math.round(total * 12 * 0.1)

  const breakdown = [
    { label: 'Base PMS (incl. financial & GST)', val: baseTotal },
    ...addonRows.map((m) => ({ label: m.title, val: rooms * m.rate })),
    ...(floorApplied ? [{ label: `Minimum billing (floor${channelOn ? ' · Channel Mgr' : ''})`, val: FLOOR, floor: true }] : []),
    ...(websiteOn ? [{ label: 'Website (flat)', val: WEBSITE_FLAT }] : []),
    ...(annual ? [{ label: 'Annual discount (10%)', val: -annualSaving }] : []),
  ]

  const sliderPct = ((rooms - 1) / 49) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-8 items-start">
      {CBFComp}

      {/* ── controls ── */}
      <div className="bg-surface-card border border-line rounded-2xl p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-2">Number of rooms</p>
        <p className="font-display text-5xl font-medium text-ink mb-4">
          <Tween value={rooms} format={(v) => Math.round(v)} />{' '}
          <span className="text-base font-normal text-ink-muted">rooms</span>
        </p>
        <input
          type="range" min={1} max={50} value={rooms}
          onChange={(e) => setRooms(parseInt(e.target.value, 10))}
          aria-label="Number of rooms"
          className="w-full h-[6px] rounded-full appearance-none outline-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-primary [&::-webkit-slider-thumb]:border-[3px]
            [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-brand-primary [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white"
          style={{ background: `linear-gradient(to right, #6840ff ${sliderPct}%, #E3DDCE ${sliderPct}%)` }}
        />
        <div className="flex justify-between text-[10px] font-medium text-ink-muted mt-1.5 mb-6">
          <span>1</span><span>25</span><span>50+ (custom pricing)</span>
        </div>

        {/* multi-property toggle */}
        <motion.button
          type="button"
          onClick={() => setMulti((m) => !m)}
          animate={{
            backgroundColor: multi ? '#6840ff' : 'rgba(104,64,255,0)',
            borderColor: multi ? '#6840ff' : '#E3DDCE',
          }}
          transition={{ duration: 0.25 }}
          className="w-full flex items-start gap-3 p-3.5 rounded-xl border text-left mb-6 cursor-pointer"
        >
          <CheckBox on={multi} />
          <span>
            <span className={`block text-sm font-medium transition-colors ${multi ? 'text-white' : 'text-ink'}`}>Multiple properties / chain account</span>
            <span className={`block text-xs mt-0.5 transition-colors ${multi ? 'text-white/70' : 'text-ink-muted'}`}>Managing more than one property under this account</span>
          </span>
        </motion.button>

        <div className={`border-t border-line pt-6 ${enterprise ? 'opacity-40 pointer-events-none' : ''} transition-opacity`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">Add-on modules</p>
          <div className="flex flex-col gap-2.5">
            {MODULES.map((m) => {
              const on = active[m.id]
              return (
                <motion.button
                  type="button"
                  key={m.id}
                  layout
                  onClick={() => setActive((a) => ({ ...a, [m.id]: !a[m.id] }))}
                  animate={{
                    backgroundColor: on ? '#6840ff' : 'rgba(104,64,255,0)',
                    borderColor: on ? '#6840ff' : '#E3DDCE',
                  }}
                  whileTap={reduce ? {} : { scale: 0.985 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl border text-left cursor-pointer"
                >
                  <CheckBox on={on} />
                  <span className="flex-1 min-w-0">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={`text-sm font-medium transition-colors ${on ? 'text-white' : 'text-ink'}`}>{m.title}</span>
                      <span className={`text-xs font-mono font-medium whitespace-nowrap transition-colors ${on ? 'text-white' : 'text-brand-primary'}`}>
                        {m.flat ? `₹${m.rate}/mo` : `+₹${m.rate}/room`}
                      </span>
                    </span>
                    <span className={`block text-xs mt-0.5 leading-snug transition-colors ${on ? 'text-white/70' : 'text-ink-muted'}`}>{m.desc}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── summary ── */}
      <div className="bg-brand-primary text-ink-inverse rounded-2xl p-6 md:p-8 lg:sticky lg:top-24 overflow-hidden">
        <AnimatePresence mode="wait">
          {enterprise ? (
            <motion.div
              key="ent"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">Enterprise pricing</p>
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-3">Let&apos;s build a plan that fits.</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Multi-property portfolios and larger properties get custom terms: support, onboarding, and volume pricing tailored to your setup.
              </p>
              <button
                type="button"
                onClick={renderCBForm}
                className="btn w-full rounded-pill bg-white text-brand-primary font-semibold text-sm px-6 py-3 hover:bg-brand-accent-light transition-colors"
              >
                Request a custom quote
              </button>
              <p className="text-xs text-white/50 mt-3 text-center">Usually within a few hours, on WhatsApp or a call.</p>
            </motion.div>
          ) : (
            <motion.div
              key="calc"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Estimated cost</p>

              {/* period toggle */}
              <div className="flex gap-1.5 mt-4 p-1 rounded-pill border border-white/20 w-fit">
                {['monthly', 'annual'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`relative rounded-pill px-4 py-1.5 text-xs font-medium transition-colors ${period === p ? 'text-brand-primary' : 'text-white/70'}`}
                  >
                    {period === p && (
                      <motion.span
                        layoutId="periodPill"
                        className="absolute inset-0 bg-white rounded-pill"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{p === 'monthly' ? 'Monthly' : 'Annual (−10%)'}</span>
                  </button>
                ))}
              </div>

              {/* price */}
              <div className="mt-5 mb-1">
                <p className="font-display text-[52px] leading-none font-medium flex items-baseline gap-1.5">
                  <span className="text-2xl text-brand-accent-light">₹</span>
                  <Tween value={displayTotal} />
                </p>
                <p className="text-xs text-white/60 mt-2.5">
                  {annual ? 'per year, billed annually' : 'per month'} · ≈ ₹{fmt(perRoomBasis / rooms)}/room{annual ? '/mo' : ''} · + GST
                </p>
              </div>

              {/* floor note */}
              <AnimatePresence initial={false}>
                {floorApplied && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-lg bg-white/10 border border-white/20 px-3.5 py-2.5 text-xs leading-relaxed text-white/85">
                      <b className="text-brand-accent-light">Minimum billing applied.</b> Base PMS + add-ons come to ₹{fmt(raw)}/month,
                      below the ₹{fmt(FLOOR)} minimum for your selection, so the floor applies instead.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* breakdown */}
              <div className="mt-5 flex flex-col gap-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {breakdown.map((row) => (
                    <motion.div
                      key={row.label}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`flex items-baseline justify-between gap-3 text-[13px] font-mono ${row.floor ? 'border-t border-dashed border-white/20 pt-2 mt-1' : ''}`}
                    >
                      <span className="text-white/70">{row.label}</span>
                      <span className="text-brand-accent-light whitespace-nowrap">
                        {row.val < 0 ? `−₹${fmt(-row.val)}` : `₹${fmt(row.val)}`}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="flex items-baseline justify-between gap-3 border-t border-white/25 pt-2.5 mt-1 text-sm font-medium">
                  <span>Total {annual ? '/ year' : '/ month'}</span>
                  <span className="text-brand-accent-light font-mono">₹{fmt(displayTotal)}</span>
                </div>
              </div>

              {/* old-rate comparison */}
              <div className="mt-5 pt-4 border-t border-white/15 text-xs text-white/55">
                At the old flat ₹150/room rate this property would pay{' '}
                <span className="line-through opacity-70">₹{fmt(rooms * 150)}</span>/month.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

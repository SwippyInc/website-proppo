'use client'

// Ambient product showreel — a full-screen, auto-looping motion-graphics page
// for demo screens and background tabs (route: /loop). No interaction needed;
// one loop runs ~58s and restarts seamlessly. Reuses the auto-playing product
// scenes from ProductScenes.jsx inside BrowserFrame "product shots".

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IMAGES, SOLUTIONS } from '@/constants'
import BrowserFrame from '@/components/BrowserFrame'
import {
  SyncScene, DragDropScene, BookingEngineScene,
  RatePlansScene, AvailabilityScene, KitchenBoardScene,
} from '@/components/ProductScenes'

const EASE = [0.22, 1, 0.36, 1]

const ACTS = [
  { id: 'intro',    label: 'Intro',       dur: 4500 },
  { id: 'problem',  label: 'The problem', dur: 6000 },
  { id: 'promise',  label: 'One system',  dur: 7000 },
  { id: 'product',  label: 'The product', dur: 19500 },
  { id: 'segments', label: 'Solutions',   dur: 7500 },
  { id: 'proof',    label: 'Proof',       dur: 7000 },
  { id: 'cta',      label: 'proppo.in',   dur: 6500 },
]

const SHOTS_PER_LOOP = 3
const SHOTS = [
  { eyebrow: 'Channel Manager', a: 'One rate change.', b: 'Every channel.', note: 'Synced in under a second · 300+ channels', url: 'pms.proppo.in/channels', Scene: SyncScene },
  { eyebrow: 'Property Management', a: 'Drag. Drop.', b: 'Updated everywhere.', note: 'The calendar is the single source of truth', url: 'pms.proppo.in/calendar', Scene: DragDropScene },
  { eyebrow: 'Direct Booking Engine', a: 'Bookings without', b: 'the commission.', note: '0% commission · guests pay securely online', url: 'book.proppo.in', Scene: BookingEngineScene },
  { eyebrow: 'Rate Plans', a: 'Rates that nudge', b: 'up on their own.', note: 'Weekend & occupancy-based pricing', url: 'pms.proppo.in/rates', Scene: RatePlansScene },
  { eyebrow: 'Live Availability', a: 'Never double-book', b: 'a room again.', note: 'One inventory across every channel', url: 'pms.proppo.in/availability', Scene: AvailabilityScene },
  { eyebrow: 'Restaurant & Kitchen', a: 'Orders flow straight', b: 'to the kitchen.', note: 'QR menu · live KOT board', url: 'pos.proppo.in/kitchen', Scene: KitchenBoardScene },
]

const STATS = [
  { to: 300, suffix: '+', label: 'OTA channels connected' },
  { to: 0, from: 14, label: 'double bookings since go-live' },
  { to: 3, suffix: ' hrs', label: 'saved daily on operations' },
  { to: 94, suffix: '%', label: 'occupancy this season' },
]

/* ---------- motion primitives ---------- */

function Words({ text, className = '', delay = 0, stagger = 0.055 }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '115%', rotate: 5, opacity: 0 }}
            animate={{ y: '0%', rotate: 0, opacity: 1 }}
            transition={{ delay: delay + i * stagger, duration: 0.75, ease: EASE }}
          >
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Eyebrow({ children, delay = 0.15 }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary-light"
    >
      {children}
    </motion.p>
  )
}

function CountUp({ to, from = 0, suffix = '', duration = 1.8, delay = 0.5 }) {
  const [v, setV] = useState(from)
  useEffect(() => {
    let raf, start
    const t0 = performance.now() + delay * 1000
    const step = (now) => {
      if (now < t0) { raf = requestAnimationFrame(step); return }
      if (!start) start = now
      const p = Math.min(1, (now - start) / (duration * 1000))
      const e = 1 - Math.pow(1 - p, 4)
      setV(from + (to - from) * e)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, from, duration, delay])
  return <span>{Math.round(v)}{suffix}</span>
}

function Rings({ size = 280, tint = 'border-brand-primary-light/40', delay = 0.3 }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${tint}`}
          style={{ width: size, height: size }}
          initial={{ scale: 0.45, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2.4, delay: delay + i * 0.55, repeat: Infinity, repeatDelay: 1.4, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

/* ---------- stage dressing ---------- */

function Backdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#171310]" />
      <motion.div
        className="absolute -left-[12%] -top-[22%] h-[75vh] w-[75vh] rounded-full bg-brand-primary/25 blur-[130px]"
        animate={{ x: [0, 70, 0], y: [0, 45, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[28%] -right-[12%] h-[85vh] w-[85vh] rounded-full bg-[#D9B679]/10 blur-[140px]"
        animate={{ x: [0, -60, 0], y: [0, -35, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[38%] top-[30%] h-[40vh] w-[40vh] rounded-full bg-brand-primary-light/10 blur-[110px]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "url('/images/grid_lines.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)' }}
      />
    </div>
  )
}

function LogoChip({ className = '', imgClass = 'h-10 sm:h-12' }) {
  return (
    <div className={`flex items-center rounded-2xl bg-white px-6 py-4 shadow-2xl ${className}`}>
      <Image src={IMAGES.proppo_logo} alt="Proppo" className={`${imgClass} w-auto`} priority />
    </div>
  )
}

/* ---------- acts ---------- */

function ActIntro() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
      <Rings size={300} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <LogoChip />
      </motion.div>
      <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.12] text-ink-inverse">
        <Words text="One Product. Every Solution." delay={0.5} />
        <br />
        <span className="italic text-brand-primary-light"><Words text="Zero Headaches." delay={1.1} /></span>
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
        className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/40"
      >
        Property Management System
      </motion.p>
    </div>
  )
}

const PROBLEM_CHIPS = ['OTA calendars', 'Rate spreadsheets', 'Guest phone', 'Restaurant logins']

function ActProblem() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-6 text-center">
      <Eyebrow>The problem</Eyebrow>
      <div className="flex max-w-2xl flex-wrap items-center justify-center gap-3">
        {PROBLEM_CHIPS.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.28, duration: 0.55, ease: EASE }}
            className="relative rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-white/80"
          >
            {c}
            <motion.span
              aria-hidden
              className="absolute left-3 right-3 top-1/2 h-[2px] origin-left rounded-full bg-semantic-error"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8 + i * 0.22, duration: 0.35, ease: EASE }}
            />
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + i * 0.22, duration: 0.3, ease: EASE }}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-semantic-error text-[11px] font-bold text-white"
            >
              ✕
            </motion.span>
          </motion.div>
        ))}
      </div>
      <h2 className="max-w-4xl font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.12] text-ink-inverse">
        <Words text="Your property runs on" delay={2.9} />{' '}
        <span className="italic text-brand-primary-light"><Words text="more systems" delay={3.4} /></span>{' '}
        <Words text="than it should." delay={3.7} />
      </h2>
    </div>
  )
}

const PROMISE_FLOATS = [
  { img: IMAGES.channel_manager, pos: 'left-[9%] top-[22%]', delay: 1.3 },
  { img: IMAGES.booking_engine, pos: 'right-[10%] top-[26%]', delay: 1.5 },
  { img: IMAGES.whatsapp, pos: 'left-[15%] bottom-[22%]', delay: 1.7 },
  { img: IMAGES.qr_menu, pos: 'right-[14%] bottom-[26%]', delay: 1.9 },
]

function ActPromise() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
      {PROMISE_FLOATS.map((f, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            delay: f.delay, duration: 0.6, ease: EASE,
            y: { duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: f.delay + 0.6 },
          }}
          className={`absolute hidden h-14 w-14 items-center justify-center rounded-2xl bg-white p-2.5 shadow-xl lg:flex ${f.pos}`}
        >
          <Image src={f.img} alt="" className="h-full w-full object-contain" />
        </motion.div>
      ))}
      <Eyebrow>The promise</Eyebrow>
      <h2 className="max-w-6xl font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ink-inverse">
        <Words text="One system for every property —" delay={0.3} />
        <br />
        <span className="italic text-brand-primary-light"><Words text="from a single cottage" delay={0.9} /></span>{' '}
        <span className="italic text-white/85"><Words text="to a full resort." delay={1.3} /></span>
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.6, ease: EASE }}
        className="max-w-2xl text-sm sm:text-lg leading-relaxed text-white/55"
      >
        Bookings, OTAs, payments and guest communication — brought into one login.
      </motion.p>
    </div>
  )
}

function ActProduct({ loop }) {
  const [shot, setShot] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setShot((s) => (s + 1) % SHOTS_PER_LOOP), 6500)
    return () => clearInterval(t)
  }, [])
  const idx = (loop * SHOTS_PER_LOOP + shot) % SHOTS.length
  const s = SHOTS[idx]

  return (
    <div className="flex h-full items-center justify-center px-6 pb-14">
      <div className="grid w-full max-w-[1440px] items-center gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <div className="relative order-2 min-h-[190px] sm:min-h-[230px] lg:order-1 lg:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0 flex flex-col justify-center gap-4 text-center lg:text-left"
            >
              <Eyebrow delay={0.05}>{s.eyebrow}</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.06] text-ink-inverse">
                <Words text={s.a} delay={0.15} stagger={0.09} />
                <br />
                <span className="italic text-brand-primary-light"><Words text={s.b} delay={0.45} stagger={0.09} /></span>
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/50 lg:justify-start"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary-light opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-primary-light" />
                </span>
                {s.note}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="order-1 lg:order-2">
          <BrowserFrame url={s.url} className="w-full shadow-[0_50px_140px_-24px_rgba(104,64,255,0.45)]">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white">
              <AnimatePresence>
                <motion.div
                  key={idx}
                  className="absolute inset-0 [&>*]:h-full"
                  initial={{ opacity: 0, scale: 1.045 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <s.Scene />
                </motion.div>
              </AnimatePresence>
            </div>
          </BrowserFrame>
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: SHOTS_PER_LOOP }).map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${i === shot ? 'w-7 bg-brand-primary-light' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ActSegments() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-6 pb-10 text-center">
      <div className="flex flex-col items-center gap-4">
        <Eyebrow>Solutions</Eyebrow>
        <h2 className="max-w-5xl font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-ink-inverse">
          <Words text="Built around how your property" delay={0.2} />{' '}
          <span className="italic text-brand-primary-light"><Words text="actually operates." delay={0.6} /></span>
        </h2>
      </div>
      <div className="grid w-full max-w-5xl gap-4 sm:grid-cols-3">
        {SOLUTIONS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 40, rotate: i === 0 ? -2 : i === 2 ? 2 : 0 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 1 + i * 0.22, duration: 0.7, ease: EASE }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-sm"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/25 text-brand-primary-light">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="text-lg font-semibold text-white">{s.name}</p>
            <p className="text-sm leading-relaxed text-white/55">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ActProof() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-6 pb-8 text-center sm:gap-12">
      <div className="flex flex-col items-center gap-2">
        <Eyebrow>Cedar Cottages · Mashobra</Eyebrow>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xs sm:text-sm text-white/40"
        >
          6 cottages · on Proppo since 2023
        </motion.p>
      </div>
      <div className="grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {STATS.map((st, i) => (
          <motion.div
            key={st.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.18, duration: 0.6, ease: EASE }}
            className="flex flex-col items-center gap-2"
          >
            <p className="font-display text-5xl text-white sm:text-6xl lg:text-7xl">
              <CountUp to={st.to} from={st.from ?? 0} suffix={st.suffix ?? ''} delay={0.6 + i * 0.18} />
            </p>
            <p className="max-w-[180px] text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-white/45">
              {st.label}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: EASE }}
        className="max-w-3xl font-display text-lg italic leading-relaxed text-white/70 sm:text-2xl"
      >
        “Proppo brought every OTA and our direct bookings into one calendar — no more double-checking three tabs before we confirm a room.”
      </motion.blockquote>
    </div>
  )
}

function ActCTA() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
      <Rings size={340} tint="border-brand-primary-light/30" delay={0.1} />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <LogoChip imgClass="h-8 sm:h-9" />
      </motion.div>
      <h2 className="max-w-5xl font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ink-inverse">
        <Words text="See it running on" delay={0.4} />{' '}
        <span className="italic text-brand-primary-light"><Words text="your own property." delay={0.7} /></span>
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        className="relative"
      >
        <div aria-hidden className="absolute inset-0 rounded-full bg-brand-primary/50 blur-2xl" />
        <motion.div
          animate={{ scale: [1, 1.045, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative rounded-full border border-brand-primary-light/60 bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-2xl sm:px-10 sm:text-lg"
        >
          Book a demo · <span className="font-display italic">proppo.in</span>
        </motion.div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="text-xs sm:text-sm text-white/45"
      >
        Fully onboarded within a week · OTA connections included
      </motion.p>
    </div>
  )
}

/* ---------- reduced-motion fallback: one static poster frame ---------- */

function StaticFrame() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
      <LogoChip />
      <h1 className="max-w-4xl font-display text-4xl sm:text-6xl leading-[1.1] text-ink-inverse">
        One system for every property,{' '}
        <span className="italic text-brand-primary-light">from a single cottage to a full resort.</span>
      </h1>
      <p className="max-w-2xl text-sm sm:text-base text-white/55">
        Bookings, OTAs, payments and guest communication — in one login. 300+ channels connected · 0% commission on direct bookings.
      </p>
      <div className="rounded-full border border-brand-primary-light/60 bg-brand-primary px-8 py-4 text-base font-semibold text-white">
        Book a demo · proppo.in
      </div>
    </div>
  )
}

/* ---------- chrome: watermark, progress scrubber, hints ---------- */

function Progress({ act, loop }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4 sm:px-8 sm:pb-5">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-2 hidden gap-5 sm:flex">
          {ACTS.map((a, i) => (
            <span
              key={a.id}
              className={`text-[9px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${i === act ? 'text-white' : 'text-white/25'}`}
            >
              {a.label}
            </span>
          ))}
        </div>
        <div className="flex gap-1.5">
          {ACTS.map((a, i) => (
            <div key={a.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
              {i < act && <div className="h-full w-full bg-brand-primary-light/80" />}
              {i === act && (
                <motion.div
                  key={`${loop}-${act}`}
                  className="h-full w-full origin-left bg-brand-primary-light"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: a.dur / 1000, ease: 'linear' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Chrome({ showHint }) {
  return (
    <>
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-lg">
          <Image src={IMAGES.proppo_logo} alt="Proppo" className="h-4 w-auto sm:h-5" priority />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary-light opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-primary-light" />
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/50">Product tour · loops continuously</span>
        </div>
      </div>
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
          >
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur">
              <kbd className="rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white">F</kbd>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">for fullscreen</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- the showreel ---------- */

const ACT_COMPONENTS = {
  intro: ActIntro,
  problem: ActProblem,
  promise: ActPromise,
  product: ActProduct,
  segments: ActSegments,
  proof: ActProof,
  cta: ActCTA,
}

export default function Showreel() {
  const reduce = useReducedMotion()
  const [{ act, loop }, setState] = useState({ act: 0, loop: 0 })
  const [idle, setIdle] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const idleRef = useRef(false)

  // act scheduler — advances the timeline, wraps into the next loop
  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => {
      setState((s) => (s.act === ACTS.length - 1 ? { act: 0, loop: s.loop + 1 } : { act: s.act + 1, loop: s.loop }))
    }, ACTS[act].dur)
    return () => clearTimeout(t)
  }, [act, reduce])

  // the page is a display screen — never scroll
  useEffect(() => {
    document.body.classList.add('noscroll')
    return () => document.body.classList.remove('noscroll')
  }, [])

  // F toggles fullscreen
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() !== 'f' || e.metaKey || e.ctrlKey || e.altKey) return
      if (document.fullscreenElement) document.exitFullscreen()
      else document.documentElement.requestFullscreen().catch(() => {})
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // hide the cursor when idle, like a video player
  useEffect(() => {
    let t
    const onMove = () => {
      if (idleRef.current) { idleRef.current = false; setIdle(false) }
      clearTimeout(t)
      t = setTimeout(() => { idleRef.current = true; setIdle(true) }, 2600)
    }
    onMove()
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); clearTimeout(t) }
  }, [])

  // fullscreen hint, shown briefly after load
  useEffect(() => {
    if (reduce) return
    const a = setTimeout(() => setShowHint(true), 1500)
    const b = setTimeout(() => setShowHint(false), 7500)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [reduce])

  const Current = ACT_COMPONENTS[ACTS[act].id]

  return (
    <div className={`fixed inset-0 z-[200] h-[100dvh] w-full overflow-hidden bg-[#171310] text-ink-inverse ${idle ? 'cursor-none' : ''}`}>
      <Backdrop />
      {reduce ? (
        <StaticFrame />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${loop}-${ACTS[act].id}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.985, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.015, filter: 'blur(12px)' }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <Current loop={loop} />
            </motion.div>
          </AnimatePresence>
          <Progress act={act} loop={loop} />
        </>
      )}
      <Chrome showHint={showHint && !reduce} />
    </div>
  )
}

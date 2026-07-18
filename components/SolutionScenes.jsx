'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { BedDouble, CheckCheck } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Animated solution-card scenes for the homepage, replacing MediaPlaceholder
// blocks. Shared visual language with AnimatedCalendar (brand violet, warm
// neutrals, calm loops). Reduced-motion safe: loops freeze on a settled state.
// ─────────────────────────────────────────────────────────────────────────────

const INK = '#211E19'
const INK_SECONDARY = '#5C574D'
const INK_MUTED = '#8A8474'
const LINE = '#E3DDCE'
const BRAND = '#6840ff'
const SUCCESS = '#2F7A4F'
const AMBER = '#C9762B'

const frame = 'aspect-[4/3] w-full rounded-xl border border-line bg-white overflow-hidden'

// ═══════════════════════════════ HOTELS & RESORTS ═══════════════════════════
// Front desk working itself: a guest checks in, a room flips occupied →
// cleaning → ready, and the day's counters catch up. One clear story per loop.

const H_LOOP = 7
const H_DELAY = 1.4
const hT = (times) => ({ duration: H_LOOP, repeat: Infinity, repeatDelay: H_DELAY, times, ease: 'easeOut' })

// timeline fractions
const T_CHECK = [0, 0.1, 0.15, 0.9, 0.96]       // arrival row: due → checked in
const T_CLEAN = [0, 0.3, 0.34, 0.62, 0.66, 0.94, 1] // room 204 state cycle

function HotelsScene() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ ...hT(times), repeat })

  // room 204 chip geometry
  const chip = { x: 422, y: 182, w: 84, h: 56 }

  return (
    <div className={frame} role="img" aria-label="Proppo front desk. A guest checks in while housekeeping turns a room over">
      <svg viewBox="0 0 640 480" className="block w-full h-full" fontFamily="inherit">
        {/* header */}
        <text x={28} y={42} fontSize={15} fontWeight={600} fill={INK}>Front desk</text>
        <text x={28} y={59} fontSize={10.5} fill={INK_SECONDARY}>Friday, 15 November</text>
        <text x={472} y={38} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1}>OCCUPANCY</text>
        <rect x={472} y={46} width={140} height={5} rx={2.5} fill={LINE} opacity={0.6} />
        <motion.rect
          x={472} y={46} height={5} rx={2.5} fill={BRAND}
          initial={{ width: 0 }} animate={{ width: 120 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
        />
        <text x={612} y={42} fontSize={11} fontWeight={600} fill={BRAND} textAnchor="end">86%</text>

        {/* ── arrivals panel ── */}
        <rect x={24} y={78} width={272} height={236} rx={10} fill="#fff" stroke={LINE} />
        <text x={40} y={102} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>ARRIVALS · 6</text>

        {[
          ['A. Sharma', 'Deluxe 101 · 2 nights', true],
          ['M. Khan', 'Suite 201 · 3 nights', false], // <- this one checks in on the loop
          ['R. Iyer', 'Deluxe 102 · 1 night', true],
          ['S. Patel', 'Cottage C1 · 4 nights', false],
        ].map(([name, sub, done], i) => {
          const y = 116 + i * 50
          const animated = i === 1
          return (
            <g key={name}>
              {animated && (
                <motion.rect
                  x={32} y={y - 6} width={248} height={42} rx={8} fill={SUCCESS}
                  animate={{ opacity: [0, 0, 0.08, 0.08, 0] }}
                  transition={tr(T_CHECK)}
                />
              )}
              <circle cx={48} cy={y + 15} r={10} fill={BRAND} opacity={0.1} />
              <text x={48} y={y + 18.5} fontSize={9} fontWeight={600} fill={BRAND} textAnchor="middle">{name[0]}</text>
              <text x={66} y={y + 12} fontSize={11.5} fontWeight={500} fill={INK}>{name}</text>
              <text x={66} y={y + 26} fontSize={9} fill={INK_MUTED}>{sub}</text>
              {done && !animated && (
                <g>
                  <rect x={206} y={y + 3} width={76} height={20} rx={10} fill={SUCCESS} opacity={0.12} />
                  <text x={244} y={y + 16.5} fontSize={8.5} fontWeight={600} fill={SUCCESS} textAnchor="middle">Checked in</text>
                </g>
              )}
              {animated && (
                <>
                  <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr(T_CHECK)}>
                    <rect x={222} y={y + 3} width={60} height={20} rx={10} fill={AMBER} opacity={0.12} />
                    <text x={252} y={y + 16.5} fontSize={8.5} fontWeight={600} fill={AMBER} textAnchor="middle">Due 2 PM</text>
                  </motion.g>
                  <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr(T_CHECK)}>
                    <rect x={206} y={y + 3} width={76} height={20} rx={10} fill={SUCCESS} opacity={0.12} />
                    <motion.path
                      d="M214 13.5 L217 16.5 L222 10.5"
                      transform={`translate(0 ${y})`}
                      fill="none" stroke={SUCCESS} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
                      animate={{ pathLength: [0, 0, 1, 1, 1] }}
                      transition={tr([0, 0.12, 0.2, 0.95, 1])}
                    />
                    <text x={248} y={y + 16.5} fontSize={8.5} fontWeight={600} fill={SUCCESS} textAnchor="middle">Checked in</text>
                  </motion.g>
                </>
              )}
            </g>
          )
        })}

        {/* ── housekeeping panel ── */}
        <rect x={312} y={78} width={304} height={236} rx={10} fill="#fff" stroke={LINE} />
        <text x={328} y={102} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>ROOMS · LIVE STATUS</text>

        {[
          ['101', 'ready'], ['102', 'ready'], ['103', 'occupied'],
          ['201', 'ready'], ['204', 'animated'], ['202', 'occupied'],
          ['301', 'ready'], ['302', 'occupied'], ['C1', 'ready'],
        ].map(([num, state], i) => {
          const cx = 328 + (i % 3) * 94
          const cy = 116 + Math.floor(i / 3) * 66
          if (state !== 'animated') {
            const occ = state === 'occupied'
            return (
              <g key={num}>
                <rect x={cx} y={cy} width={84} height={56} rx={8}
                  fill={occ ? BRAND : '#F4F2EC'} stroke={occ ? 'none' : LINE} />
                <text x={cx + 12} y={cy + 24} fontSize={12} fontWeight={600} fill={occ ? '#fff' : INK}>{num}</text>
                <text x={cx + 12} y={cy + 40} fontSize={8.5} fill={occ ? '#fff' : INK_MUTED} opacity={occ ? 0.8 : 1}>
                  {occ ? 'Occupied' : 'Ready'}
                </text>
              </g>
            )
          }
          // room 204: occupied → cleaning → ready, then back
          return (
            <g key={num}>
              <motion.rect
                x={cx} y={cy} width={84} height={56} rx={8}
                animate={{ fill: [BRAND, BRAND, '#FBF3E4', '#FBF3E4', '#EDF7F1', '#EDF7F1', BRAND] }}
                transition={tr(T_CLEAN)}
              />
              <motion.text
                x={cx + 12} y={cy + 24} fontSize={12} fontWeight={600}
                animate={{ fill: ['#fff', '#fff', AMBER, AMBER, SUCCESS, SUCCESS, '#fff'] }}
                transition={tr(T_CLEAN)}
              >
                204
              </motion.text>
              {/* state labels crossfade */}
              <motion.text x={cx + 12} y={cy + 40} fontSize={8.5} fill="#fff" opacity={0.85}
                animate={{ opacity: [0.85, 0.85, 0, 0, 0, 0, 0.85] }} transition={tr(T_CLEAN)}>Occupied</motion.text>
              <motion.text x={cx + 12} y={cy + 40} fontSize={8.5} fontWeight={600} fill={AMBER}
                animate={{ opacity: [0, 0, 1, 1, 0, 0, 0] }} transition={tr(T_CLEAN)}>Cleaning</motion.text>
              <motion.g animate={{ opacity: [0, 0, 0, 0, 1, 1, 0] }} transition={tr(T_CLEAN)}>
                <text x={cx + 12} y={cy + 40} fontSize={8.5} fontWeight={600} fill={SUCCESS}>Ready</text>
                <motion.path
                  d={`M${cx + 44} ${cy + 37} l2.5 2.5 l4 -4.5`}
                  fill="none" stroke={SUCCESS} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
                  animate={{ pathLength: [0, 0, 0, 0, 1, 1, 1] }}
                  transition={tr([0, 0.62, 0.64, 0.66, 0.74, 0.94, 1])}
                />
              </motion.g>
            </g>
          )
        })}

        {/* ── today at a glance ── */}
        <rect x={24} y={330} width={592} height={126} rx={10} fill="#fff" stroke={LINE} />
        <text x={40} y={354} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>TODAY AT A GLANCE</text>
        {[
          ['Arrivals done', 0], ['Departures', 1], ['Rooms ready', 2],
        ].map(([label, i]) => (
          <g key={label} transform={`translate(${40 + i * 197} 0)`}>
            {i > 0 && <line x1={-16} y1={368} x2={-16} y2={436} stroke={LINE} />}
            <text x={0} y={428} fontSize={9.5} fill={INK_MUTED}>{label}</text>
          </g>
        ))}
        {/* arrivals counter ticks 3 → 4 in sync with the check-in */}
        <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr(T_CHECK)}>
          <text x={40} y={404} fontSize={28} fontWeight={600} fill={INK}>3<tspan fontSize={15} fill={INK_MUTED} fontWeight={500}>/6</tspan></text>
        </motion.g>
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr(T_CHECK)}>
          <text x={40} y={404} fontSize={28} fontWeight={600} fill={SUCCESS}>4<tspan fontSize={15} fill={INK_MUTED} fontWeight={500}>/6</tspan></text>
        </motion.g>
        <text x={237} y={404} fontSize={28} fontWeight={600} fill={INK}>5</text>
        <text x={434} y={404} fontSize={28} fontWeight={600} fill={INK}>21<tspan fontSize={15} fill={INK_MUTED} fontWeight={500}>/24</tspan></text>
      </svg>
    </div>
  )
}

// ═══════════════════════════ VACATION RENTALS & VILLAS ══════════════════════
// Auto-playing version of the product's own VillaDiagram: Room 1 books itself,
// "Entire Villa" relists as "Rooms 2 + 3". No overlap, no manual edits.

const VILLA_OPEN = [
  { name: 'Entire Villa', note: 'available', state: 'open' },
  { name: 'Room 1', note: 'available', state: 'open' },
  { name: 'Room 2', note: 'available', state: 'open' },
  { name: 'Room 3', note: 'available', state: 'open' },
]
const VILLA_BOOKED = [
  { name: 'Rooms 2 + 3', note: 'auto-updated', state: 'combo' },
  { name: 'Room 1', note: 'just booked · Airbnb', state: 'booked' },
  { name: 'Room 2', note: 'available', state: 'open' },
  { name: 'Room 3', note: 'available', state: 'open' },
]

// shared by VillasScene (homepage card) and VillasWide (solutions hero)
export function VillaCards({ booked }) {
  const listings = booked ? VILLA_BOOKED : VILLA_OPEN
  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1.5 py-1">
      <AnimatePresence mode="popLayout">
        {listings.map((l) => (
          <motion.div
            key={l.name}
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className={`rounded-lg border px-2 py-1.5 flex flex-col justify-center ${
              l.state === 'booked'
                ? 'border-line bg-surface-bg-alt opacity-60'
                : l.state === 'combo'
                  ? 'border-brand-primary/40 bg-brand-primary/10'
                  : 'border-line bg-white'
            }`}
          >
            <p className={`text-[11px] font-semibold leading-tight ${l.state === 'booked' ? 'line-through text-ink-muted' : 'text-ink'}`}>
              {l.name}
            </p>
            <p className={`text-[9px] mt-0.5 ${
              l.state === 'combo' ? 'text-brand-primary font-medium' : l.state === 'booked' ? 'text-ink-muted' : 'text-semantic-success'
            }`}>
              {l.note}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function VillasScene() {
  const reduce = useReducedMotion()
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setBooked((b) => !b), 5200)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <div className={`${frame} p-3 flex flex-col`} role="img" aria-label="Virtual inventory. Booking one room automatically relists the rest of the villa">
      {/* header, mirroring VillaDiagram */}
      <div className="flex items-center justify-between pb-2.5">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <BedDouble size={13} className="text-brand-primary" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-ink leading-tight">Cedar Villa</p>
            <p className="text-[9px] text-ink-muted">1 property · 3 rooms · linked inventory</p>
          </div>
        </div>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-semantic-success" />
        </span>
      </div>

      <VillaCards booked={booked} />

      {/* narration */}
      <div className="pt-2 min-h-[2.2em]">
        <AnimatePresence mode="wait">
          <motion.p
            key={booked ? 'b' : 'a'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-[9.5px] text-ink-secondary leading-snug"
          >
            {booked
              ? 'Room 1 booked. "Entire Villa" became "Rooms 2 + 3" on every channel. No overlap.'
              : 'All four listings sell from one linked inventory. Watch Room 1…'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ═══════════════════════════════ HOMESTAYS & BNBS ═══════════════════════════
// WhatsApp-style guest chat that runs itself: booking lands, confirmation is
// typed and sent automatically, guest replies. "Run it like a pro. Still just you."

const CHAT_CYCLE = 9.5 // seconds per loop

const bubbleIn = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: (d) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: d, duration: 0.45, ease: 'easeOut' },
  }),
}

function GuestChatScene() {
  const reduce = useReducedMotion()
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setCycle((c) => c + 1), CHAT_CYCLE * 1000)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <div className={`${frame} flex items-center justify-center bg-surface-bg-alt`} role="img" aria-label="Guest messaging on autopilot. A booking confirmation is sent automatically on WhatsApp">
      {/* phone */}
      <div className="h-[94%] w-[200px] rounded-[26px] border border-line bg-white shadow-xl overflow-hidden flex flex-col">
        {/* chat header */}
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#075E54' }}>
          <span className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-semibold text-white">M</span>
          <div className="flex-1 leading-tight">
            <p className="text-[10.5px] font-medium text-white">Meera</p>
            <p className="text-[8px] text-white/60">Airbnb guest · online</p>
          </div>
        </div>

        {/* messages — remounted each cycle so the sequence replays */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cycle}
            className="flex-1 px-2 py-2 space-y-1.5 overflow-hidden"
            style={{ background: '#ECE5DD' }}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
          >
            {/* booking notification */}
            <motion.div variants={bubbleIn} custom={0.35} className="flex justify-center">
              <span className="text-[8px] font-medium text-ink-secondary bg-white/90 rounded-full px-2 py-0.5 shadow-sm">
                New booking · 14–16 Nov · 2 guests
              </span>
            </motion.div>

            {/* auto confirmation: typing dots → message */}
            <motion.div variants={bubbleIn} custom={1.0} className="flex justify-end">
              <div className="max-w-[85%] rounded-xl rounded-tr-sm px-2 py-1.5 shadow-sm" style={{ background: '#DCF8C6' }}>
                <motion.div
                  className="flex items-center gap-1 h-[14px]"
                  animate={{ opacity: [1, 1, 0], height: [14, 14, 0] }}
                  transition={{ delay: 1.0, duration: 0.3, times: [0, 0.99, 1] }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-[5px] w-[5px] rounded-full bg-ink-muted/70"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.8, repeat: reduce ? 0 : 2, delay: 1.0 + i * 0.14 }}
                    />
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.4 }}
                >
                  <p className="text-[9.5px] leading-snug text-ink">
                    Hi Meera. Your stay at Pine Hollow Cottage is confirmed for 14–16 Nov. Check-in link: proppo.in/c/8k2
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="text-[7.5px] text-ink-muted">10:42</span>
                    <motion.span
                      animate={{ color: ['#8A8474', '#8A8474', '#34B7F1', '#34B7F1'] }}
                      transition={{ delay: 2.6, duration: 0.6, times: [0, 0.5, 0.51, 1] }}
                    >
                      <CheckCheck size={10} />
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* the point of the scene */}
            <motion.div variants={bubbleIn} custom={3.0} className="flex justify-center">
              <span className="text-[8px] font-medium text-brand-primary bg-brand-primary/10 rounded-full px-2 py-0.5">
                Sent automatically by Proppo
              </span>
            </motion.div>

            {/* guest reply */}
            <motion.div variants={bubbleIn} custom={3.9} className="flex justify-start">
              <div className="max-w-[80%] rounded-xl rounded-tl-sm px-2 py-1.5 bg-white shadow-sm">
                <p className="text-[9.5px] leading-snug text-ink">Perfect. See you Saturday!</p>
                <p className="text-[7.5px] text-ink-muted text-right mt-0.5">10:44</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ═══════════════════════════════ CASE STUDY PANEL ═══════════════════════════
// Cedar Cottages at night: calm line-art, drifting chimney smoke, twinkling
// stars — then the numbers that matter count up. Sits on the dark proof card.

function Counter({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf, start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

function CaseStudyScene() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity

  return (
    <div
      className="aspect-[4/3] w-full rounded-xl overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(180deg, #1B1730 0%, #241E3E 100%)' }}
      role="img"
      aria-label="Cedar Cottages, Mashobra at night, 94% occupancy, zero double bookings, three hours saved daily"
    >
      {/* night scene */}
      <svg viewBox="0 0 640 330" className="block w-full flex-1" fontFamily="inherit" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5EFE0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* stars */}
        {[[90, 60], [180, 36], [300, 70], [420, 40], [520, 120], [590, 60]].map(([x, y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r={1.3} fill="#fff"
            animate={reduce ? { opacity: 0.6 } : { opacity: [0.15, 0.85, 0.15] }}
            transition={{ duration: 2.6 + (i % 3) * 0.9, repeat, delay: i * 0.45, ease: 'easeInOut' }}
          />
        ))}

        {/* moon */}
        <circle cx={540} cy={78} r={34} fill="url(#moonGlow)" />
        <circle cx={540} cy={78} r={17} fill="#F5EFE0" opacity={0.92} />

        {/* hills */}
        <path d="M0 268 Q160 208 340 258 T640 246 V330 H0 Z" fill="#221F38" />
        <path d="M0 296 Q200 256 400 292 T640 286 V330 H0 Z" fill="#1A1729" />

        {/* cottage line-art */}
        <g stroke="#D9B679" strokeWidth={1.6} fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={0.95}>
          <rect x={196} y={224} width={96} height={64} />
          <path d="M186 226 L244 178 L302 226" />
          <rect x={262} y={192} width={9} height={22} />
          <rect x={216} y={252} width={18} height={36} />
        </g>
        {/* warm window, breathing gently */}
        <motion.rect
          x={252} y={240} width={18} height={18} fill="#F2B84B"
          animate={reduce ? { opacity: 0.95 } : { opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat, ease: 'easeInOut' }}
        />
        {/* chimney smoke */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i} cx={266} cy={188} r={4 - i * 0.7} fill="#fff"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={reduce ? { opacity: 0 } : { y: [0, -14, -34, -52], x: [0, 5, 10, 16], opacity: [0, 0.45, 0.3, 0], scale: [0.6, 1, 1.4, 1.8] }}
            transition={{ duration: 4.2, repeat, delay: i * 1.35, ease: 'easeOut' }}
          />
        ))}

        {/* label */}
        <text x={40} y={66} fontSize={10} fontWeight={600} fill="#D9B679" letterSpacing={3}>CEDAR COTTAGES · MASHOBRA</text>
        <text x={40} y={86} fontSize={9.5} fill="#fff" opacity={0.45}>6 cottages · on Proppo since 2023</text>
      </svg>

      {/* stats */}
      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-black/20">
        {[
          { to: 94, suffix: '%', label: 'Occupancy this season' },
          { to: 0, suffix: '', label: 'Double bookings since go-live', static: true },
          { to: 3, suffix: ' hrs', label: 'Saved daily on ops' },
        ].map((s) => (
          <div key={s.label} className="px-3 py-3 text-center">
            <p className="text-lg md:text-xl font-semibold text-white leading-none">
              {s.static ? '0' : <Counter to={s.to} suffix={s.suffix} />}
            </p>
            <p className="text-[8px] uppercase tracking-wider text-white/45 mt-1.5 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { HotelsScene, VillasScene, GuestChatScene, CaseStudyScene }

export const SOLUTION_SCENES = {
  'Hotels & Resorts': HotelsScene,
  'Vacation Rentals & Villas': VillasScene,
  'Homestays & BnBs': GuestChatScene,
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Animated stand-in for the hero's "Looping demo — booking calendar in use" video.
// Hand-built SVG product mockup: a new direct booking lands on the calendar and syncs, on a loop.
// Brand colors pulled from app/globals.css tokens.

const INK = '#211E19'
const INK_SECONDARY = '#5C574D'
const INK_MUTED = '#8A8474'
const LINE = '#E3DDCE'
const BRAND = '#6840ff'
const SUCCESS = '#2F7A4F'

const CHANNELS = {
  direct: { color: BRAND, name: 'Direct' },
  bdc: { color: '#2F7A4F', name: 'Booking.com' },
  airbnb: { color: '#C9762B', name: 'Airbnb' },
  mmt: { color: '#2B6CB0', name: 'MakeMyTrip' },
}

// grid geometry (viewBox 640x480)
const GX = 112, GY = 118, COL_W = 72, ROW_H = 52, COLS = 7, ROWS = 6
const colX = (c) => GX + c * COL_W
const rowY = (r) => GY + r * ROW_H

const DAYS = ['Mon 13', 'Tue 14', 'Wed 15', 'Thu 16', 'Fri 17', 'Sat 18', 'Sun 19']
const ROOMS = [
  ['101', 'Deluxe'], ['102', 'Deluxe'], ['201', 'Suite'],
  ['202', 'Suite'], ['C1', 'Cottage'], ['C2', 'Cottage'],
]
const TODAY_COL = 2

// row, startCol, span, channel, guest
const BOOKINGS = [
  [0, 0, 2, 'bdc', 'A. Sharma'],
  [0, 4, 3, 'direct', 'R. Iyer'],
  [1, 1, 2, 'airbnb', 'M. Khan'],
  [2, 0, 2, 'mmt', 'S. Patel'],
  [2, 3, 4, 'bdc', 'K. Rao'],
  [3, 2, 3, 'direct', "J. D'Souza"],
  [4, 0, 4, 'mmt', 'A. Verma'],
  [5, 4, 3, 'airbnb', 'N. Gupta'],
]

// the animated "new booking" (row 1, cols 4-6)
const NEW = { row: 1, start: 4, span: 3, channel: 'direct', guest: 'T. Mehta' }

const LOOP = 6          // seconds per loop
const REPEAT_DELAY = 1.2

function Bar({ row, start, span, channel, guest }) {
  const x = colX(start) + 5
  const w = span * COL_W - 10
  const y = rowY(row) + 11
  return (
    <g>
      <rect x={x} y={y} width={w} height={30} rx={7} fill={CHANNELS[channel].color} />
      <text x={x + 10} y={y + 19.5} fontSize={10.5} fontWeight={500} fill="#fff">{guest}</text>
    </g>
  )
}

export default function AnimatedCalendar() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity

  const newBarX = colX(NEW.start) + 5
  const newBarW = NEW.span * COL_W - 10
  const newBarY = rowY(NEW.row) + 11
  const badgeCx = newBarX + newBarW - 15
  const badgeCy = newBarY + 15

  return (
    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-white border border-line/60">
      <svg viewBox="0 0 640 480" className="block w-full h-full" fontFamily="inherit" role="img" aria-label="Proppo booking calendar — a new direct booking arrives and syncs to OTAs">
        {/* ── top app bar ── */}
        <text x={24} y={40} fontSize={15} fontWeight={600} fill={INK}>Bookings</text>
        <text x={24} y={58} fontSize={10.5} fill={INK_SECONDARY}>October 13 – 19 · All channels</text>

        {/* sync status: pulsing dot + spinning refresh icon */}
        <motion.circle
          cx={468} cy={38} r={4} fill={SUCCESS}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduce ? {} : { scale: [1, 2.1], opacity: [0.55, 0] }}
          transition={{ duration: 1.8, repeat, ease: 'easeOut' }}
        />
        <circle cx={468} cy={38} r={3.5} fill={SUCCESS} />
        <text x={480} y={42} fontSize={11} fontWeight={500} fill={INK_SECONDARY}>OTA sync live</text>
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 2.4, repeat, ease: 'linear' }}
        >
          <path
            transform="translate(584.4 30.4) scale(0.64)"
            d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16 M8 16H3v5"
            fill="none" stroke={BRAND} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"
          />
        </motion.g>

        {/* ── calendar card ── */}
        <rect x={20} y={78} width={600} height={368} rx={12} fill="#fff" stroke={LINE} />

        {/* today highlight */}
        <rect x={colX(TODAY_COL)} y={GY} width={COL_W} height={ROWS * ROW_H} fill={BRAND} opacity={0.05} />

        {/* day header */}
        {DAYS.map((d, i) => (
          <text
            key={d} x={colX(i) + COL_W / 2} y={102} textAnchor="middle"
            fontSize={10} fontWeight={i === TODAY_COL ? 700 : 500}
            fill={i === TODAY_COL ? BRAND : INK_MUTED} letterSpacing={0.4}
          >
            {d}
          </text>
        ))}

        {/* grid lines */}
        {Array.from({ length: ROWS + 1 }, (_, r) => (
          <line key={`h${r}`} x1={20} x2={620} y1={rowY(r)} y2={rowY(r)} stroke={LINE} strokeWidth={1} opacity={r === 0 ? 0 : 0.7} />
        ))}
        {Array.from({ length: COLS + 1 }, (_, c) => (
          <line key={`v${c}`} x1={colX(c)} x2={colX(c)} y1={GY} y2={rowY(ROWS)} stroke={LINE} strokeWidth={1} opacity={0.7} />
        ))}
        <line x1={GX} x2={GX} y1={GY} y2={rowY(ROWS)} stroke={LINE} strokeWidth={1} />

        {/* room labels */}
        {ROOMS.map(([num, type], r) => (
          <g key={num}>
            <text x={36} y={rowY(r) + 24} fontSize={11.5} fontWeight={600} fill={INK}>{num}</text>
            <text x={36} y={rowY(r) + 38} fontSize={9} fill={INK_MUTED}>{type}</text>
          </g>
        ))}

        {/* static bookings, staggered in on mount */}
        <motion.g
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          {BOOKINGS.map(([r, c, s, ch, g]) => (
            <Bar key={`${r}-${c}`} row={r} start={c} span={s} channel={ch} guest={g} />
          ))}
        </motion.g>

        {/* ── the loop: a new direct booking lands and is synced ── */}
        <motion.g
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: LOOP, repeat, repeatDelay: REPEAT_DELAY, times: [0, 0.03, 0.86, 0.97] }}
        >
          <motion.rect
            x={newBarX} y={newBarY} width={newBarW} height={30} rx={7}
            fill={CHANNELS[NEW.channel].color}
            style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            animate={{ scaleX: [0, 0, 1, 1] }}
            transition={{ duration: LOOP, repeat, repeatDelay: REPEAT_DELAY, times: [0, 0.04, 0.16, 1], ease: 'easeOut' }}
          />
          <motion.text
            x={newBarX + 10} y={newBarY + 19.5} fontSize={10.5} fontWeight={500} fill="#fff"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: LOOP, repeat, repeatDelay: REPEAT_DELAY, times: [0, 0.14, 0.2, 0.92, 1] }}
          >
            {NEW.guest}
          </motion.text>
          <motion.text
            x={newBarX} y={newBarY - 4.5} fontSize={9} fontWeight={600} fill={SUCCESS}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: LOOP, repeat, repeatDelay: REPEAT_DELAY, times: [0, 0.18, 0.24, 0.92, 1] }}
          >
            New direct booking
          </motion.text>
          {/* synced check badge */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.3, 0.3, 1, 1, 0.6] }}
            transition={{ duration: LOOP, repeat, repeatDelay: REPEAT_DELAY, times: [0, 0.2, 0.28, 0.92, 1], ease: 'easeOut' }}
          >
            <circle cx={badgeCx} cy={badgeCy} r={9.5} fill="#fff" stroke={SUCCESS} strokeWidth={1.5} />
            <path
              transform={`translate(${badgeCx} ${badgeCy})`}
              d="M-3.5 0.5 L-1 3 L3.5 -2.5"
              fill="none" stroke={SUCCESS} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            />
          </motion.g>
        </motion.g>

        {/* legend */}
        {Object.values(CHANNELS).map((ch, i) => (
          <g key={ch.name} transform={`translate(${[180, 262, 384, 500][i]} 0)`}>
            <circle cx={0} cy={462} r={3.5} fill={ch.color} />
            <text x={10} y={465.5} fontSize={9.5} fill={INK_MUTED}>{ch.name}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

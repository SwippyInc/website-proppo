'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { CalendarDays, KeyRound, ChefHat, IndianRupee, Home, PlusCircle, Globe } from 'lucide-react'
import { VillaCards, GuestChatScene } from './SolutionScenes'

// ─────────────────────────────────────────────────────────────────────────────
// Animated scenes for product/solution pages (homepage scenes live in
// SolutionScenes.jsx). Same visual language: brand violet, warm neutrals,
// calm 5–7s loops with rest beats, reduced-motion safe.
// Wired in via components/SceneMedia.jsx (registry keyed by asset path).
// ─────────────────────────────────────────────────────────────────────────────

const INK = '#211E19'
const INK_SECONDARY = '#5C574D'
const INK_MUTED = '#8A8474'
const LINE = '#E3DDCE'
const BRAND = '#6840ff'
const SUCCESS = '#2F7A4F'
const AMBER = '#C9762B'
const BLUE = '#2B6CB0'
const RED = '#D02C1E' // proppo-kitchen accent

const frame = 'w-full rounded-xl border border-line bg-white overflow-hidden'

// ════════════════════════ DRAG & DROP ROOM CHANGE ═══════════════════════════
// property-management: a booking bar is dragged to a different room and the
// change lands everywhere. Loop: approach → grab → drag → snap → toast.

const D_LOOP = 6
const D_DELAY = 1.2
const dT = (times, repeat) => ({ duration: D_LOOP, repeat, repeatDelay: D_DELAY, times, ease: 'easeInOut' })

function DragDropScene({ aspect = 'aspect-video' }) {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => dT(times, repeat)

  // grid: 4 rooms x 5 days
  const GX = 96, GY = 78, CW = 104, RH = 56
  const rows = [['101', 'Deluxe'], ['102', 'Deluxe'], ['201', 'Suite'], ['202', 'Suite']]
  // the moved booking: row 1 (102) cols 1-3  →  row 2 (201)
  const bar = { x: GX + 104 + 5, y: GY + RH + 13, w: 3 * CW - 10, h: 30 }

  return (
    <div className={`${frame} ${aspect}`} role="img" aria-label="Drag-and-drop. A booking is moved from room 102 to room 201">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        <text x={24} y={38} fontSize={14} fontWeight={600} fill={INK}>Reservations</text>
        <text x={24} y={55} fontSize={10} fill={INK_MUTED}>Drag a booking to change its room</text>

        <rect x={20} y={66} width={600} height={246} rx={10} fill="#fff" stroke={LINE} />
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <text key={d} x={GX + i * CW + CW / 2} y={86} textAnchor="middle" fontSize={9.5} fill={INK_MUTED}>{d}</text>
        ))}
        {rows.map(([n, t], r) => (
          <g key={n}>
            <line x1={20} x2={620} y1={GY + r * RH} y2={GY + r * RH} stroke={LINE} opacity={r === 0 ? 0 : 0.7} />
            <text x={32} y={GY + r * RH + 24} fontSize={11} fontWeight={600} fill={INK}>{n}</text>
            <text x={32} y={GY + r * RH + 38} fontSize={8.5} fill={INK_MUTED}>{t}</text>
          </g>
        ))}
        <line x1={20} x2={620} y1={GY + 4 * RH} y2={GY + 4 * RH} stroke={LINE} opacity={0.7} />
        {Array.from({ length: 6 }, (_, c) => (
          <line key={c} x1={GX + c * CW} x2={GX + c * CW} y1={GY} y2={GY + 4 * RH} stroke={LINE} opacity={0.7} />
        ))}

        {/* static bookings */}
        <rect x={GX + 5} y={GY + 13} width={2 * CW - 10} height={30} rx={7} fill={SUCCESS} />
        <text x={GX + 15} y={GY + 32} fontSize={10} fill="#fff" fontWeight={500}>A. Sharma</text>
        <rect x={GX + 5} y={GY + 2 * RH + 13} width={2 * CW - 10} height={30} rx={7} fill={BLUE} />
        <text x={GX + 15} y={GY + 2 * RH + 32} fontSize={10} fill="#fff" fontWeight={500}>S. Patel</text>
        <rect x={GX + 2 * CW + 5} y={GY + 3 * RH + 13} width={3 * CW - 10} height={30} rx={7} fill={AMBER} />
        <text x={GX + 2 * CW + 15} y={GY + 3 * RH + 32} fontSize={10} fill="#fff" fontWeight={500}>N. Gupta</text>

        {/* dashed ghost at the origin while dragging */}
        <motion.rect
          x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx={7}
          fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="5 4"
          animate={{ opacity: [0, 0, 0.55, 0.55, 0, 0] }}
          transition={tr([0, 0.2, 0.26, 0.62, 0.72, 1])}
        />

        {/* the dragged bar: rests in 102, lifts, glides to 201, snaps; fades out before the loop restarts */}
        <motion.g
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={tr([0, 0.05, 0.88, 0.96])}
        >
          <motion.g
            animate={{ y: [0, 0, -4, 52, 56, 56] }}
            transition={tr([0, 0.22, 0.3, 0.52, 0.58, 1])}
          >
            <motion.rect
              x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx={7} fill={BRAND}
              style={{ filter: 'drop-shadow(0 4px 8px rgba(104,64,255,0.25))' }}
            />
            <text x={bar.x + 10} y={bar.y + 19.5} fontSize={10} fill="#fff" fontWeight={500}>M. Khan · Suite upgrade</text>
          </motion.g>
        </motion.g>

        {/* cursor: enters, grabs, follows the drag, leaves */}
        <motion.g
          animate={{
            x: [60, 265, 265, 265, 295, 295],
            y: [300, 165, 165, 161, 217, 250],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={tr([0, 0.14, 0.24, 0.3, 0.58, 0.72])}
        >
          <path d="M0 0 L0 15 L4 11.5 L7 17 L9.5 15.8 L6.5 10 L12 10 Z" fill={INK} stroke="#fff" strokeWidth={1.2} />
        </motion.g>

        {/* toast */}
        <motion.g
          animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 4] }}
          transition={tr([0, 0.6, 0.68, 0.9, 0.97])}
        >
          <rect x={352} y={322} width={264} height={26} rx={13} fill={INK} />
          <circle cx={368} cy={335} r={7} fill={SUCCESS} />
          <path d="M364.5 335 l2.5 2.5 l4.5 -5" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          <text x={381} y={338.5} fontSize={10} fill="#fff" fontWeight={500}>Moved to Suite 201 · updated everywhere</text>
        </motion.g>
      </svg>
    </div>
  )
}

// ════════════════════════ CHANNEL MANAGER SYNC ══════════════════════════════
// inventory-distribution: a rate change in Proppo ripples out to every OTA.

const S_LOOP = 6
const S_DELAY = 1.2

const SYNC_NODES = [
  { x: 92, y: 64, logo: '/icons/ota/booking-com.png', w: 84 },
  { x: 452, y: 64, logo: '/icons/ota/airbnb.png', w: 76 },
  { x: 92, y: 250, logo: '/icons/ota/makemytrip.png', w: 84 },
  { x: 452, y: 250, logo: '/icons/ota/goibibo.png', w: 76 },
]

function SyncScene({ aspect = 'aspect-video' }) {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: S_LOOP, repeat, repeatDelay: S_DELAY, times, ease: 'easeInOut' })
  const C = { x: 320, y: 172 } // hub center

  return (
    <div className={`${frame} ${aspect}`} role="img" aria-label="Channel manager. A rate change syncs from Proppo to every connected OTA">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        {/* connectors with a constant gentle flow */}
        {SYNC_NODES.map((n, i) => {
          const nx = n.x + 48, ny = n.y + 26
          return (
            <g key={i}>
              <line x1={C.x} y1={C.y} x2={nx} y2={ny} stroke={LINE} strokeWidth={1.5} />
              <motion.line
                x1={C.x} y1={C.y} x2={nx} y2={ny} stroke={BRAND} strokeWidth={1.5}
                strokeDasharray="3 9" opacity={0.5}
                animate={reduce ? {} : { strokeDashoffset: [0, -48] }}
                transition={{ duration: 2.2, repeat, ease: 'linear' }}
              />
            </g>
          )
        })}

        {/* OTA nodes */}
        {SYNC_NODES.map((n, i) => (
          <g key={n.logo}>
            <rect x={n.x} y={n.y} width={96} height={52} rx={10} fill="#fff" stroke={LINE} />
            <image href={n.logo} x={n.x + 12} y={n.y + 14} width={n.w - 24} height={24} preserveAspectRatio="xMidYMid meet" />
            {/* synced check pops after the pulse arrives */}
            <motion.g
              animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1, 1, 0.6] }}
              transition={{ duration: S_LOOP, repeat, repeatDelay: S_DELAY, times: [0, 0.34 + i * 0.03, 0.42 + i * 0.03, 0.88, 0.95], ease: 'easeOut' }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <circle cx={n.x + 96} cy={n.y} r={9} fill="#fff" stroke={SUCCESS} strokeWidth={1.5} />
              <path d={`M${n.x + 92.5} ${n.y} l2.5 2.5 l4.5 -5`} fill="none" stroke={SUCCESS} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          </g>
        ))}

        {/* rate pill above hub */}
        <motion.g
          animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -3] }}
          transition={tr([0, 0.06, 0.86, 0.94])}
        >
          <rect x={236} y={52} width={168} height={26} rx={13} fill="#fff" stroke={BRAND} strokeOpacity={0.35} />
          <text x={320} y={69} fontSize={10.5} textAnchor="middle" fill={INK}>
            Rate · Deluxe <tspan fill={INK_MUTED}>₹4,200</tspan> → <tspan fill={BRAND} fontWeight={600}>₹4,500</tspan>
          </text>
        </motion.g>

        {/* hub */}
        <rect x={C.x - 34} y={C.y - 34} width={68} height={68} rx={14} fill="#fff" stroke={BRAND} strokeWidth={1.5} />
        <motion.rect
          x={C.x - 34} y={C.y - 34} width={68} height={68} rx={14} fill="none" stroke={BRAND}
          animate={reduce ? { opacity: 0 } : { opacity: [0.5, 0] }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          transition={{ duration: 2, repeat, ease: 'easeOut' }}
        />
        <text x={C.x} y={C.y + 8} fontSize={24} fontWeight={700} fill={BRAND} textAnchor="middle">P</text>
        <text x={C.x} y={C.y + 52} fontSize={9.5} fill={INK_MUTED} textAnchor="middle">Proppo PMS</text>

        {/* pulses traveling hub → each OTA */}
        {SYNC_NODES.map((n, i) => {
          const nx = n.x + 48, ny = n.y + 26
          return (
            <motion.circle
              key={`p${i}`} r={4.5} fill={BRAND}
              animate={{
                cx: [C.x, C.x, nx, nx],
                cy: [C.y, C.y, ny, ny],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: S_LOOP, repeat, repeatDelay: S_DELAY, times: [0, 0.18 + i * 0.035, 0.34 + i * 0.035, 0.4 + i * 0.035], ease: 'easeInOut' }}
            />
          )
        })}

        <motion.text
          x={320} y={338} fontSize={10} fill={SUCCESS} fontWeight={600} textAnchor="middle"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={tr([0, 0.44, 0.52, 0.88, 0.95])}
        >
          Synced to all channels in under a second
        </motion.text>
      </svg>
    </div>
  )
}

// ════════════════════════ OTA CONNECTION CARD ═══════════════════════════════
// channel-manager/[ota]: the connection screen for one OTA — logo, live status,
// and a booking arriving through the channel.

const OTA_NAMES = {
  'booking-com': 'Booking.com', airbnb: 'Airbnb', goibibo: 'Goibibo', makemytrip: 'MakeMyTrip',
  expedia: 'Expedia', agoda: 'Agoda', yatra: 'Yatra', easemytrip: 'EaseMyTrip',
  cleartrip: 'Cleartrip', travelguru: 'Travelguru',
}

function OtaConnectScene({ slug, aspect = 'aspect-video' }) {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const name = OTA_NAMES[slug] ?? slug
  const logo = `/icons/ota/${slug}.png`
  const hasLogo = slug !== 'travelguru'

  return (
    <div className={`${frame} ${aspect}`} role="img" aria-label={`${name} connected to Proppo, rates, availability and bookings syncing`}>
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        <rect x={24} y={28} width={592} height={304} rx={14} fill="#fff" stroke={LINE} />

        {/* logo + status */}
        <rect x={56} y={60} width={180} height={80} rx={12} fill="#fff" stroke={LINE} />
        {hasLogo ? (
          <image href={logo} x={76} y={80} width={140} height={40} preserveAspectRatio="xMidYMid meet" />
        ) : (
          <text x={146} y={106} fontSize={17} fontWeight={600} fill={INK} textAnchor="middle" letterSpacing={0.3}>travelguru</text>
        )}
        <text x={266} y={92} fontSize={15} fontWeight={600} fill={INK}>{name}</text>
        <rect x={266} y={106} width={96} height={22} rx={11} fill={SUCCESS} opacity={0.12} />
        <motion.circle
          cx={278} cy={117} r={3.5} fill={SUCCESS}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduce ? {} : { scale: [1, 1.9], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat, ease: 'easeOut' }}
        />
        <circle cx={278} cy={117} r={3} fill={SUCCESS} />
        <text x={288} y={121} fontSize={10} fontWeight={600} fill={SUCCESS}>Connected</text>
        <text x={266} y={144} fontSize={9.5} fill={INK_MUTED}>Two-way sync · real-time</text>

        {/* sync rows */}
        {['Rates & restrictions', 'Availability', 'Bookings'].map((row, i) => (
          <g key={row} transform={`translate(56 ${172 + i * 40})`}>
            <rect width={528} height={32} rx={8} fill="#FAF9F6" />
            <text x={14} y={20.5} fontSize={11} fill={INK} fontWeight={500}>{row}</text>
            <motion.path
              d="M466 16 l3 3 l5 -6" fill="none" stroke={SUCCESS} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4 + i * 0.25, duration: 0.5, ease: 'easeOut' }}
            />
            <text x={448} y={20.5} fontSize={9.5} fill={INK_MUTED} textAnchor="end">syncing</text>
          </g>
        ))}

        {/* booking arriving through the channel */}
        <motion.g
          animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 6] }}
          transition={{ duration: 5.5, repeat, repeatDelay: 1.2, times: [0, 0.08, 0.82, 0.94], ease: 'easeOut' }}
        >
          <rect x={308} y={292} width={276} height={30} rx={15} fill={INK} />
          <circle cx={325} cy={307} r={7.5} fill={BRAND} />
          <path d="M325 303.2 v3.4 l2.4 2.4" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={340} y={311} fontSize={10.5} fill="#fff" fontWeight={500}>
            New booking · {name} · 2 nights · <tspan fontWeight={700}>₹8,400</tspan>
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

// ════════════════════════ GUIDEBOOK (GUEST VIEW, MOBILE) ════════════════════
// guest-experience: the guest guidebook from the booking-engine — WiFi card,
// house manual, nearby, dining. The WiFi password copies itself on a loop.

function GuidebookScene({ aspect = 'aspect-[9/16]' }) {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: 6, repeat, repeatDelay: 1.2, times, ease: 'easeInOut' })

  return (
    <div className={`${frame} ${aspect}`} role="img" aria-label="Guest guidebook on mobile, WiFi details, house manual, nearby places, dining">
      <svg viewBox="0 0 360 640" className="block w-full h-full" fontFamily="inherit">
        <rect width={360} height={640} fill="#F1F2FF" />

        {/* header */}
        <rect width={360} height={120} fill={BRAND} />
        <circle cx={40} cy={60} r={18} fill="#fff" opacity={0.2} />
        <text x={40} y={65} fontSize={13} fontWeight={600} fill="#fff" textAnchor="middle">PH</text>
        <text x={70} y={54} fontSize={14} fontWeight={600} fill="#fff">Pine Hollow Cottage</text>
        <text x={70} y={72} fontSize={10} fill="#fff" opacity={0.75}>Guest guide · Mashobra</text>
        <text x={24} y={108} fontSize={9.5} fill="#fff" opacity={0.85} letterSpacing={1.5}>WELCOME, MEERA</text>

        {/* WiFi card — the star */}
        <g>
          <rect x={20} y={140} width={320} height={96} rx={14} fill="#fff" />
          <text x={38} y={168} fontSize={10} fontWeight={600} fill={INK_MUTED} letterSpacing={1}>WI-FI</text>
          <text x={38} y={190} fontSize={13} fontWeight={600} fill={INK}>PineHollow_5G</text>
          <text x={38} y={212} fontSize={11} fill={INK_MUTED} fontFamily="monospace">pinemeadow24</text>
          {/* copy button */}
          <motion.g
            animate={{ scale: [1, 1, 0.9, 1, 1] }}
            transition={tr([0, 0.18, 0.22, 0.28, 1])}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <rect x={282} y={184} width={40} height={34} rx={9} fill={BRAND} opacity={0.1} />
            <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.24, 0.3, 0.86, 0.94])}>
              <rect x={297} y={196} width={9} height={11} rx={1.5} fill="none" stroke={BRAND} strokeWidth={1.6} />
              <path d="M294 199 v-2 a1.5 1.5 0 0 1 1.5 -1.5 h6 a1.5 1.5 0 0 1 1.5 1.5 v8" fill="none" stroke={BRAND} strokeWidth={1.6} />
            </motion.g>
            <motion.path
              d="M296 201 l3 3 l5.5 -6.5" fill="none" stroke={SUCCESS} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={tr([0, 0.26, 0.32, 0.86, 0.94])}
            />
          </motion.g>
          {/* "Copied" chip */}
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.3, 0.36, 0.8, 0.9])}>
            <rect x={252} y={148} width={70} height={20} rx={10} fill={SUCCESS} />
            <text x={287} y={161.5} fontSize={9} fontWeight={600} fill="#fff" textAnchor="middle">Copied</text>
          </motion.g>
        </g>

        {/* other guide sections */}
        {[
          ['House Manual', 'Rules, appliances & how-tos', '#C9762B'],
          ['Nearby', 'Treks, cafes & view-points', '#2B6CB0'],
          ['Food & Dining', 'Order from the kitchen menu', '#D02C1E'],
        ].map(([title, sub, color], i) => (
          <g key={title} transform={`translate(20 ${252 + i * 76})`}>
            <rect width={320} height={64} rx={14} fill="#fff" />
            <circle cx={32} cy={32} r={15} fill={color} opacity={0.12} />
            <circle cx={32} cy={32} r={5} fill={color} />
            <text x={58} y={29} fontSize={12.5} fontWeight={600} fill={INK}>{title}</text>
            <text x={58} y={45} fontSize={9.5} fill={INK_MUTED}>{sub}</text>
            <path d="M312 27 l5 5 l-5 5" fill="none" stroke={INK_MUTED} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}

        {/* help banner */}
        <rect x={20} y={486} width={320} height={54} rx={14} fill={BRAND} opacity={0.08} />
        <text x={38} y={509} fontSize={11.5} fontWeight={600} fill={BRAND}>Need anything?</text>
        <text x={38} y={525} fontSize={9.5} fill={INK_SECONDARY}>Message your host · replies in minutes</text>

        {/* bottom tab bar */}
        <rect x={0} y={576} width={360} height={64} fill="#fff" />
        <line x1={0} y1={576} x2={360} y2={576} stroke={LINE} />
        {[
          ['Home', true], ['Essentials', false], ['Manual', false], ['Help', false],
        ].map(([tab, active], i) => (
          <g key={tab} transform={`translate(${45 + i * 90} 0)`}>
            <circle cx={0} cy={596} r={4} fill={active ? BRAND : INK_MUTED} opacity={active ? 1 : 0.5} />
            <text x={0} y={616} fontSize={8.5} textAnchor="middle" fontWeight={active ? 600 : 400} fill={active ? BRAND : INK_MUTED}>{tab}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ════════════════════════ QR MENU ORDERING ══════════════════════════════════
// operations: guest scans, taps a dish, order lands in the kitchen. Red accent
// from proppo-kitchen.

function QrMenuScene({ aspect = 'aspect-video' }) {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: 6.5, repeat, repeatDelay: 1.2, times, ease: 'easeInOut' })

  const tray = { x: 368, y: 92 } // order tray position
  const addBtn = { x: 296, y: 182 } // + button on Paneer Tikka row

  return (
    <div className={`${frame} ${aspect}`} role="img" aria-label="QR menu. A guest adds a dish and sends the order to the kitchen">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        {/* menu card */}
        <rect x={24} y={24} width={300} height={312} rx={14} fill="#fff" stroke={LINE} />
        <rect x={24} y={24} width={300} height={52} rx={14} fill={RED} />
        <rect x={24} y={62} width={300} height={14} fill={RED} />
        <text x={42} y={56} fontSize={13} fontWeight={600} fill="#fff">Pine Hollow Kitchen</text>
        <text x={42} y={88} fontSize={9} fill={INK_MUTED} letterSpacing={1}>SCANNED FROM ROOM 204</text>

        {[
          ['Masala Dosa', '₹120'], ['Paneer Tikka', '₹240'], ['Cold Coffee', '₹90'],
        ].map(([dish, price], i) => {
          const y = 104 + i * 64
          const hot = i === 1
          return (
            <g key={dish}>
              <rect x={40} y={y} width={268} height={52} rx={10} fill={hot ? '#FDF3F2' : '#FAF9F6'} stroke={hot ? RED : 'none'} strokeOpacity={hot ? 0.25 : 0} />
              <circle cx={66} cy={y + 26} r={14} fill={RED} opacity={0.1} />
              <circle cx={66} cy={y + 26} r={5.5} fill="none" stroke={RED} strokeWidth={1.4} />
              <circle cx={66} cy={y + 26} r={1.4} fill={RED} />
              <text x={90} y={y + 22} fontSize={11.5} fontWeight={600} fill={INK}>{dish}</text>
              <text x={90} y={y + 38} fontSize={10} fill={INK_MUTED}>{price}</text>
              {hot ? (
                <motion.g
                  animate={{ scale: [1, 1, 0.85, 1, 1] }}
                  transition={tr([0, 0.1, 0.14, 0.2, 1])}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <circle cx={addBtn.x} cy={y + 26} r={13} fill={RED} />
                  <path d={`M${addBtn.x - 5} ${y + 26} h10 M${addBtn.x} ${y + 21} v10`} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
                </motion.g>
              ) : (
                <g opacity={0.45}>
                  <circle cx={addBtn.x} cy={y + 26} r={13} fill={RED} />
                  <path d={`M${addBtn.x - 5} ${y + 26} h10 M${addBtn.x} ${y + 21} v10`} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
                </g>
              )}
            </g>
          )
        })}

        {/* order tray */}
        <rect x={352} y={24} width={264} height={312} rx={14} fill="#fff" stroke={LINE} />
        <text x={372} y={56} fontSize={12.5} fontWeight={600} fill={INK}>Your order</text>
        <text x={372} y={72} fontSize={9.5} fill={INK_MUTED}>Room 204 · dine-in</text>

        {/* the dish flying menu → tray */}
        <motion.circle
          r={8} fill={RED}
          animate={{
            cx: [addBtn.x, addBtn.x, 420, 420],
            cy: [182, 182, 130, 130],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.1, 0.9, 0.4],
          }}
          transition={tr([0, 0.13, 0.3, 0.36])}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />

        {/* tray line item */}
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0], x: [-10, -10, 0, 0, 0] }} transition={tr([0, 0.3, 0.38, 0.9, 0.97])}>
          <rect x={368} y={104} width={232} height={40} rx={9} fill="#FAF9F6" />
          <text x={382} y={121.5} fontSize={11} fontWeight={500} fill={INK}>Paneer Tikka</text>
          <text x={382} y={136} fontSize={9} fill={INK_MUTED}>×1</text>
          <text x={586} y={124} fontSize={11} fontWeight={600} fill={INK} textAnchor="end">₹240</text>
        </motion.g>

        <line x1={368} y1={240} x2={600} y2={240} stroke={LINE} strokeDasharray="3 4" />
        <text x={368} y={264} fontSize={11} fill={INK_SECONDARY}>Total</text>
        <motion.g animate={{ opacity: [0.35, 0.35, 1, 1, 0.35] }} transition={tr([0, 0.3, 0.4, 0.9, 0.97])}>
          <text x={600} y={266} fontSize={15} fontWeight={700} fill={INK} textAnchor="end">₹240</text>
        </motion.g>

        {/* place order → sent */}
        <motion.g
          animate={{ opacity: [0.45, 0.45, 1, 1, 1, 0.45] }}
          transition={tr([0, 0.32, 0.4, 0.55, 0.9, 0.97])}
        >
          <motion.rect
            x={368} y={284} width={232} height={36} rx={18} fill={RED}
            animate={reduce ? {} : { opacity: [1, 0.75, 1] }}
            transition={{ duration: 1.6, repeat, ease: 'easeInOut' }}
          />
          <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.52, 0.58, 0.88, 0.96])}>
            <text x={484} y={307} fontSize={12} fontWeight={600} fill="#fff" textAnchor="middle">Place order</text>
          </motion.g>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.56, 0.62, 0.88, 0.96])}>
            <path d="M436 303 l3 3 l5.5 -6.5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <text x={494} y={307} fontSize={12} fontWeight={600} fill="#fff" textAnchor="middle">Sent to kitchen · KOT #142</text>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  )
}

// ════════════════════════ KITCHEN KOT BOARD ═════════════════════════════════
// operations: a ticket arrives, then travels New → Preparing → Ready.

function KitchenBoardScene({ aspect = 'aspect-video' }) {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: 6.5, repeat, repeatDelay: 1.2, times, ease: 'easeInOut' })

  const colX = [24, 232, 440] // 3 columns, width 192
  const TICKET_W = 176

  const Ticket = ({ id, where, items, time, x, y, accent }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width={TICKET_W} height={64} rx={9} fill="#fff" stroke={LINE} />
      <rect width={3.5} height={64} rx={1.75} fill={accent} />
      <text x={14} y={18} fontSize={10} fontWeight={700} fill={INK}>{id}</text>
      <text x={14} y={32} fontSize={9} fill={INK_SECONDARY}>{where}</text>
      <text x={14} y={46} fontSize={9} fill={INK_MUTED}>{items}</text>
      <text x={TICKET_W - 10} y={18} fontSize={9} fill={INK_MUTED} textAnchor="end">{time}</text>
    </g>
  )

  return (
    <div className={`${frame} ${aspect}`} role="img" aria-label="Kitchen dashboard. A KOT ticket moves from new to preparing to ready">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        <text x={24} y={38} fontSize={14} fontWeight={600} fill={INK}>Kitchen · live KOT queue</text>
        {/* bell with a ring when the ticket lands */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}
          animate={reduce ? {} : { rotate: [0, 0, 12, -10, 6, 0, 0] }}
          transition={{ duration: 6.5, repeat, repeatDelay: 1.2, times: [0, 0.06, 0.09, 0.12, 0.15, 0.18, 1] }}
        >
          <path d="M596 26 a7 7 0 0 1 7 7 c0 5 2 7 3 8 h-20 c1 -1 3 -3 3 -8 a7 7 0 0 1 7 -7 Z" fill="none" stroke={INK_SECONDARY} strokeWidth={1.6} strokeLinejoin="round" />
          <circle cx={596} cy={43} r={2} fill={INK_SECONDARY} />
        </motion.g>
        <motion.circle
          cx={604} cy={26} r={4} fill={RED}
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1, 1, 0.5] }}
          transition={tr([0, 0.06, 0.1, 0.3, 0.4])}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />

        {/* column headers */}
        {[['New', AMBER], ['Preparing', BLUE], ['Ready', SUCCESS]].map(([label, color], i) => (
          <g key={label} transform={`translate(${colX[i]} 56)`}>
            <rect width={192} height={26} rx={8} fill={color} opacity={0.1} />
            <circle cx={14} cy={13} r={3.5} fill={color} />
            <text x={26} y={17} fontSize={10.5} fontWeight={600} fill={color}>{label}</text>
          </g>
        ))}

        {/* static tickets */}
        <Ticket id="#140" where="Table 5 · dine-in" items="2× Masala Dosa" time="12m" x={colX[0] + 8} y={96} accent={AMBER} />
        <Ticket id="#138" where="Room 301" items="1× Club Sandwich" time="18m" x={colX[1] + 8} y={96} accent={BLUE} />
        <Ticket id="#136" where="Table 2 · dine-in" items="3× Cold Coffee" time="done" x={colX[2] + 8} y={96} accent={SUCCESS} />
        <Ticket id="#139" where="Room 102" items="2× Paneer Tikka" time="24m" x={colX[1] + 8} y={172} accent={BLUE} />
        <Ticket id="#134" where="Table 7 · dine-in" items="1× Veg Biryani" time="done" x={colX[2] + 8} y={172} accent={SUCCESS} />

        {/* the travelling ticket #142 */}
        <motion.g
          animate={{
            x: [colX[0] + 8, colX[0] + 8, colX[1] + 8, colX[1] + 8, colX[2] + 8, colX[2] + 8],
            y: [176, 176, 176, 176, 176, 176],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={tr([0, 0.1, 0.36, 0.62, 0.68, 0.92])}
        >
          <rect width={TICKET_W} height={64} rx={9} fill="#fff" stroke={RED} strokeOpacity={0.4} style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.08))' }} />
          <motion.rect width={3.5} height={64} rx={1.75}
            animate={{ fill: [AMBER, AMBER, BLUE, BLUE, SUCCESS, SUCCESS] }}
            transition={tr([0, 0.36, 0.4, 0.68, 0.72, 1])}
          />
          <text x={14} y={18} fontSize={10} fontWeight={700} fill={INK}>#142</text>
          <text x={14} y={32} fontSize={9} fill={INK_SECONDARY}>Room 204</text>
          <text x={14} y={46} fontSize={9} fill={INK_MUTED}>1× Paneer Tikka</text>
          {/* status chip crossfades with each hop */}
          <motion.g animate={{ opacity: [1, 1, 0, 0, 0, 0] }} transition={tr([0, 0.36, 0.4, 0.9, 0.95, 1])}>
            <text x={TICKET_W - 10} y={18} fontSize={9} fontWeight={600} fill={AMBER} textAnchor="end">new</text>
          </motion.g>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={tr([0, 0.38, 0.42, 0.68, 0.72, 1])}>
            <text x={TICKET_W - 10} y={18} fontSize={9} fontWeight={600} fill={BLUE} textAnchor="end">cooking</text>
          </motion.g>
          <motion.g animate={{ opacity: [0, 0, 0, 0, 1, 1] }} transition={tr([0, 0.66, 0.7, 0.74, 0.78, 0.92])}>
            <circle cx={TICKET_W - 16} cy={14} r={7} fill={SUCCESS} />
            <path d={`M${TICKET_W - 19} 14 l2 2 l4 -4.5`} fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </motion.g>

        <motion.text
          x={320} y={330} fontSize={10} fill={INK_MUTED} textAnchor="middle"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={tr([0, 0.72, 0.78, 0.9, 0.97])}
        >
          KOT #142 ready · room 204 notified
        </motion.text>
      </svg>
    </div>
  )
}

// ════════════════════════ MULTI-DEPARTMENT DASHBOARD ════════════════════════
// solutions/hotels-resorts extraAsset: one screen holding front office,
// housekeeping, restaurant, and finance — with live numbers.

function MultiDeptScene({ aspect = 'aspect-[4/3]' }) {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: 7, repeat, repeatDelay: 1.2, times, ease: 'easeInOut' })

  const Card = ({ x, y, title, children }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width={288} height={150} rx={12} fill="#fff" stroke={LINE} />
      {children}
      <text x={18} y={30} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>{title}</text>
    </g>
  )
  const Num = ({ x, y, children, color = INK }) => (
    <text x={x} y={y} fontSize={26} fontWeight={600} fill={color}>{children}</text>
  )

  return (
    <div className={`${frame} ${aspect}`} role="img" aria-label="Multi-department dashboard, front office, housekeeping, restaurant and finance in one view">
      <svg viewBox="0 0 640 480" className="block w-full h-full" fontFamily="inherit">
        <text x={28} y={44} fontSize={15} fontWeight={600} fill={INK}>Cedar Resort</text>
        <text x={28} y={62} fontSize={10.5} fill={INK_MUTED}>All departments · one login</text>
        <motion.circle
          cx={592} cy={40} r={4} fill={SUCCESS}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduce ? {} : { scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat, ease: 'easeOut' }}
        />
        <circle cx={592} cy={40} r={3.5} fill={SUCCESS} />

        {/* front office */}
        <Card x={24} y={84} title="FRONT OFFICE">
          <Num x={18} y={76}>86%</Num>
          <text x={18} y={96} fontSize={9.5} fill={INK_MUTED}>occupancy tonight</text>
          <rect x={18} y={112} width={252} height={6} rx={3} fill={LINE} opacity={0.5} />
          <motion.rect x={18} y={112} height={6} rx={3} fill={BRAND}
            initial={{ width: 0 }} animate={{ width: 217 }} transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }} />
        </Card>

        {/* housekeeping: 21 → 22 */}
        <Card x={328} y={84} title="HOUSEKEEPING">
          <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.56, 0.6, 0.9, 0.96])}>
            <Num x={18} y={76}>21<tspan fontSize={13} fill={INK_MUTED}>/24</tspan></Num>
          </motion.g>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.58, 0.64, 0.9, 0.96])}>
            <Num x={18} y={76} color={SUCCESS}>22<tspan fontSize={13} fill={INK_MUTED}>/24</tspan></Num>
          </motion.g>
          <text x={18} y={96} fontSize={9.5} fill={INK_MUTED}>rooms ready</text>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.58, 0.64, 0.86, 0.94])}>
            <rect x={18} y={108} width={120} height={18} rx={9} fill={SUCCESS} opacity={0.12} />
            <text x={78} y={120.5} fontSize={8.5} fontWeight={600} fill={SUCCESS} textAnchor="middle">204 just turned</text>
          </motion.g>
        </Card>

        {/* restaurant: 3 → 4 KOTs */}
        <Card x={24} y={250} title="RESTAURANT">
          <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.26, 0.3, 0.9, 0.96])}>
            <Num x={18} y={76}>3</Num>
          </motion.g>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.28, 0.34, 0.9, 0.96])}>
            <Num x={18} y={76} color={AMBER}>4</Num>
          </motion.g>
          <text x={18} y={96} fontSize={9.5} fill={INK_MUTED}>open KOTs</text>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.28, 0.34, 0.6, 0.68])}>
            <rect x={18} y={108} width={140} height={18} rx={9} fill={AMBER} opacity={0.12} />
            <text x={88} y={120.5} fontSize={8.5} fontWeight={600} fill={AMBER} textAnchor="middle">#142 · Room 204</text>
          </motion.g>
        </Card>

        {/* finance: revenue bumps */}
        <Card x={328} y={250} title="FINANCE">
          <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.4, 0.44, 0.9, 0.96])}>
            <Num x={18} y={76}>₹48,240</Num>
          </motion.g>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.42, 0.48, 0.9, 0.96])}>
            <Num x={18} y={76} color={SUCCESS}>₹52,640</Num>
          </motion.g>
          <text x={18} y={96} fontSize={9.5} fill={INK_MUTED}>revenue today</text>
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.42, 0.48, 0.72, 0.8])}>
            <rect x={18} y={108} width={150} height={18} rx={9} fill={BRAND} opacity={0.1} />
            <text x={93} y={120.5} fontSize={8.5} fontWeight={600} fill={BRAND} textAnchor="middle">+ booking · MMT</text>
          </motion.g>
        </Card>

        {/* footer line */}
        <text x={320} y={452} fontSize={10} fill={INK_MUTED} textAnchor="middle">Every department updates the others. Nothing typed twice.</text>
      </svg>
    </div>
  )
}

// ════════════════════════ DIRECT BOOKING ENGINE (ANIMATED WIDGET) ═══════════
// revenue-booking: the booking flow completing itself — dates picked, button
// pressed, rooms appear, one gets booked at zero commission.

const BE_PHASES = { WIDGET: 0, RESULTS: 1, CONFIRMED: 2 }

function BookingEngineScene() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState(BE_PHASES.WIDGET)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 3200)
    return () => clearInterval(t)
  }, [reduce])

  const cell = 'h-6 rounded-md text-[9px] flex items-center justify-center'

  return (
    <div className="rounded-xl bg-surface-bg p-4 md:p-5 min-h-[318px]" role="img" aria-label="Direct booking engine, dates, live rooms, instant confirmation, zero commission">
      <AnimatePresence mode="wait">
        {phase === BE_PHASES.WIDGET && (
          <motion.div key="w" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
            {/* date picker */}
            <div className="rounded-xl border border-line bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">July 2026</p>
                <span className="text-[9px] font-medium text-brand-primary bg-brand-primary/10 rounded-full px-2 py-0.5">2 nights</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['M','T','W','T','F','S','S'].map((d, i) => <span key={i} className="text-[8px] text-ink-muted">{d}</span>)}
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1
                  const inRange = day >= 18 && day <= 20
                  const edge = day === 18 || day === 20
                  return (
                    <motion.span
                      key={day}
                      initial={false}
                      animate={{
                        backgroundColor: edge ? BRAND : inRange ? '#ECEBFD' : 'rgba(0,0,0,0)',
                        color: edge ? '#fff' : inRange ? BRAND : '#5C574D',
                      }}
                      transition={{ delay: 0.5 + (day - 18) * 0.35, duration: 0.3 }}
                      className={`${cell} font-medium ${edge ? 'font-bold' : ''}`}
                    >
                      {day}
                    </motion.span>
                  )
                })}
              </div>
            </div>
            {/* guests + CTA */}
            <div className="mt-2.5 flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2">
              <p className="text-[11px] text-ink"><span className="text-ink-muted">Guests</span> · 2 adults · 1 room</p>
              <span className="text-[9px] text-ink-muted">edit</span>
            </div>
            <motion.button
              type="button"
              className="btn btn_v2_pri mt-2.5 w-full rounded-pill px-4 py-2.5 text-sm font-medium"
              animate={reduce ? {} : { scale: [1, 1, 0.96, 1, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.82, 0.86, 0.92, 1] }}
            >
              Check availability
            </motion.button>
          </motion.div>
        )}

        {phase === BE_PHASES.RESULTS && (
          <motion.div key="r" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="space-y-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">18 – 20 Jul · 2 rooms free</p>
            {[
              { name: 'Deluxe Room', price: '₹4,500', note: 'Free cancellation', hot: true },
              { name: 'Suite · Valley View', price: '₹6,800', note: 'Breakfast included', hot: false },
            ].map((room, i) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.35, ease: 'easeOut' }}
                className={`flex items-center justify-between rounded-xl border bg-white px-3 py-2.5 ${room.hot ? 'border-brand-primary/50' : 'border-line'}`}
              >
                <div>
                  <p className="text-[12px] font-semibold text-ink">{room.name}</p>
                  <p className="text-[9.5px] text-ink-muted">{room.note}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-ink">{room.price}<span className="text-[9px] font-normal text-ink-muted">/night</span></p>
                  {room.hot ? (
                    <motion.span
                      className="inline-block mt-1 rounded-pill bg-brand-primary text-white text-[9.5px] font-semibold px-3 py-1"
                      animate={reduce ? {} : { scale: [1, 1, 0.92, 1, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.55, 0.62, 0.72, 1] }}
                    >
                      Book
                    </motion.span>
                  ) : (
                    <span className="inline-block mt-1 rounded-pill border border-line text-ink-secondary text-[9.5px] font-medium px-3 py-1">Book</span>
                  )}
                </div>
              </motion.div>
            ))}
            <p className="text-center text-[9.5px] text-semantic-success font-medium">Best rate here. OTAs charge more after commission</p>
          </motion.div>
        )}

        {phase === BE_PHASES.CONFIRMED && (
          <motion.div key="c" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="flex flex-col items-center text-center py-6">
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.15 }}
              className="h-12 w-12 rounded-full bg-semantic-success/15 flex items-center justify-center"
            >
              <svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 11.5 l4 4 l8 -9" fill="none" stroke={SUCCESS} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
            <p className="mt-3 text-sm font-semibold text-ink">Booking confirmed</p>
            <p className="text-[11px] text-ink-muted mt-0.5">Deluxe Room · 18–20 Jul · ₹9,000</p>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-pill bg-semantic-success/10 px-3 py-1 text-[10px] font-semibold text-semantic-success">Zero commission · paid securely</span>
            <p className="mt-2 text-[9.5px] font-mono text-ink-muted">PROP-BK-2481</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ════════════════════════ WEBSITE BUILDER ═══════════════════════════════════
// revenue-booking: a property website assembling itself from blocks, then
// proving it is responsive.

function WebsiteBuilderScene() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: 9, repeat, repeatDelay: 1.2, times, ease: 'easeOut' })

  const block = (x, y, w, h, delay) => ({
    initial: { opacity: 0, y: -14 },
    animate: { opacity: [0, 1, 1, 0], y: [-14, 0, 0, 0] },
    transition: { duration: 9, repeat, repeatDelay: 1.2, times: [0, delay, delay + 0.07, 1] },
  })

  return (
    <div className={`${frame} aspect-video`} role="img" aria-label="Website builder. A property website assembles itself from blocks">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        {/* template rail */}
        <rect x={0} y={0} width={120} height={360} fill="#F9FAFB" />
        <line x1={120} y1={0} x2={120} y2={360} stroke={LINE} />
        <text x={20} y={34} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>TEMPLATES</text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(16 ${52 + i * 74})`}>
            <rect width={88} height={60} rx={8} fill="#fff" stroke={i === 1 ? BRAND : LINE} strokeWidth={i === 1 ? 1.5 : 1} />
            <rect x={8} y={8} width={72} height={18} rx={3} fill={i === 1 ? BRAND : LINE} opacity={i === 1 ? 0.85 : 0.5} />
            <rect x={8} y={32} width={32} height={12} rx={2} fill={LINE} opacity={0.7} />
            <rect x={46} y={32} width={32} height={12} rx={2} fill={LINE} opacity={0.4} />
          </g>
        ))}
        <motion.rect x={104} y={126} width={6} height={14} rx={3} fill={BRAND}
          animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat }} />

        {/* canvas */}
        <rect x={140} y={24} width={476} height={312} rx={12} fill="#fff" stroke={LINE} />
        {/* hero block */}
        <motion.g {...block(0, 0, 0, 0, 0.06)}>
          <rect x={156} y={40} width={444} height={104} rx={8} fill="#EDEAFB" />
          <rect x={172} y={76} width={220} height={12} rx={6} fill={BRAND} opacity={0.85} />
          <rect x={172} y={96} width={160} height={8} rx={4} fill={BRAND} opacity={0.4} />
          <rect x={172} y={116} width={86} height={18} rx={9} fill={INK} />
          <text x={215} y={128.5} fontSize={8.5} fill="#fff" fontWeight={600} textAnchor="middle">Book direct</text>
        </motion.g>
        {/* rooms row */}
        {[0, 1, 2].map((i) => (
          <motion.g key={i} {...block(0, 0, 0, 0, 0.2 + i * 0.05)}>
            <rect x={156 + i * 152} y={156} width={140} height={84} rx={8} fill="#fff" stroke={LINE} />
            <rect x={164 + i * 152} y={164} width={124} height={40} rx={6} fill="#F1F2FF" />
            <rect x={164 + i * 152} y={212} width={70} height={8} rx={4} fill={INK} opacity={0.75} />
            <rect x={164 + i * 152} y={226} width={44} height={7} rx={3.5} fill={LINE} />
          </motion.g>
        ))}
        {/* amenities + gallery strip */}
        <motion.g {...block(0, 0, 0, 0, 0.38)}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${156 + i * 46} 252)`}>
              <circle cx={14} cy={14} r={13} fill={BRAND} opacity={0.1} />
              <circle cx={14} cy={14} r={4.5} fill={BRAND} opacity={0.55} />
            </g>
          ))}
          <rect x={404} y={252} width={196} height={34} rx={8} fill="#F9FAFB" stroke={LINE} />
          <rect x={412} y={260} width={52} height={18} rx={4} fill={LINE} opacity={0.6} />
          <rect x={470} y={260} width={52} height={18} rx={4} fill={LINE} opacity={0.45} />
          <rect x={528} y={260} width={52} height={18} rx={4} fill={LINE} opacity={0.3} />
        </motion.g>
        {/* booking bar */}
        <motion.g {...block(0, 0, 0, 0, 0.5)}>
          <rect x={156} y={298} width={444} height={26} rx={13} fill={BRAND} />
          <text x={378} y={315} fontSize={10} fill="#fff" fontWeight={600} textAnchor="middle">Check availability · book direct, zero commission</text>
        </motion.g>

        {/* responsive proof: phone slides over, same blocks stacked */}
        <motion.g
          animate={{ opacity: [0, 0, 1, 1, 0], x: [30, 30, 0, 0, 10] }}
          transition={tr([0, 0.6, 0.68, 0.9, 0.97])}
        >
          <rect x={500} y={120} width={104} height={210} rx={16} fill="#fff" stroke={INK} strokeOpacity={0.7} strokeWidth={1.5} />
          <rect x={540} y={128} width={24} height={3.5} rx={1.75} fill={LINE} />
          <rect x={510} y={140} width={84} height={40} rx={5} fill="#EDEAFB" />
          <rect x={516} y={150} width={46} height={6} rx={3} fill={BRAND} opacity={0.85} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={510} y={188 + i * 30} width={84} height={24} rx={5} fill="#fff" stroke={LINE} />
          ))}
          <rect x={510} y={284} width={84} height={20} rx={10} fill={BRAND} />
          <text x={552} y={297} fontSize={8} fill="#fff" fontWeight={600} textAnchor="middle">Book</text>
          <rect x={492} y={318} width={120} height={20} rx={10} fill={INK} />
          <text x={552} y={331.5} fontSize={8.5} fill="#fff" fontWeight={500} textAnchor="middle">Mobile-ready, automatically</text>
        </motion.g>
      </svg>
    </div>
  )
}

// ════════════════════════ RATE PLANS ════════════════════════════════════════
// revenue-booking: one calendar, prices that think — weekend and occupancy
// pricing applying themselves.

function RatePlansScene() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: 7, repeat, repeatDelay: 1.2, times, ease: 'easeInOut' })

  // two weeks of rates; idx 5,6,12,13 are weekends
  const base = 4200
  const weekend = 5800
  const days = Array.from({ length: 14 }, (_, i) => ({
    d: 13 + i,
    we: [5, 6, 12, 13].includes(i),
  }))

  return (
    <div className={`${frame} aspect-video`} role="img" aria-label="Rate plans, weekend and occupancy pricing applying automatically">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        <text x={24} y={38} fontSize={14} fontWeight={600} fill={INK}>Rates · October</text>
        <text x={24} y={55} fontSize={10} fill={INK_MUTED}>Base ₹4,200 · weekend &amp; occupancy rules on</text>

        {/* weekend rule chip */}
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, -2] }} transition={tr([0, 0.18, 0.24, 0.86, 0.94])}>
          <rect x={424} y={24} width={192} height={24} rx={12} fill={BRAND} opacity={0.1} />
          <text x={520} y={40} fontSize={9.5} fontWeight={600} fill={BRAND} textAnchor="middle">Weekend rule applied · +38%</text>
        </motion.g>

        {days.map((day, i) => {
          const x = 24 + (i % 7) * 86
          const y = 80 + Math.floor(i / 7) * 108
          return (
            <g key={i}>
              <rect x={x} y={y} width={78} height={96} rx={10} fill="#fff" stroke={LINE} />
              <text x={x + 10} y={y + 20} fontSize={9} fill={INK_MUTED}>{day.we ? (i % 7 === 5 ? 'Sat' : 'Sun') : ''} {day.d}</text>
              <motion.text
                x={x + 10} y={y + 52} fontSize={14} fontWeight={700}
                animate={{
                  fill: day.we ? [INK, INK, BRAND, BRAND, INK] : [INK, INK],
                }}
                transition={tr(day.we ? [0, 0.2 + (i % 7) * 0.01, 0.3 + (i % 7) * 0.01, 0.88, 0.96] : [0, 1])}
              >
                ₹{(day.we ? weekend : base).toLocaleString('en-IN')}
              </motion.text>
              {day.we && (
                <motion.rect
                  x={x + 10} y={y + 66} width={52} height={16} rx={8} fill={BRAND}
                  animate={{ opacity: [0, 0, 0.12, 0.12, 0] }}
                  transition={tr([0, 0.22 + (i % 7) * 0.01, 0.3 + (i % 7) * 0.01, 0.88, 0.96])}
                />
              )}
              {day.we && (
                <motion.text
                  x={x + 36} y={y + 77.5} fontSize={8} fontWeight={600} fill={BRAND} textAnchor="middle"
                  animate={{ opacity: [0, 0, 1, 1, 0] }}
                  transition={tr([0, 0.22 + (i % 7) * 0.01, 0.3 + (i % 7) * 0.01, 0.88, 0.96])}
                >
                  weekend
                </motion.text>
              )}
            </g>
          )
        })}

        {/* occupancy bump on a high-demand weekday */}
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.5, 0.56, 0.86, 0.94])}>
          <rect x={24} y={306} width={240} height={24} rx={12} fill={SUCCESS} opacity={0.1} />
          <text x={144} y={322} fontSize={9.5} fontWeight={600} fill={SUCCESS} textAnchor="middle">Occupancy 80%+ · rates nudge up on their own</text>
        </motion.g>
      </svg>
    </div>
  )
}

// ════════════════════════ MOBILE FRONT DESK (PM PAGE) ═══════════════════════
// property-management / front-office: the staff app in your pocket — arrivals
// list, check-in sheet slides up, ID verifies, guest lands in-house.

function MobileFrontDeskScene() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const LOOP = 7.5
  const tr = (times) => ({ duration: LOOP, repeat, repeatDelay: 1.2, times, ease: 'easeInOut' })

  const ROWS = [
    { name: 'M. Khan', sub: 'Suite 201 · 3 nights', animated: true },
    { name: 'A. Sharma', sub: 'Deluxe 101 · 2 nights', chip: ['In-house', SUCCESS] },
    { name: 'R. Iyer', sub: 'Deluxe 102 · 1 night', chip: ['Due 4 PM', AMBER] },
  ]

  return (
    <div className={`${frame} aspect-video`} role="img" aria-label="Proppo mobile app, checking in a guest from the phone">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        <defs>
          <clipPath id="fdPhone"><rect x={56} y={14} width={200} height={332} rx={24} /></clipPath>
        </defs>

        {/* phone */}
        <rect x={56} y={14} width={200} height={332} rx={24} fill="#fff" stroke={LINE} />
        <rect x={56} y={14} width={200} height={332} rx={24} fill="none" stroke={LINE} />
        <rect x={128} y={24} width={56} height={5} rx={2.5} fill={LINE} />
        <g clipPath="url(#fdPhone)">
          <rect x={56} y={14} width={200} height={60} fill="#F9FAFB" />
          <text x={76} y={56} fontSize={14} fontWeight={700} fill={INK}>Arrivals</text>
          <text x={76} y={71} fontSize={9} fill={INK_MUTED}>Today · 6 expected</text>
          <circle cx={236} cy={50} r={9} fill={BRAND} opacity={0.12} />
          <motion.circle cx={238} cy={46} r={3} fill={BRAND}
            animate={reduce ? {} : { opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat }} />

          {/* guest rows */}
          {ROWS.map((r, i) => {
            const y = 92 + i * 52
            return (
              <g key={r.name}>
                <rect x={68} y={y} width={176} height={42} rx={10} fill="#fff" stroke={LINE} />
                <circle cx={85} cy={y + 21} r={10} fill={BRAND} opacity={0.12} />
                <text x={85} y={y + 24.5} fontSize={9} fontWeight={600} fill={BRAND} textAnchor="middle">{r.name[0]}</text>
                <text x={102} y={y + 18} fontSize={10.5} fontWeight={600} fill={INK}>{r.name}</text>
                <text x={102} y={y + 31} fontSize={8} fill={INK_MUTED}>{r.sub}</text>
                {r.chip && (
                  <g>
                    <rect x={196} y={y + 12} width={42} height={16} rx={8} fill={r.chip[1]} opacity={0.12} />
                    <text x={217} y={y + 23} fontSize={7.5} fontWeight={600} fill={r.chip[1]} textAnchor="middle">{r.chip[0]}</text>
                  </g>
                )}
                {r.animated && (
                  <>
                    <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.62, 0.66, 0.92, 0.98])}>
                      <rect x={200} y={y + 12} width={38} height={16} rx={8} fill={AMBER} opacity={0.12} />
                      <text x={219} y={y + 23} fontSize={7.5} fontWeight={600} fill={AMBER} textAnchor="middle">Due</text>
                    </motion.g>
                    <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.62, 0.68, 0.92, 0.98])}>
                      <rect x={192} y={y + 12} width={46} height={16} rx={8} fill={SUCCESS} opacity={0.12} />
                      <text x={215} y={y + 23} fontSize={7.5} fontWeight={600} fill={SUCCESS} textAnchor="middle">In-house</text>
                    </motion.g>
                  </>
                )}
              </g>
            )
          })}

          {/* check-in sheet */}
          <motion.g animate={{ y: [332, 332, 150, 150, 150, 332] }} transition={tr([0, 0.14, 0.26, 0.82, 0.9, 1])}>
            <rect x={56} y={14} width={200} height={226} rx={20} fill="#fff" stroke={LINE} />
            <rect x={146} y={24} width={20} height={3.5} rx={1.75} fill={LINE} />
            <text x={76} y={52} fontSize={12.5} fontWeight={700} fill={INK}>Check in</text>
            <text x={76} y={70} fontSize={10} fill={INK_SECONDARY}>M. Khan · Suite 201</text>
            {/* ID verified */}
            <rect x={72} y={84} width={168} height={26} rx={8} fill="#F9FAFB" />
            <text x={82} y={101} fontSize={9} fill={INK_SECONDARY}>Aadhaar ·····4832</text>
            <motion.path
              d="M220 97 l2.5 2.5 l4.5 -5" fill="none" stroke={SUCCESS} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
              animate={{ pathLength: [0, 0, 1, 1, 1] }} transition={tr([0, 0.34, 0.42, 0.9, 1])}
            />
            <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.4, 0.46, 0.88, 0.96])}>
              <text x={82} y={126} fontSize={8.5} fontWeight={600} fill={SUCCESS}>ID verified</text>
            </motion.g>
            {/* confirm button */}
            <motion.g
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={{ scale: [1, 1, 0.95, 1, 1] }}
              transition={tr([0, 0.5, 0.54, 0.58, 1])}
            >
              <rect x={72} y={140} width={168} height={34} rx={17} fill={SUCCESS} />
              <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.56, 0.6, 0.9, 0.98])}>
                <text x={156} y={161} fontSize={11} fontWeight={600} fill="#fff" textAnchor="middle">Confirm check-in</text>
              </motion.g>
              <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.58, 0.64, 0.88, 0.96])}>
                <path d="M136 157 l3 3 l5.5 -6.5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <text x={164} y={161} fontSize={11} fontWeight={600} fill="#fff" textAnchor="middle">Checked in</text>
              </motion.g>
            </motion.g>
          </motion.g>
        </g>

        {/* activity log */}
        <rect x={292} y={14} width={324} height={332} rx={14} fill="#fff" stroke={LINE} />
        <text x={312} y={46} fontSize={13} fontWeight={600} fill={INK}>Front desk log</text>
        <text x={312} y={62} fontSize={9.5} fill={INK_MUTED}>Everything, as it happens</text>
        {[
          ['10:41', 'M. Khan checked in → Suite 201', SUCCESS],
          ['10:41', 'Aadhaar verified · documents stored', BRAND],
          ['10:42', 'Folio #F-1182 opened', BLUE],
        ].map(([t, text, color], i) => (
          <motion.g
            key={text}
            animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 4] }}
            transition={tr([0, 0.64 + i * 0.05, 0.7 + i * 0.05, 0.9, 0.97])}
          >
            <rect x={308} y={84 + i * 44} width={292} height={36} rx={9} fill="#F9FAFB" />
            <circle cx={324} cy={102 + i * 44} r={3.5} fill={color} />
            <text x={336} y={106 + i * 44} fontSize={10} fill={INK}>{text}</text>
            <text x={588} y={106 + i * 44} fontSize={8.5} fill={INK_MUTED} textAnchor="end">{t}</text>
          </motion.g>
        ))}
        {[
          ['09:58', 'Invoice #INV-883 · paid · ₹12,400'],
          ['09:41', 'A. Sharma checked in → 101'],
        ].map(([t, text], i) => (
          <g key={text} opacity={0.5}>
            <rect x={308} y={222 + i * 44} width={292} height={36} rx={9} fill="#F9FAFB" />
            <circle cx={324} cy={240 + i * 44} r={3.5} fill={INK_MUTED} />
            <text x={336} y={244 + i * 44} fontSize={10} fill={INK_SECONDARY}>{text}</text>
            <text x={588} y={244 + i * 44} fontSize={8.5} fill={INK_MUTED} textAnchor="end">{t}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ════════════════════════ AVAILABILITY BOARD (PM PAGE) ══════════════════════
// property-management / availability: live grid — a maintenance block lands on
// room 203 and tonight's open count adjusts.

function AvailabilityScene() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const tr = (times) => ({ duration: 7, repeat, repeatDelay: 1.2, times, ease: 'easeInOut' })

  const ROOMS = [['101', 'Deluxe'], ['102', 'Deluxe'], ['201', 'Suite'], ['203', 'Suite'], ['C1', 'Cottage']]
  const BOOKED = { 0: [1, 2], 1: [4], 2: [0, 1], 4: [5, 6] }
  const BLOCK_ROW = 3, BLOCK_COLS = [2, 3, 4]
  const GX = 120, GY = 88, CW = 66, CH = 34, GAP = 5

  return (
    <div className={`${frame} aspect-video`} role="img" aria-label="Live availability grid. Room 203 is blocked for maintenance">
      <svg viewBox="0 0 640 360" className="block w-full h-full" fontFamily="inherit">
        <defs>
          <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#FBF3E4" />
            <line x1="0" y1="0" x2="0" y2="6" stroke={AMBER} strokeWidth={1.1} />
          </pattern>
        </defs>

        <text x={24} y={38} fontSize={14} fontWeight={600} fill={INK}>Availability · Oct 13–19</text>
        <rect x={466} y={20} width={150} height={26} rx={13} fill="#F9FAFB" stroke={LINE} />
        <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr([0, 0.24, 0.28, 0.9, 0.96])}>
          <text x={541} y={37} fontSize={10} fontWeight={500} fill={INK_SECONDARY} textAnchor="middle">Open tonight: <tspan fontWeight={700} fill={INK}>18</tspan></text>
        </motion.g>
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr([0, 0.24, 0.3, 0.9, 0.96])}>
          <text x={541} y={37} fontSize={10} fontWeight={500} fill={INK_SECONDARY} textAnchor="middle">Open tonight: <tspan fontWeight={700} fill={AMBER}>17</tspan></text>
        </motion.g>

        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <text key={i} x={GX + i * (CW + GAP) + CW / 2} y={GY - 10} fontSize={9} fill={INK_MUTED} textAnchor="middle">{d}</text>
        ))}
        {ROOMS.map(([num, type], r) => (
          <g key={num}>
            <text x={24} y={GY + r * (CH + GAP) + 15} fontSize={11} fontWeight={600} fill={INK}>{num}</text>
            <text x={24} y={GY + r * (CH + GAP) + 27} fontSize={8} fill={INK_MUTED}>{type}</text>
            {Array.from({ length: 7 }, (_, c) => {
              const x = GX + c * (CW + GAP), y = GY + r * (CH + GAP)
              const booked = (BOOKED[r] ?? []).includes(c)
              return (
                <g key={c}>
                  <rect x={x} y={y} width={CW} height={CH} rx={6}
                    fill={booked ? BRAND : '#EDF7F1'} stroke={booked ? 'none' : LINE} strokeOpacity={0.6} />
                  {r === BLOCK_ROW && BLOCK_COLS.includes(c) && (
                    <motion.rect
                      x={x} y={y} width={CW} height={CH} rx={6} fill="url(#hatch)" stroke={AMBER} strokeOpacity={0.5}
                      animate={{ opacity: [0, 0, 1, 1, 0] }}
                      transition={tr([0, 0.16 + (c - 2) * 0.03, 0.24 + (c - 2) * 0.03, 0.88, 0.94])}
                    />
                  )}
                </g>
              )
            })}
          </g>
        ))}

        {/* maintenance label */}
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, 2] }} transition={tr([0, 0.28, 0.34, 0.88, 0.94])}>
          <rect x={GX + 2 * (CW + GAP)} y={GY + 3 * (CH + GAP) - 26} width={150} height={20} rx={10} fill={AMBER} />
          <text x={GX + 2 * (CW + GAP) + 75} y={GY + 3 * (CH + GAP) - 12.5} fontSize={9} fontWeight={600} fill="#fff" textAnchor="middle">Maintenance block · 3 nights</text>
        </motion.g>

        {/* legend */}
        {[['Available', '#EDF7F1'], ['Booked', BRAND], ['Blocked', 'url(#hatch)']].map(([label, fill], i) => (
          <g key={label} transform={`translate(${120 + i * 110} 318)`}>
            <rect x={0} y={0} width={12} height={12} rx={3} fill={fill} stroke={LINE} />
            <text x={18} y={10.5} fontSize={9} fill={INK_MUTED}>{label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ════════════════════════ ALERTS PHONE (HOMEPAGE) ═══════════════════════════
// WhyChooseProppo: the staff app's real-time alerts — bookings, check-ins,
// KOTs and payouts landing as they happen.

const ALERTS = [
  { Icon: CalendarDays, color: BRAND, title: 'New booking', text: 'Airbnb · 14–16 Nov · ₹6,400' },
  { Icon: KeyRound, color: SUCCESS, title: 'Guest checked in', text: 'M. Khan → Suite 201' },
  { Icon: ChefHat, color: RED, title: 'New KOT #143', text: 'Table 5 · 2× Masala Dosa' },
  { Icon: IndianRupee, color: AMBER, title: 'Payment received', text: '₹6,400 · Airbnb payout' },
]

function AlertsPhoneScene() {
  const reduce = useReducedMotion()
  const [feed, setFeed] = useState([{ uid: 0, a: 0 }, { uid: 1, a: 1 }, { uid: 2, a: 2 }])

  useEffect(() => {
    if (reduce) return
    let n = 3
    const t = setInterval(() => {
      setFeed((f) => [{ uid: n, a: n++ % ALERTS.length }, ...f].slice(0, 3))
    }, 2400)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <div
      className="aspect-[3/4] w-full rounded-[1.8rem] border border-line bg-white shadow-xl overflow-hidden flex flex-col"
      role="img" aria-label="Proppo mobile app, real-time alerts for bookings, check-ins, kitchen orders and payments"
    >
      {/* status + app bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="text-[9px] font-semibold text-ink">9:41</span>
        <span className="flex gap-1">
          <span className="h-1 w-1 rounded-full bg-ink-muted" />
          <span className="h-1 w-1 rounded-full bg-ink-muted" />
          <span className="h-1 w-1 rounded-full bg-ink-muted" />
        </span>
      </div>
      <div className="flex items-center justify-between px-4 pb-2 border-b border-line">
        <p className="text-[11px] font-bold text-ink">proppo</p>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary" />
        </span>
      </div>

      {/* notification feed */}
      <div className="flex-1 p-2.5 space-y-2 overflow-hidden" style={{ background: '#F4F2F7' }}>
        <AnimatePresence initial={false} mode="popLayout">
          {feed.map(({ uid, a: alertIdx }) => {
            const a = ALERTS[alertIdx]
            return (
              <motion.div
                key={uid}
                layout
                initial={{ opacity: 0, y: -26, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="bg-white rounded-xl px-2.5 py-2 shadow-sm flex items-center gap-2.5"
              >
                <span className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${a.color}1A` }}>
                  <a.Icon size={13} style={{ color: a.color }} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[10px] font-semibold text-ink leading-tight">{a.title}</span>
                  <span className="block text-[8.5px] text-ink-muted truncate">{a.text}</span>
                </span>
                <span className="text-[7.5px] text-ink-muted shrink-0">now</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* tab bar */}
      <div className="flex items-center justify-around border-t border-line py-2">
        {[
          { Icon: Home, active: true }, { Icon: CalendarDays, active: false },
          { Icon: PlusCircle, active: false }, { Icon: ChefHat, active: false },
        ].map(({ Icon, active }, i) => (
          <Icon key={i} size={14} className={active ? 'text-brand-primary' : 'text-ink-muted/50'} />
        ))}
      </div>
    </div>
  )
}

// ════════════════════════ WIDE SOLUTION HEROES ══════════════════════════════
// 21:9 product scenes for the solutions pages — the teaser card's story, told
// at full width. (Replaces the earlier decorative night-art heroes.)

const W_CHECK = [0, 0.1, 0.15, 0.9, 0.96]
const W_CLEAN = [0, 0.3, 0.34, 0.62, 0.66, 0.94, 1]

function HotelsOpsWide() {
  const reduce = useReducedMotion()
  const repeat = reduce ? 0 : Infinity
  const LOOP = 7
  const tr = (times) => ({ duration: LOOP, repeat, repeatDelay: 1.4, times, ease: 'easeOut' })

  return (
    <div className={`${frame} aspect-[21/9] border-0`} role="img" aria-label="Front desk for a full-service hotel, arrivals, room status and the day at a glance">
      <svg viewBox="0 0 840 360" className="block w-full h-full" fontFamily="inherit">
        <text x={28} y={40} fontSize={15} fontWeight={600} fill={INK}>Front desk</text>
        <text x={28} y={57} fontSize={10.5} fill={INK_SECONDARY}>Friday, 15 November · Cedar Resort</text>
        <motion.circle cx={812} cy={36} r={4} fill={SUCCESS}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduce ? {} : { scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat, ease: 'easeOut' }} />
        <circle cx={812} cy={36} r={3.5} fill={SUCCESS} />

        {/* arrivals */}
        <rect x={24} y={72} width={252} height={264} rx={10} fill="#fff" stroke={LINE} />
        <text x={40} y={96} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>ARRIVALS · 6</text>
        {[
          ['A. Sharma', 'Deluxe 101 · 2 nights', true],
          ['M. Khan', 'Suite 201 · 3 nights', false],
          ['R. Iyer', 'Deluxe 102 · 1 night', true],
          ['S. Patel', 'Cottage C1 · 4 nights', false],
        ].map(([name, sub, done], i) => {
          const y = 108 + i * 56
          const animated = i === 1
          return (
            <g key={name}>
              {animated && (
                <motion.rect x={32} y={y - 5} width={232} height={48} rx={8} fill={SUCCESS}
                  animate={{ opacity: [0, 0, 0.08, 0.08, 0] }} transition={tr(W_CHECK)} />
              )}
              <circle cx={50} cy={y + 19} r={11} fill={BRAND} opacity={0.1} />
              <text x={50} y={y + 22.5} fontSize={9} fontWeight={600} fill={BRAND} textAnchor="middle">{name[0]}</text>
              <text x={68} y={y + 16} fontSize={11.5} fontWeight={500} fill={INK}>{name}</text>
              <text x={68} y={y + 31} fontSize={9} fill={INK_MUTED}>{sub}</text>
              {done && !animated && (
                <g>
                  <rect x={190} y={y + 8} width={72} height={20} rx={10} fill={SUCCESS} opacity={0.12} />
                  <text x={226} y={y + 21.5} fontSize={8.5} fontWeight={600} fill={SUCCESS} textAnchor="middle">Checked in</text>
                </g>
              )}
              {animated && (
                <>
                  <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr(W_CHECK)}>
                    <rect x={206} y={y + 8} width={56} height={20} rx={10} fill={AMBER} opacity={0.12} />
                    <text x={234} y={y + 21.5} fontSize={8.5} fontWeight={600} fill={AMBER} textAnchor="middle">Due 2 PM</text>
                  </motion.g>
                  <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr(W_CHECK)}>
                    <rect x={190} y={y + 8} width={72} height={20} rx={10} fill={SUCCESS} opacity={0.12} />
                    <motion.path d="M197 18 l2.5 2.5 l4.5 -5" transform={`translate(0 ${y})`} fill="none" stroke={SUCCESS} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
                      animate={{ pathLength: [0, 0, 1, 1, 1] }} transition={tr([0, 0.12, 0.2, 0.95, 1])} />
                    <text x={230} y={y + 21.5} fontSize={8.5} fontWeight={600} fill={SUCCESS} textAnchor="middle">Checked in</text>
                  </motion.g>
                </>
              )}
            </g>
          )
        })}

        {/* rooms board */}
        <rect x={292} y={72} width={316} height={264} rx={10} fill="#fff" stroke={LINE} />
        <text x={308} y={96} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>ROOMS · LIVE STATUS</text>
        {[
          ['101', 'ready'], ['102', 'ready'], ['103', 'occupied'],
          ['201', 'ready'], ['204', 'animated'], ['202', 'occupied'],
          ['301', 'occupied'], ['302', 'ready'], ['C1', 'ready'],
        ].map(([num, state], i) => {
          const cx = 308 + (i % 3) * 96
          const cy = 108 + Math.floor(i / 3) * 70
          if (state !== 'animated') {
            const occ = state === 'occupied'
            return (
              <g key={num}>
                <rect x={cx} y={cy} width={86} height={60} rx={8} fill={occ ? BRAND : '#F4F2EC'} stroke={occ ? 'none' : LINE} />
                <text x={cx + 12} y={cy + 26} fontSize={12} fontWeight={600} fill={occ ? '#fff' : INK}>{num}</text>
                <text x={cx + 12} y={cy + 43} fontSize={8.5} fill={occ ? '#fff' : INK_MUTED} opacity={occ ? 0.8 : 1}>{occ ? 'Occupied' : 'Ready'}</text>
              </g>
            )
          }
          return (
            <g key={num}>
              <motion.rect x={cx} y={cy} width={86} height={60} rx={8}
                animate={{ fill: [BRAND, BRAND, '#FBF3E4', '#FBF3E4', '#EDF7F1', '#EDF7F1', BRAND] }}
                transition={tr(W_CLEAN)} />
              <motion.text x={cx + 12} y={cy + 26} fontSize={12} fontWeight={600}
                animate={{ fill: ['#fff', '#fff', AMBER, AMBER, SUCCESS, SUCCESS, '#fff'] }}
                transition={tr(W_CLEAN)}>204</motion.text>
              <motion.text x={cx + 12} y={cy + 43} fontSize={8.5} fill="#fff" opacity={0.85}
                animate={{ opacity: [0.85, 0.85, 0, 0, 0, 0, 0.85] }} transition={tr(W_CLEAN)}>Occupied</motion.text>
              <motion.text x={cx + 12} y={cy + 43} fontSize={8.5} fontWeight={600} fill={AMBER}
                animate={{ opacity: [0, 0, 1, 1, 0, 0, 0] }} transition={tr(W_CLEAN)}>Cleaning</motion.text>
              <motion.g animate={{ opacity: [0, 0, 0, 0, 1, 1, 0] }} transition={tr(W_CLEAN)}>
                <text x={cx + 12} y={cy + 43} fontSize={8.5} fontWeight={600} fill={SUCCESS}>Ready</text>
                <motion.path d={`M${cx + 44} ${cy + 40} l2.5 2.5 l4 -4.5`} fill="none" stroke={SUCCESS} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
                  animate={{ pathLength: [0, 0, 0, 0, 1, 1, 1] }} transition={tr([0, 0.62, 0.64, 0.66, 0.74, 0.94, 1])} />
              </motion.g>
            </g>
          )
        })}

        {/* day at a glance */}
        <rect x={624} y={72} width={192} height={264} rx={10} fill="#fff" stroke={LINE} />
        <text x={640} y={96} fontSize={9.5} fontWeight={600} fill={INK_MUTED} letterSpacing={1.2}>TODAY</text>
        <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={tr(W_CHECK)}>
          <text x={640} y={146} fontSize={26} fontWeight={600} fill={INK}>3<tspan fontSize={13} fill={INK_MUTED} fontWeight={500}>/6</tspan></text>
        </motion.g>
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={tr(W_CHECK)}>
          <text x={640} y={146} fontSize={26} fontWeight={600} fill={SUCCESS}>4<tspan fontSize={13} fill={INK_MUTED} fontWeight={500}>/6</tspan></text>
        </motion.g>
        <text x={640} y={164} fontSize={9} fill={INK_MUTED}>arrivals done</text>
        <line x1={640} y1={184} x2={800} y2={184} stroke={LINE} />
        <text x={640} y={222} fontSize={26} fontWeight={600} fill={INK}>5</text>
        <text x={640} y={240} fontSize={9} fill={INK_MUTED}>departures</text>
        <line x1={640} y1={260} x2={800} y2={260} stroke={LINE} />
        <text x={640} y={298} fontSize={26} fontWeight={600} fill={INK}>21<tspan fontSize={13} fill={INK_MUTED} fontWeight={500}>/24</tspan></text>
        <text x={640} y={316} fontSize={9} fill={INK_MUTED}>rooms ready</text>
      </svg>
    </div>
  )
}

function VillasWide() {
  const reduce = useReducedMotion()
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setBooked((b) => !b), 5200)
    return () => clearInterval(t)
  }, [reduce])

  const CHANNELS = [
    { logo: '/icons/ota/airbnb.png', name: 'Airbnb' },
    { logo: '/icons/ota/booking-com.png', name: 'Booking.com' },
    { logo: null, name: 'Your website' },
  ]

  return (
    <div className={`${frame} aspect-[21/9] border-0 flex`} role="img" aria-label="Virtual inventory. Book a room and every channel relists the villa automatically">
      {/* inventory side */}
      <div className="w-[44%] border-r border-line p-3 flex flex-col">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-ink-muted pb-1">One inventory</p>
        <VillaCards booked={booked} />
      </div>
      {/* channels side */}
      <div className="flex-1 p-3 flex flex-col">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-ink-muted pb-2">Live on every channel</p>
        <div className="flex-1 flex flex-col justify-center gap-2">
          {CHANNELS.map((ch) => (
            <div key={ch.name} className="flex items-center gap-3 bg-white border border-line rounded-lg px-3 py-2">
              <span className="w-14 h-5 relative shrink-0 flex items-center justify-center">
                {ch.logo
                  ? <Image src={ch.logo} alt={ch.name} fill sizes="56px" className="object-contain" />
                  : <Globe size={14} className="text-brand-primary" />}
              </span>
              <span className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={booked ? 'b' : 'a'}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="block text-[10.5px] font-medium text-ink truncate"
                  >
                    {booked ? 'Rooms 2 + 3 · available' : 'Entire Villa · available'}
                  </motion.span>
                </AnimatePresence>
              </span>
              <motion.span
                key={`c-${booked}`}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="h-4 w-4 rounded-full bg-semantic-success/15 flex items-center justify-center shrink-0"
              >
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4.2 l1.8 1.8 l3.2 -3.8" fill="none" stroke={SUCCESS} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-ink-muted pt-2">Never sold twice, no manual edits, no 2 AM panic.</p>
      </div>
    </div>
  )
}

function HomestaysWide() {
  const reduce = useReducedMotion()
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setCycle((c) => c + 1), 9500)
    return () => clearInterval(t)
  }, [reduce])

  const LOG = [
    { t: '10:42', c: SUCCESS, text: 'Booking confirmed · WhatsApp sent to guest', d: 1.2 },
    { t: '10:42', c: BRAND, text: 'Check-in link shared automatically', d: 2.1 },
    { t: '10:43', c: AMBER, text: 'Reminder scheduled · tomorrow, 1 PM', d: 3.0 },
    { t: '10:44', c: BLUE, text: 'Guest replied. “See you Saturday!”', d: 3.9 },
  ]

  return (
    <div className={`${frame} aspect-[21/9] border-0 flex`} role="img" aria-label="Guest messaging on autopilot, every step logged">
      <div className="w-[42%] border-r border-line">
        <GuestChatScene />
      </div>
      <div className="flex-1 p-3 flex flex-col">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-ink-muted pb-2">Automation log · typed by no one</p>
        <div className="flex-1 flex flex-col justify-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div key={cycle} className="flex flex-col gap-2" exit={{ opacity: 0, transition: { duration: 0.4 } }}>
              {LOG.map((e) => (
                <motion.div
                  key={e.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: e.d, duration: 0.4, ease: 'easeOut' }}
                  className="flex items-center gap-2.5 bg-white border border-line rounded-lg px-3 py-2"
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: e.c }} />
                  <span className="flex-1 text-[10.5px] text-ink">{e.text}</span>
                  <span className="text-[8.5px] text-ink-muted shrink-0">{e.t}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="text-[9px] text-ink-muted pt-2">Zero typing. The host just… hosts.</p>
      </div>
    </div>
  )
}

export {
  DragDropScene, SyncScene, OtaConnectScene, GuidebookScene,
  QrMenuScene, KitchenBoardScene, MultiDeptScene,
  MobileFrontDeskScene, AvailabilityScene, AlertsPhoneScene,
  HotelsOpsWide, VillasWide, HomestaysWide,
  BookingEngineScene, WebsiteBuilderScene, RatePlansScene,
}

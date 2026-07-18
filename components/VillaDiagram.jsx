'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BedDouble, RotateCcw } from 'lucide-react'

// Interactive worked example for Virtual Inventory (spec Section 6.2):
// a 3-bedroom villa listed as "Entire Villa" + Room 1/2/3 — booking Room 1
// automatically relists "Entire Villa" as "Rooms 2 + 3". No overlap possible.
export default function VillaDiagram() {
  const [booked, setBooked] = useState(false)

  const listings = booked
    ? [
        { name: 'Rooms 2 + 3', note: 'auto-updated from Entire Villa', state: 'combo' },
        { name: 'Room 1', note: 'just booked', state: 'booked' },
        { name: 'Room 2', note: 'available', state: 'open' },
        { name: 'Room 3', note: 'available', state: 'open' },
      ]
    : [
        { name: 'Entire Villa', note: 'available', state: 'open' },
        { name: 'Room 1', note: 'available', state: 'open' },
        { name: 'Room 2', note: 'available', state: 'open' },
        { name: 'Room 3', note: 'available', state: 'open' },
      ]

  return (
    <div className="bg-surface-card border border-line rounded-2xl shadow-xl overflow-hidden">
      {/* inventory source */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-surface-bg-alt">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <BedDouble size={16} className="text-brand-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink leading-tight">Cedar Villa</p>
            <p className="text-[11px] text-ink-muted">1 property · 3 rooms · linked inventory</p>
          </div>
        </div>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-semantic-success" />
        </span>
      </div>

      {/* live listings */}
      <div className="p-5 grid grid-cols-2 gap-2.5">
        <AnimatePresence mode="popLayout">
          {listings.map((listing) => (
            <motion.div
              key={listing.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`rounded-xl border px-3 py-3 ${
                listing.state === 'booked'
                  ? 'border-line bg-surface-bg-alt opacity-60'
                  : listing.state === 'combo'
                    ? 'border-brand-accent/50 bg-brand-accent/10'
                    : 'border-line bg-surface-card'
              }`}
            >
              <p className={`text-sm font-semibold ${listing.state === 'booked' ? 'line-through text-ink-muted' : 'text-ink'}`}>
                {listing.name}
              </p>
              <p className={`text-[11px] mt-0.5 ${
                listing.state === 'combo' ? 'text-brand-accent font-medium' : listing.state === 'booked' ? 'text-ink-muted' : 'text-semantic-success'
              }`}>
                {listing.note}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* narration + control */}
      <div className="px-5 pb-5">
        <p className="text-xs text-ink-secondary leading-relaxed min-h-[2.5em]">
          {booked
            ? 'Room 1 booked. "Entire Villa" automatically became "Rooms 2 + 3". Every channel updates. No overlap, no manual edits.'
            : 'All four listings sell from the same linked inventory. Try booking Room 1:'}
        </p>
        <button
          type="button"
          onClick={() => setBooked(!booked)}
          className={`btn mt-3 w-full text-sm font-medium rounded-pill px-4 py-2.5 flex items-center justify-center gap-2 ${
            booked ? 'btn_v2_sec' : 'btn_v2_pri'
          }`}
        >
          {booked ? <><RotateCcw size={14} /> Reset the example</> : 'Simulate a booking on Room 1'}
        </button>
      </div>
    </div>
  )
}

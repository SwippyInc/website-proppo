import { ImageIcon } from "lucide-react"

// Neutral stand-in for a real asset (spec's own placeholder convention: solid brand block + label, not stock photography).
// Dropped into a framed "product shot" context by parents; itself stays a quiet branded panel.
export default function MediaPlaceholder({ label, path, aspect = "aspect-video", className = "" }) {
  return (
    <div
      className={`${aspect} w-full rounded-xl bg-brand-primary text-ink-inverse relative flex flex-col items-center justify-center gap-3 p-6 text-center overflow-hidden ${className}`}
    >
      {/* subtle diagonal sheen so the solid block reads as intentional, not empty */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 10px)' }}
      />
      <div className="h-11 w-11 rounded-full border border-white/25 bg-white/10 flex items-center justify-center">
        <ImageIcon size={18} className="opacity-80" />
      </div>
      {label && <p className="text-xs md:text-sm font-medium tracking-wide opacity-90 max-w-[85%]">{label}</p>}
      {path && <p className="text-[10px] opacity-50 font-mono break-all max-w-[90%]">{path}</p>}
    </div>
  )
}

export function VerifyTag({ children }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-semantic-warning bg-semantic-warning/10 rounded-pill px-2 py-0.5 align-middle ml-1">
      [VERIFY]{children ? `: ${children}` : ""}
    </span>
  )
}

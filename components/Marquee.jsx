// Infinite logo/name strip — CSS animation (.marquee_track in globals.css), pauses on hover.
export default function Marquee({ items, className = '' }) {
  const row = [...items, ...items] // duplicated so the -50% loop is seamless
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee_track flex items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-sm md:text-base font-medium text-ink-muted whitespace-nowrap">{item}</span>
            <span className="mx-6 h-1.5 w-1.5 rounded-full bg-brand-accent/60 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

// Framed "product shot" chrome — wraps a MediaPlaceholder (or any visual) so it reads as a live app window.
export default function BrowserFrame({ url = 'pms.proppo.in', children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface-card shadow-2xl overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-surface-bg-alt">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 flex-1 max-w-[240px] text-[10px] font-mono text-ink-muted bg-surface-card border border-line rounded-pill px-3 py-0.5 truncate">{url}</span>
      </div>
      <div className="p-2">{children}</div>
    </div>
  )
}

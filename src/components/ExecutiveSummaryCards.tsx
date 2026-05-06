type ExecutiveSummaryCardsProps = {
  readinessPercent: number
  atRiskWorkstreams: number
  blockedDependenciesCount: number
  goLiveStatus: string
  openRisks: number
}

function Card({
  label,
  value,
  sub,
  accentClass,
  valueClassName = 'text-4xl font-semibold tabular-nums',
}: {
  label: string
  value: string | number
  sub?: string
  /** Tailwind border-top accent (e.g. border-t-blue-500) */
  accentClass: string
  valueClassName?: string
}) {
  return (
    <div
      className={`rounded-lg border border-slate-200 border-t-4 bg-white/80 p-4 shadow-sm transition-shadow hover:shadow-sm ${accentClass}`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-600">{label}</p>
      <p className={`mt-2 text-slate-900 ${valueClassName}`}>{value}</p>
      {sub ? <p className="mt-1 text-xs text-slate-400">{sub}</p> : null}
    </div>
  )
}

export function ExecutiveSummaryCards({
  readinessPercent,
  atRiskWorkstreams,
  blockedDependenciesCount,
  goLiveStatus,
  openRisks,
}: ExecutiveSummaryCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Executive summary">
      <Card
        label="Overall readiness"
        value={`${readinessPercent}%`}
        sub="Weighted workstreams + checklist"
        accentClass="border-t-blue-500"
      />
      <Card
        label="At-risk workstreams"
        value={atRiskWorkstreams}
        accentClass="border-t-amber-500"
      />
      <Card
        label="Blocked dependencies"
        value={blockedDependenciesCount}
        sub="Unique deps on blocked workstreams"
        accentClass="border-t-orange-500"
      />
      <Card
        label="Go-live status"
        value={goLiveStatus}
        accentClass="border-t-yellow-400"
        valueClassName="text-xl font-semibold leading-snug"
      />
      <Card
        label="Open risks"
        value={openRisks}
        sub="Excludes mitigated"
        accentClass="border-t-red-500"
      />
    </section>
  )
}

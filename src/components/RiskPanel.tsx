import type { Risk } from '../types'

function SeverityBadge({ severity }: { severity: Risk['severity'] }) {
  const styles: Record<Risk['severity'], string> = {
    Low: 'bg-slate-100 text-slate-700 ring-slate-500/15',
    Medium: 'bg-amber-50 text-amber-900 ring-amber-600/25',
    High: 'bg-red-50 text-red-800 ring-red-600/20',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[severity]}`}
    >
      {severity}
    </span>
  )
}

function RiskStatusBadge({ status }: { status: Risk['status'] }) {
  const styles: Record<Risk['status'], string> = {
    Open: 'bg-red-50 text-red-800 ring-red-600/25',
    'In Progress': 'bg-sky-50 text-sky-900 ring-sky-600/25',
    Mitigated: 'bg-emerald-50 text-emerald-900 ring-emerald-600/20',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  )
}

type RiskPanelProps = {
  risks: Risk[]
}

export function RiskPanel({ risks }: RiskPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Risks</h2>
        <p className="text-xs text-slate-500">Severity, status, and mitigation</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {risks.map((r) => (
          <li key={r.id} className="px-5 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="flex-1 text-sm font-medium text-slate-900">{r.title}</p>
              <SeverityBadge severity={r.severity} />
              <RiskStatusBadge status={r.status} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">{r.mitigation}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

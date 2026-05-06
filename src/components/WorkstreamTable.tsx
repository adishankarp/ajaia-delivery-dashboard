import type { Workstream } from '../types'

function StatusBadge({ status }: { status: Workstream['status'] }) {
  const styles: Record<Workstream['status'], string> = {
    'On Track': 'bg-emerald-50 text-emerald-800 ring-emerald-600/20',
    'At Risk': 'bg-amber-50 text-amber-900 ring-amber-600/25',
    Blocked: 'bg-red-50 text-red-800 ring-red-600/20',
    Complete: 'bg-slate-100 text-slate-800 ring-slate-500/20',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function RiskBadge({ level }: { level: Workstream['riskLevel'] }) {
  const styles: Record<Workstream['riskLevel'], string> = {
    Low: 'bg-slate-100 text-slate-700 ring-slate-500/15',
    Medium: 'bg-amber-50 text-amber-900 ring-amber-600/25',
    High: 'bg-red-50 text-red-800 ring-red-600/20',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[level]}`}
    >
      {level}
    </span>
  )
}

type WorkstreamTableProps = {
  workstreams: Workstream[]
}

export function WorkstreamTable({ workstreams }: WorkstreamTableProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Workstreams</h2>
        <p className="text-xs text-slate-500">Status, risk, dependencies, and notes</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Risk</th>
              <th className="px-4 py-3">Dependencies</th>
              <th className="min-w-[280px] px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {workstreams.map((w) => (
              <tr key={w.id} className="align-top">
                <td className="px-4 py-3 font-medium text-slate-900">{w.name}</td>
                <td className="px-4 py-3 text-slate-700">{w.owner}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={w.status} />
                </td>
                <td className="px-4 py-3">
                  <RiskBadge level={w.riskLevel} />
                </td>
                <td className="max-w-[220px] px-4 py-3 text-slate-700">
                  {w.dependencies.length ? (
                    <span className="block truncate" title={w.dependencies.join(', ')}>
                      {w.dependencies.join(', ')}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="max-w-md px-4 py-3 text-slate-600">
                  <span className="line-clamp-3" title={w.notes}>
                    {w.notes}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

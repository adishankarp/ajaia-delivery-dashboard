import type { ChecklistItem } from '../types'

function ItemStatusBadge({ status }: { status: ChecklistItem['status'] }) {
  const styles: Record<ChecklistItem['status'], string> = {
    Complete: 'bg-emerald-50 text-emerald-900 ring-emerald-600/20',
    Incomplete: 'bg-amber-50 text-amber-900 ring-amber-600/25',
    Blocked: 'bg-red-50 text-red-800 ring-red-600/20',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  )
}

type ReadinessChecklistProps = {
  items: ChecklistItem[]
}

export function ReadinessChecklist({ items }: ReadinessChecklistProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Launch readiness checklist</h2>
        <p className="text-xs text-slate-500">Item, owner, status, and notes</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Status</th>
              <th className="min-w-[220px] px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((c) => (
              <tr key={c.id} className="align-top">
                <td className="px-4 py-3 font-medium text-slate-900">{c.item}</td>
                <td className="px-4 py-3 text-slate-700">{c.owner}</td>
                <td className="px-4 py-3">
                  <ItemStatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 text-slate-600">{c.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

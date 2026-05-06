import type { Milestone } from '../types'

type TimelineViewProps = {
  milestones: Milestone[]
}

export function TimelineView({ milestones }: TimelineViewProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Delivery checkpoints</h2>
        <p className="text-xs text-slate-500">Week, owner, target date, and status</p>
      </div>
      <ol className="px-4 py-4">
        {milestones.map((m, index) => {
          const isLast = index === milestones.length - 1
          return (
            <li key={m.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast ? (
                <span
                  className="absolute left-[7px] top-4 bottom-0 w-px bg-slate-200"
                  aria-hidden
                />
              ) : null}
              <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center pt-0.5">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-white ring-2 ring-slate-400"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {m.week}
                  </span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
                    {m.status}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-900">{m.title}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
                  <span>
                    <span className="text-slate-400">Owner:</span> {m.owner}
                  </span>
                  <span>
                    <span className="text-slate-400">Target:</span>{' '}
                    <time dateTime={m.targetDate}>{m.targetDate}</time>
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

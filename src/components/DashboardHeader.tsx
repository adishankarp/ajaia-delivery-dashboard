export function DashboardHeader() {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-6 shadow-sm transition-shadow hover:shadow-sm">
      <div className="mx-auto max-w-[90rem]">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
          Internal delivery operations
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Patient Acquisition & Growth Agent
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Launch readiness dashboard for hospital AI implementation — workstreams, risks,
          checkpoints, and checklist status in one view.
        </p>
      </div>
    </header>
  )
}

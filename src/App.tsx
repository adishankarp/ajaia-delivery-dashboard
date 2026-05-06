import { DashboardHeader } from './components/DashboardHeader'
import { ExecutiveSummaryCards } from './components/ExecutiveSummaryCards'
import { ReadinessChecklist } from './components/ReadinessChecklist'
import { RiskPanel } from './components/RiskPanel'
import { TimelineView } from './components/TimelineView'
import { WorkstreamTable } from './components/WorkstreamTable'
import { checklistItems, milestones, risks, workstreams } from './data/mockData'
import {
  computeGoLiveStatus,
  computeLaunchReadinessPercent,
  countAtRiskWorkstreams,
  getBlockedDependencies,
  openRiskCount,
} from './utils/readiness'

export default function App() {
  const readinessPercent = computeLaunchReadinessPercent(workstreams, checklistItems)
  const atRiskWs = countAtRiskWorkstreams(workstreams)
  const blockedDeps = getBlockedDependencies(workstreams)
  const goLiveStatus = computeGoLiveStatus(readinessPercent, milestones, checklistItems)
  const risksOpen = openRiskCount(risks)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader />
      <main className="mx-auto max-w-[90rem] space-y-8 px-4 py-8">
        <ExecutiveSummaryCards
          readinessPercent={readinessPercent}
          atRiskWorkstreams={atRiskWs}
          blockedDependenciesCount={blockedDeps.length}
          goLiveStatus={goLiveStatus}
          openRisks={risksOpen}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <WorkstreamTable workstreams={workstreams} />
          </div>
          <div className="space-y-8">
            <RiskPanel risks={risks} />
            <TimelineView milestones={milestones} />
          </div>
        </div>

        <ReadinessChecklist items={checklistItems} />
      </main>
    </div>
  )
}

import type { ChecklistItem, Milestone, Risk, Workstream } from '../types'

/** Weight for launch readiness workstream dimension */
export const WORKSTREAM_WEIGHT = 0.6
/** Weight for launch readiness checklist dimension */
export const CHECKLIST_WEIGHT = 0.4

function workstreamUnitScore(status: Workstream['status']): number {
  switch (status) {
    case 'Complete':
      return 1
    case 'On Track':
      return 0.85
    case 'At Risk':
      return 0.5
    case 'Blocked':
      return 0
  }
}

function checklistUnitScore(status: ChecklistItem['status']): number {
  switch (status) {
    case 'Complete':
      return 1
    case 'Incomplete':
      return 0.5
    case 'Blocked':
      return 0
  }
}

export function averageWorkstreamScore(workstreams: Workstream[]): number {
  if (workstreams.length === 0) return 0
  const sum = workstreams.reduce((acc, w) => acc + workstreamUnitScore(w.status), 0)
  return sum / workstreams.length
}

export function averageChecklistScore(items: ChecklistItem[]): number {
  if (items.length === 0) return 0
  const sum = items.reduce((acc, i) => acc + checklistUnitScore(i.status), 0)
  return sum / items.length
}

/** 0–100 launch readiness score */
export function computeLaunchReadinessPercent(
  workstreams: Workstream[],
  checklistItems: ChecklistItem[],
): number {
  const ws = averageWorkstreamScore(workstreams)
  const cl = averageChecklistScore(checklistItems)
  return Math.round(100 * (WORKSTREAM_WEIGHT * ws + CHECKLIST_WEIGHT * cl))
}

export function countAtRiskWorkstreams(workstreams: Workstream[]): number {
  return workstreams.filter((w) => w.status === 'At Risk').length
}

/**
 * Unique dependency labels from workstreams that are blocked — used for operational visibility.
 */
export function getBlockedDependencies(workstreams: Workstream[]): string[] {
  const set = new Set<string>()
  for (const w of workstreams) {
    if (w.status !== 'Blocked') continue
    for (const d of w.dependencies) set.add(d)
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}

export function openRiskCount(risks: Risk[]): number {
  return risks.filter((r) => r.status !== 'Mitigated').length
}

function formatTargetWindow(milestones: Milestone[]): string {
  const goLive = milestones.find((m) => /go-?live/i.test(m.title))
  const chosen = goLive ?? milestones[milestones.length - 1]
  if (!chosen) return 'window TBD'
  try {
    const d = new Date(chosen.targetDate)
    return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' })
  } catch {
    return chosen.targetDate
  }
}

export function computeGoLiveStatus(
  readinessPercent: number,
  milestones: Milestone[],
  checklistItems: ChecklistItem[],
): string {
  const windowLabel = formatTargetWindow(milestones)
  const hasBlockedChecklist = checklistItems.some((c) => c.status === 'Blocked')

  if (hasBlockedChecklist || readinessPercent < 55) {
    return `At Risk — ${windowLabel}`
  }
  if (readinessPercent < 75) {
    return `Conditional — ${windowLabel}`
  }
  return `On Track — ${windowLabel}`
}

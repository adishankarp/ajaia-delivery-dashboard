export type Workstream = {
  id: number
  name: string
  owner: string
  status: 'On Track' | 'At Risk' | 'Blocked' | 'Complete'
  riskLevel: 'Low' | 'Medium' | 'High'
  dependencies: string[]
  notes: string
}

export type Risk = {
  id: number
  title: string
  severity: 'Low' | 'Medium' | 'High'
  mitigation: string
  status: 'Open' | 'In Progress' | 'Mitigated'
}

export type Milestone = {
  id: number
  week: string
  title: string
  owner: string
  targetDate: string
  status: string
}

export type ChecklistItem = {
  id: number
  item: string
  owner: string
  status: 'Complete' | 'Incomplete' | 'Blocked'
  notes: string
}

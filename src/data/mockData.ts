import type { ChecklistItem, Milestone, Risk, Workstream } from '../types'

export const workstreams: Workstream[] = [
  {
    id: 1,
    name: 'Scheduling Integration',
    owner: 'Engineering',
    status: 'At Risk',
    riskLevel: 'High',
    dependencies: ['EHR API Access'],
    notes: 'Awaiting sandbox credentials',
  },
  {
    id: 2,
    name: 'EHR Read & Write Paths',
    owner: 'Engineering',
    status: 'On Track',
    riskLevel: 'Medium',
    dependencies: ['HL7 FHIR endpoints', 'Patient index reconciliation'],
    notes: 'Interfaces validated in lower environment',
  },
  {
    id: 3,
    name: 'Clinical Validation & Safety Review',
    owner: 'Clinical Ops',
    status: 'On Track',
    riskLevel: 'Low',
    dependencies: ['Use-case catalog', 'Escalation playbook'],
    notes: 'Physician champion sign-off scheduled next week',
  },
  {
    id: 4,
    name: 'PHI Governance & Audit Logging',
    owner: 'Compliance',
    status: 'Blocked',
    riskLevel: 'High',
    dependencies: ['BAAs executed', 'Audit trail retention policy'],
    notes: 'Blocked pending hospital legal review of subprocessors',
  },
  {
    id: 5,
    name: 'Patient Outreach Workflow Design',
    owner: 'Growth Ops',
    status: 'Complete',
    riskLevel: 'Low',
    dependencies: ['Campaign templates'],
    notes: 'Templates approved; ready for configuration',
  },
  {
    id: 6,
    name: 'Identity & Access (SSO / RBAC)',
    owner: 'IT Security',
    status: 'At Risk',
    riskLevel: 'Medium',
    dependencies: ['IdP metadata exchange'],
    notes: 'Certificate rotation window conflicts with freeze',
  },
]

export const risks: Risk[] = [
  {
    id: 1,
    title: 'Sandbox access delays compress integration testing',
    severity: 'High',
    mitigation: 'Daily stand-up with EHR vendor; temporary mock until credentials land',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Ambiguous ownership for outreach consent capture',
    severity: 'Medium',
    mitigation: 'Align Marketing + Compliance on opt-in copy and CRM routing',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Legacy scheduling adapter timeout under peak load',
    severity: 'Medium',
    mitigation: 'Add circuit breaker + queue replay; load test at 2× peak',
    status: 'Open',
  },
  {
    id: 4,
    title: 'Prior penetration test findings on sibling product',
    severity: 'Low',
    mitigation: 'Reuse remediation backlog items in scope for this agent',
    status: 'Mitigated',
  },
]

export const milestones: Milestone[] = [
  {
    id: 1,
    week: 'W18',
    title: 'Integration freeze & dry-run',
    owner: 'Engineering',
    targetDate: '2026-05-04',
    status: 'Complete',
  },
  {
    id: 2,
    week: 'W20',
    title: 'Clinical pilot cohort kickoff',
    owner: 'Clinical Ops',
    targetDate: '2026-05-18',
    status: 'In Progress',
  },
  {
    id: 3,
    week: 'W22',
    title: 'Go-live readiness gate',
    owner: 'Program Office',
    targetDate: '2026-06-01',
    status: 'Planned',
  },
  {
    id: 4,
    week: 'W24',
    title: 'Production go-live — Patient Acquisition & Growth Agent',
    owner: 'Program Office',
    targetDate: '2026-06-15',
    status: 'Planned',
  },
]

export const checklistItems: ChecklistItem[] = [
  {
    id: 1,
    item: 'System integration specifications signed off',
    owner: 'Engineering Lead',
    status: 'Complete',
    notes: 'Version 1.3 locked in SharePoint',
  },
  {
    id: 2,
    item: 'Hospital IRB / clinical governance approval',
    owner: 'Clinical Ops',
    status: 'Incomplete',
    notes: 'Deck submitted; awaiting committee slot',
  },
  {
    id: 3,
    item: 'Security assessment & penetration test summary',
    owner: 'IT Security',
    status: 'Incomplete',
    notes: 'External vendor report expected May 12',
  },
  {
    id: 4,
    item: 'Runbook for adverse events & agent rollback',
    owner: 'Compliance',
    status: 'Blocked',
    notes: 'Blocked until legal finishes subprocessors language',
  },
  {
    id: 5,
    item: 'Training materials for front desk & access coordinators',
    owner: 'Growth Ops',
    status: 'Incomplete',
    notes: 'Draft slides circulating',
  },
  {
    id: 6,
    item: 'Monitoring dashboards & paging thresholds',
    owner: 'Engineering',
    status: 'Complete',
    notes: 'Datadog monitors wired to staging',
  },
]

# AJAIA Delivery Dashboard

This repository is a **frontend prototype** for internal delivery operations around a hospital AI program titled **Patient Acquisition & Growth Agent**. It surfaces launch readiness at a glance (weighted scoring, checklist posture, blocked dependencies, and risk exposure) alongside operational detail in tables and panels. All content is **static mock data** in TypeScript; there is no server, persistence, or live hospital integration. It is intended for review and discussion—not as production infrastructure.

---

## Features

- **Executive summary metrics** — five cards: overall readiness percentage, at-risk workstreams count, blocked-dependencies count (unique labels from blocked workstreams), go-live status string, and open risks count (non-mitigated risk rows).
- **Workstream health tracking** — table of workstreams with owner, status badges (On Track / At Risk / Blocked / Complete), risk level badges (Low / Medium / High), dependency strings, and notes (line clamp with full text available via the native `title` tooltip on the notes cell).
- **Risk monitoring** — panel listing risks with severity and lifecycle status (Open / In Progress / Mitigated) plus mitigation text.
- **Delivery checkpoints timeline** — ordered milestones with week label, title, owner, ISO `targetDate`, milestone status, and a simple sequential connector (dot and vertical line between items).
- **Launch readiness checklist** — table of checklist rows with item text, owner, status (Complete / Incomplete / Blocked), and notes.
- **Readiness scoring** — derived overall readiness percentage from averaged workstream scores and averaged checklist scores with fixed weights (see below).
- **Dependency visibility** — workstream dependency column in the table; executive card counts **unique** dependency labels attached only to workstreams in **Blocked** status (`getBlockedDependencies` in `src/utils/readiness.ts`).
- **Mock-data driven operational dashboard** — single-page React UI composed in `App.tsx` from `src/data/mockData.ts` arrays only.

---

## Dashboard Metrics

| Metric | Meaning in this prototype |
|--------|-------------------------|
| **Overall Readiness %** | `computeLaunchReadinessPercent`: rounds **100 × (0.6 × average workstream unit score + 0.4 × average checklist unit score)**. Workstream unit scores: Complete `1`, On Track `0.85`, At Risk `0.5`, Blocked `0`. Checklist unit scores: Complete `1`, Incomplete `0.5`, Blocked `0`. Constants `WORKSTREAM_WEIGHT` / `CHECKLIST_WEIGHT` live in `src/utils/readiness.ts`. |
| **At-Risk Workstreams** | Count of workstreams whose `status` is exactly `'At Risk'` (`countAtRiskWorkstreams`). |
| **Blocked Dependencies** | **Count** of distinct dependency strings collected from workstreams with `status === 'Blocked'` only (`getBlockedDependencies`). Subtitle on the card clarifies “unique deps on blocked workstreams.” |
| **Go-Live Status** | Short label from `computeGoLiveStatus`: chooses a target window by matching the first milestone whose title matches `/go-?live/i`, else the last milestone; formats `targetDate` for display. Prefix is `At Risk`, `Conditional`, or `On Track` based on checklist blocked items and readiness thresholds (`< 55`, `< 75`). |
| **Open Risks** | Count of risks where `status !== 'Mitigated'` (i.e. Open or In Progress) (`openRiskCount`). Card subtitle notes mitigated items are excluded. |

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin in `vite.config.ts`; `@import 'tailwindcss'` in `src/index.css`)

---

## Project Structure

```text
ajaia-delivery-dashboard/
├── index.html
├── package.json
├── vite.config.ts          # Vite + React + Tailwind v4 plugin
├── src/
│   ├── main.tsx            # App bootstrap
│   ├── App.tsx             # Layout + derived metrics passed into components
│   ├── index.css           # Tailwind entry
│   ├── types/
│   │   └── index.ts        # Workstream, Risk, Milestone, ChecklistItem
│   ├── data/
│   │   └── mockData.ts     # Exported mock arrays (workstreams, risks, milestones, checklistItems)
│   ├── utils/
│   │   └── readiness.ts    # Scoring, blocked deps, open risks, go-live string helpers
│   └── components/
│       ├── DashboardHeader.tsx
│       ├── ExecutiveSummaryCards.tsx
│       ├── WorkstreamTable.tsx
│       ├── RiskPanel.tsx
│       ├── TimelineView.tsx
│       └── ReadinessChecklist.tsx
└── README.md
```

---

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Vite serves the app locally (default **http://localhost:5173** unless the port is taken; the CLI prints the resolved URL).

Production build (TypeScript project build + Vite bundle):

```bash
npm run build
```

Optional: `npm run preview` serves the contents of `dist/` after a build (script defined in `package.json`).

---

## Readiness Scoring Logic

- **Workstreams:** Each row maps to a numeric contribution (1 / 0.85 / 0.5 / 0). The **workstream dimension** is the **unweighted arithmetic mean** across all workstreams (`averageWorkstreamScore`).
- **Checklist:** Each item maps to 1 / 0.5 / 0. The **checklist dimension** is the **mean** across all checklist items (`averageChecklistScore`).
- **Combined readiness:** `100 × (WORKSTREAM_WEIGHT × workstreamMean + CHECKLIST_WEIGHT × checklistMean)` with weights **0.6** and **0.4**, rounded to an integer percentage.
- **Blocked dependencies:** Operational signal only—sorted unique dependency strings from **blocked** workstreams; the summary card shows **`length`** of that list.
- **Open risks:** Count of risks still active for tracking (`Open` or `In Progress`); **does not** affect the percentage formula directly but is shown on the executive row.

---

## Scope Constraints

Deliberate prototype boundaries:

- **Static mock data only** — no CRUD, imports, or runtime edits to datasets.
- **No authentication** — open single-page view.
- **No backend** — no API routes or server processes in this repo.
- **No persistence** — refresh resets to bundled mock content.
- **No live integrations** — no EHR, ticketing, or alerting hooks.
- **No production infrastructure** — no deployment manifests, secrets, or hardened operational guarantees.

---

## Future Enhancements

Reasonable next steps in line with a delivery dashboard (not implemented here):

- Backend persistence and editable program records.
- Live integrations (project tools, risk registers, milestone sources).
- Automated reporting or scheduled exports for steering forums.
- Notifications for blocked workstreams or overdue checkpoints.
- Multi-program or multi-site views with switching context.

---

## Assessment Context

This prototype was produced as part of an **AI Solutions Architect**–style assessment emphasizing **delivery planning**, **operational visibility**, and **execution discipline** for an AI implementation in a regulated healthcare setting. The UI favors clarity for stakeholders and maps transparently to small, testable TypeScript helpers rather than opaque logic.

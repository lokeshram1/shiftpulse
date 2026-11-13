# Shiftwell · Workforce Operations Demo

A responsive shift task management and operations analytics demo for multi-location retail and food-service teams. Built with Next.js 14, React, TypeScript, Tailwind-ready CSS, Recharts, and REST route handlers.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and use the demonstration manager account:

```text
manager@shiftwell.demo
ShiftWell2026!
```

## Current features

- Overview dashboard with task KPIs, completion trends, and morning/evening comparison.
- Task board with employee, shift, store, due time, priority, category, and inline status editing.
- Team roster, analytics, calculated operational insights, and workspace settings views.
- `GET /api/tasks` returns task records and derived summary metrics. `PATCH /api/tasks` validates and updates task status and comments.
- Deterministic synthetic task records across 12 fictional employees, three locations, both shifts, and 14 dates. No employee PII or external AI key is used.
- Recharts visualizations and responsive layouts.

## Architecture and data model

The Next.js app serves the UI and REST endpoints. `lib/tasks.ts` defines task records and shared aggregate calculations; `app/api/tasks/route.ts` is the API boundary. Task records include an ID, name, category, employee, shift, store, task date, due time, priority, status, comment, and estimated minutes. Analytics are calculated from those records.

The current sample implementation stores generated records in process memory. A status edit is visible to the running app instance, but is reset when the server restarts and is not suitable for multi-instance production deployment. Authentication is a demo-only client-side gate and must be replaced with server-side sessions and role authorization before deployment. The dataset and dashboard illustrate the workflow; they are not a production PostgreSQL/FastAPI/ML implementation.

## API

- `GET /api/tasks` — returns `{ tasks, summary }`.
- `PATCH /api/tasks` — accepts `{ id, status, comment? }`, with status `Completed`, `In Progress`, or `Not Completed`; returns the updated task and refreshed summary.

## Deploy

The frontend can be deployed as a standard Next.js application on Vercel. Install dependencies and run `npm run build`. For a production service, connect a PostgreSQL database, migrate tasks/status history to normalized tables, and enforce authentication and manager/employee authorization on the server before deploying.

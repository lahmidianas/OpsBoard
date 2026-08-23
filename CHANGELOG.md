# Changelog

## 2026-08-23

### Added

- Created the OpsBoard GitHub repository.
- Added the project plan in `PLAN.md`.
- Scaffolded the SvelteKit + TypeScript app in `app/`.
- Added Tailwind CSS.
- Built the first dashboard UI with static demo data.
- Split the app into `/dashboard`, `/services`, `/incidents`, and `/incidents/[id]`.
- Moved shared demo services, incidents, check runs, and timeline data into `app/src/lib/demo.ts`.

### Verified

- `npm.cmd run check`
- `npm.cmd run build`
- `/dashboard`, `/services`, `/incidents`, and `/incidents/inc-1001` return `200` locally.

### Next

- Add service detail pages.
- Add Supabase schema.
- Connect dashboard pages to real database data.

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
- Added `/services/[id]` service detail pages with related incidents and recent check runs.
- Added Supabase schema migration and seed SQL.
- Added Supabase environment example.
- Moved Supabase files to the repo root so `supabase db push` works from the linked project.
- Applied schema and demo seed migrations to the remote Supabase database.
- Connected SvelteKit server loads to Supabase reads with local demo-data fallback.

### Verified

- `npm.cmd run check`
- `npm.cmd run build`
- `/dashboard`, `/services`, `/services/media-uploads`, `/incidents`, and `/incidents/inc-1001` return `200` locally.

### Next

- Add auth and write actions.

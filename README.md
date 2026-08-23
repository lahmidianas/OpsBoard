# OpsBoard

OpsBoard is a SvelteKit dashboard for monitoring services, integration checks, incidents, and SLA risk.

This project is built as a portfolio-grade SaaS demo for backend/full-stack software engineering roles.

## Stack

- SvelteKit
- TypeScript
- Tailwind CSS
- PostgreSQL/Supabase

## Local Setup

```bash
cd app
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Supabase Setup

Create `app/.env.local`:

```bash
PUBLIC_SUPABASE_URL=https://hpbfscnvnuwsbtmomctl.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
```

Apply migrations after linking the project:

```bash
supabase login
supabase link --project-ref hpbfscnvnuwsbtmomctl
supabase db push
```

`supabase/seed.sql` mirrors the demo seed migration for manual reseeding if needed.

## Current Status

- Routed dashboard UI
- Supabase-backed reads with local demo-data fallback
- Supabase schema and seed SQL
- Services and incidents pages
- Service detail pages
- Incident detail pages
- Build and Svelte checks passing

See [CHANGELOG.md](CHANGELOG.md) for progress notes.

## Next

- Add auth and write actions

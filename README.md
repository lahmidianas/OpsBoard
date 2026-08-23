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

Apply the SQL files in Supabase:

1. Run `app/supabase/migrations/20260823183000_initial_schema.sql`
2. Run `app/supabase/seed.sql`

## Current Status

- Routed dashboard UI
- Seeded in-file demo data
- Supabase schema and seed SQL
- Services and incidents pages
- Service detail pages
- Incident detail pages
- Build and Svelte checks passing

See [CHANGELOG.md](CHANGELOG.md) for progress notes.

## Next

- Connect dashboard to real data

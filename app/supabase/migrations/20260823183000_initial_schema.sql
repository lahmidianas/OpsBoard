create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'viewer' check (role in ('admin', 'support', 'viewer')),
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  owner_team text not null,
  environment text not null default 'production' check (environment in ('production', 'staging', 'development')),
  status text not null default 'operational' check (status in ('operational', 'degraded', 'down', 'maintenance')),
  check_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.checks (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  name text not null,
  method text not null default 'GET' check (method in ('GET', 'POST')),
  url text not null,
  expected_status integer not null default 200 check (expected_status between 100 and 599),
  interval_minutes integer not null default 5 check (interval_minutes > 0),
  timeout_seconds integer not null default 5 check (timeout_seconds > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.check_runs (
  id uuid primary key default gen_random_uuid(),
  check_id uuid not null references public.checks(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  status text not null check (status in ('success', 'failed', 'timeout')),
  http_status integer check (http_status between 100 and 599),
  response_time_ms integer check (response_time_ms >= 0),
  error_message text,
  checked_at timestamptz not null default now()
);

create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  title text not null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  status text not null default 'open' check (status in ('open', 'investigating', 'resolved')),
  opened_at timestamptz not null default now(),
  resolved_at timestamptz,
  assigned_to text,
  sla_due_at timestamptz not null,
  summary text
);

create table public.incident_events (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid not null references public.incidents(id) on delete cascade,
  event_type text not null check (event_type in ('opened', 'status_changed', 'note_added', 'check_failed', 'resolved')),
  message text not null,
  created_by text,
  created_at timestamptz not null default now()
);

create index services_status_idx on public.services(status);
create index checks_service_id_idx on public.checks(service_id);
create index check_runs_service_checked_idx on public.check_runs(service_id, checked_at desc);
create index incidents_status_idx on public.incidents(status);
create index incidents_service_id_idx on public.incidents(service_id);
create index incident_events_incident_created_idx on public.incident_events(incident_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.checks enable row level security;
alter table public.check_runs enable row level security;
alter table public.incidents enable row level security;
alter table public.incident_events enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "authenticated_select_services"
  on public.services for select
  to authenticated
  using (true);

create policy "authenticated_select_checks"
  on public.checks for select
  to authenticated
  using (true);

create policy "authenticated_select_check_runs"
  on public.check_runs for select
  to authenticated
  using (true);

create policy "authenticated_select_incidents"
  on public.incidents for select
  to authenticated
  using (true);

create policy "authenticated_select_incident_events"
  on public.incident_events for select
  to authenticated
  using (true);

create policy "support_write_services"
  on public.services for all
  to authenticated
  using (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')));

create policy "support_write_checks"
  on public.checks for all
  to authenticated
  using (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')));

create policy "support_write_check_runs"
  on public.check_runs for all
  to authenticated
  using (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')));

create policy "support_write_incidents"
  on public.incidents for all
  to authenticated
  using (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')));

create policy "support_write_incident_events"
  on public.incident_events for all
  to authenticated
  using (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'support')));

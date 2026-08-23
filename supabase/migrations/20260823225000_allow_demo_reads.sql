create policy "anon_select_services"
  on public.services for select
  to anon
  using (true);

create policy "anon_select_checks"
  on public.checks for select
  to anon
  using (true);

create policy "anon_select_check_runs"
  on public.check_runs for select
  to anon
  using (true);

create policy "anon_select_incidents"
  on public.incidents for select
  to anon
  using (true);

create policy "anon_select_incident_events"
  on public.incident_events for select
  to anon
  using (true);

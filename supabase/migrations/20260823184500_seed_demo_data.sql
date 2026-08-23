truncate table
  public.incident_events,
  public.incidents,
  public.check_runs,
  public.checks,
  public.services
restart identity cascade;

insert into public.services (id, slug, name, description, owner_team, environment, status, check_url)
values
  ('00000000-0000-0000-0000-000000000001', 'coupa-sap-sync', 'Coupa SAP Sync', 'Monitors purchase order and invoice synchronization between Coupa and SAP.', 'Integration', 'production', 'degraded', 'https://example.com/coupa-sap/health'),
  ('00000000-0000-0000-0000-000000000002', 'organizer-api', 'Organizer API', 'Back-office API for organizer dashboards and event reports.', 'Platform', 'production', 'operational', 'https://example.com/organizer-api/health'),
  ('00000000-0000-0000-0000-000000000003', 'media-uploads', 'Media Uploads', 'Signed upload endpoint for event media and organizer assets.', 'Platform', 'production', 'down', 'https://example.com/uploads/health'),
  ('00000000-0000-0000-0000-000000000004', 'ticket-checkout', 'Ticket Checkout', 'Checkout flow for paid event tickets and reservations.', 'Payments', 'production', 'operational', 'https://example.com/checkout/health');

insert into public.checks (id, service_id, name, method, url, expected_status, interval_minutes, timeout_seconds)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Coupa SAP health', 'GET', 'https://example.com/coupa-sap/health', 200, 5, 5),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Organizer API health', 'GET', 'https://example.com/organizer-api/health', 200, 5, 5),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Upload endpoint health', 'GET', 'https://example.com/uploads/health', 200, 5, 5),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'Checkout health', 'GET', 'https://example.com/checkout/health', 200, 5, 5);

insert into public.check_runs (check_id, service_id, status, http_status, response_time_ms, error_message, checked_at)
values
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'timeout', null, 5000, 'Request timed out', now() - interval '8 minutes'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'timeout', null, 5000, 'Request timed out', now() - interval '10 minutes'),
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'failed', 502, 712, 'Bad gateway from integration adapter', now() - interval '12 minutes'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'success', 200, 143, null, now() - interval '13 minutes'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'success', 200, 198, null, now() - interval '14 minutes');

insert into public.incidents (id, service_id, title, severity, status, opened_at, assigned_to, sla_due_at, summary)
values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'Signed upload endpoint timing out', 'critical', 'investigating', now() - interval '41 minutes', 'Platform', now() + interval '42 minutes', 'Media upload requests are timing out for organizer assets.'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Delayed purchase order sync', 'high', 'open', now() - interval '74 minutes', 'Integration', now() + interval '75 minutes', 'Purchase order sync is delayed between Coupa and SAP.'),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Organizer dashboard slow reports', 'medium', 'open', now() - interval '148 minutes', 'Platform', now() + interval '3 hours', 'Organizer report views are slower than expected.');

insert into public.incident_events (incident_id, event_type, message, created_by, created_at)
values
  ('20000000-0000-0000-0000-000000000001', 'check_failed', 'Third failed upload check confirmed the incident.', 'system', now() - interval '8 minutes'),
  ('20000000-0000-0000-0000-000000000001', 'status_changed', 'Status changed to investigating by Platform.', 'Platform', now() - interval '18 minutes'),
  ('20000000-0000-0000-0000-000000000001', 'opened', 'Incident opened after repeated timeout failures.', 'system', now() - interval '41 minutes'),
  ('20000000-0000-0000-0000-000000000002', 'check_failed', 'NJAMS-style integration delay detected.', 'system', now() - interval '52 minutes'),
  ('20000000-0000-0000-0000-000000000002', 'opened', 'Incident opened for delayed purchase order sync.', 'system', now() - interval '74 minutes'),
  ('20000000-0000-0000-0000-000000000003', 'check_failed', 'Dashboard response time above expected threshold.', 'system', now() - interval '140 minutes'),
  ('20000000-0000-0000-0000-000000000003', 'opened', 'Incident opened by support.', 'support', now() - interval '148 minutes');

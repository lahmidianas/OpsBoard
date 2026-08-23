# OpsBoard Project Plan

## 1. Project Goal

Build a portfolio-grade SaaS dashboard for monitoring services, integration checks, incidents, and SLA risk.

The project should help Anas Lahmidi apply for backend/full-stack software engineering roles by showing:

- Production-style SaaS thinking
- PostgreSQL data modeling
- Authentication and role-based access
- API/server-side logic
- Dashboard UI and operational workflows
- Incident/support experience connected to CGI, ServiceNow, Coupa/SAP, and HAFLASPOT

The MVP must be deployable, demoable, and explainable in interviews.

## 2. Product Pitch

OpsBoard is a lightweight incident and integration monitoring platform for support and engineering teams.

It tracks business services, runs health checks, opens incidents when checks fail repeatedly, shows SLA risk, and keeps a timeline of operational events.

Interview explanation:

> I built OpsBoard because my experience in application support showed me how important traceability, SLA handling, integration monitoring, and clear incident workflows are. The project turns that experience into a full-stack SaaS product using SvelteKit, TypeScript, PostgreSQL, Supabase Auth, and production-style data modeling.

## 3. Target Users

- Application support engineers
- Backend engineers
- SaaS operators
- IT service teams
- Small companies needing lightweight service monitoring

## 4. MVP Scope

The first version must include:

- Login/logout
- Demo account
- Dashboard overview
- Services list
- Service detail page
- Health checks
- Incidents table
- Incident detail with timeline
- SLA status
- Seeded demo data
- README with screenshots, architecture, and setup steps
- Deployment-ready configuration

Do not include in MVP:

- AI analysis
- Microservices
- Kafka
- Kubernetes
- Complex notification system
- Full billing
- Multi-tenant enterprise admin
- Custom chart library if simple CSS/cards are enough

## 5. Recommended Stack

### App Framework

SvelteKit with TypeScript.

Why:

- One project can handle frontend pages, server routes, form actions, and backend logic.
- Matches current HAFLASPOT experience.
- Strong signal for full-stack SaaS roles.
- Less boilerplate than splitting frontend and backend too early.

### Database

PostgreSQL via Supabase.

Why:

- PostgreSQL is respected in backend roles.
- Relational data fits services, checks, incidents, events, users, and roles.
- Supabase gives hosted Postgres, auth, migrations, and dashboard.

### Authentication

Supabase Auth.

Why:

- Do not build password handling manually.
- Gives sessions and user management quickly.
- Good enough for portfolio SaaS.

### Styling

Tailwind CSS.

Why:

- Fast dashboard UI.
- Easy tables, badges, filters, forms, and layout.
- Avoids spending too much time on custom CSS.

### Deployment

Vercel or Netlify for SvelteKit, Supabase for DB/Auth.

Why:

- Easy public demo URL.
- Familiar deployment story.
- No infrastructure work before the product is useful.

## 6. Core Domain Model

### users

Handled mostly by Supabase Auth.

Application profile table:

- id
- email
- full_name
- role: admin, support, viewer
- created_at

### services

Represents monitored systems.

Fields:

- id
- name
- slug
- description
- owner_team
- environment: production, staging, development
- status: operational, degraded, down, maintenance
- check_url
- created_at
- updated_at

### checks

Represents configured checks for services.

Fields:

- id
- service_id
- name
- method: GET, POST
- url
- expected_status
- interval_minutes
- timeout_seconds
- is_active
- created_at

### check_runs

Stores each execution result.

Fields:

- id
- check_id
- service_id
- status: success, failed, timeout
- http_status
- response_time_ms
- error_message
- checked_at

### incidents

Represents support incidents.

Fields:

- id
- service_id
- title
- severity: low, medium, high, critical
- status: open, investigating, resolved
- opened_at
- resolved_at
- assigned_to
- sla_due_at
- summary

### incident_events

Timeline for incident activity.

Fields:

- id
- incident_id
- event_type: opened, status_changed, note_added, check_failed, resolved
- message
- created_by
- created_at

## 7. Main Screens

### Login

Purpose:

- Allow demo access.
- Keep the product feeling like a real SaaS app.

Elements:

- Email/password login
- Demo login button
- Product name and short tagline

### Dashboard

Purpose:

- Show operational status at a glance.

Cards:

- Total services
- Operational services
- Open incidents
- Critical incidents
- SLA risk count
- Average response time

Sections:

- Recent incidents
- Recent failed checks
- Service health table

### Services List

Purpose:

- Show all monitored services.

Columns:

- Name
- Environment
- Status
- Owner team
- Last check
- Response time
- Open incidents

Actions:

- View service
- Add service
- Edit service

### Service Detail

Purpose:

- Show one service's health, checks, and incidents.

Sections:

- Service summary
- Check configuration
- Recent check runs
- Related incidents
- Timeline

### Incidents List

Purpose:

- Support workflow screen.

Filters:

- Status
- Severity
- Service
- SLA risk

Columns:

- Title
- Service
- Severity
- Status
- Opened at
- SLA due
- Assigned to

Actions:

- Open incident
- Change status
- Resolve

### Incident Detail

Purpose:

- Show full traceability.

Sections:

- Incident summary
- Status/severity controls
- SLA panel
- Timeline
- Notes
- Related check failures

## 8. MVP User Flows

### Flow 1: Support Engineer Checks Dashboard

1. User logs in.
2. Dashboard shows 2 open incidents.
3. One incident is marked critical.
4. User opens incident detail.
5. User reads timeline and failed check history.

### Flow 2: Failed Check Opens Incident

1. Scheduled check runs.
2. Check fails 3 times.
3. App creates an incident.
4. Service status changes to degraded or down.
5. Timeline records the failure.

### Flow 3: Incident Resolution

1. User opens incident.
2. User adds note.
3. User changes status to investigating.
4. User resolves incident.
5. resolved_at is saved.
6. Service returns to operational if checks are healthy.

## 9. API / Server Actions

Keep API surface small.

Needed actions:

- create service
- update service
- create check
- run check
- create incident
- update incident status
- add incident note
- resolve incident
- load dashboard metrics

Do not create a separate API for every tiny UI interaction unless SvelteKit form actions already cover it.

## 10. Health Check Logic

Simple MVP logic:

1. Fetch check URL.
2. Measure response time.
3. Compare HTTP status to expected status.
4. Save check_runs row.
5. If latest 3 runs failed, create incident if no open incident exists for that service.
6. Update service status.

Failure status rules:

- 1 failure: degraded
- 3 failures: down + open incident
- success after failure: operational if no unresolved critical incident remains

Add comment if using a simple rule:

```ts
// ponytail: simple 3-failure rule, replace with configurable alert rules if real users need it.
```

## 11. Project Phases

### Phase 1: App Foundation

Goal:

Create the SvelteKit app and basic layout.

Tasks:

- Initialize SvelteKit project
- Add TypeScript
- Add Tailwind
- Create dashboard layout
- Add sidebar navigation
- Add placeholder pages

Done when:

- App runs locally
- Dashboard shell is visible
- Navigation works

### Phase 2: Data Model

Goal:

Create database schema and seed data.

Tasks:

- Create Supabase project
- Add migrations
- Create profiles, services, checks, check_runs, incidents, incident_events
- Add seed data
- Add TypeScript types if generated or manually needed

Done when:

- Local app can read seeded services/incidents
- Dashboard cards use real database data

### Phase 3: Auth

Goal:

Protect app routes and support demo login.

Tasks:

- Configure Supabase Auth
- Add login page
- Add logout
- Protect dashboard routes
- Create profile after signup/login if needed
- Add role field

Done when:

- Unauthenticated user sees login
- Authenticated user sees dashboard
- Demo login works

### Phase 4: Services

Goal:

Manage monitored services.

Tasks:

- Services list page
- Service detail page
- Add service form
- Edit service form
- Status badges
- Recent checks table

Done when:

- User can create and edit a service
- User can view service health

### Phase 5: Incidents

Goal:

Build support workflow.

Tasks:

- Incidents list page
- Filters
- Incident detail page
- Add timeline note
- Change status
- Resolve incident
- SLA risk badge

Done when:

- User can open, investigate, and resolve incidents
- Timeline records important actions

### Phase 6: Health Checks

Goal:

Run checks and generate incidents.

Tasks:

- Create check runner function
- Save check_runs
- Update service status
- Create incident after repeated failures
- Add manual "Run check" button
- Add scheduled trigger later

Done when:

- Manual check run works
- Failed checks create incidents
- Dashboard updates from check results

### Phase 7: Polish

Goal:

Make it recruiter/interview ready.

Tasks:

- Responsive dashboard
- Empty states
- Loading states
- Error messages
- Seed realistic demo data
- Add screenshots
- Add README
- Add architecture section

Done when:

- Public demo looks complete
- README explains value, stack, setup, and architecture

### Phase 8: Deploy

Goal:

Publish a live demo.

Tasks:

- Deploy SvelteKit to Vercel or Netlify
- Set env vars
- Connect Supabase
- Test demo account
- Add deployed link to README and CV/GitHub

Done when:

- Recruiter can open the app
- Demo login works
- Main flows work

## 12. Suggested Folder Structure

```text
opsboard/
  src/
    lib/
      server/
        db.ts
        checks.ts
        incidents.ts
      components/
        StatusBadge.svelte
        SeverityBadge.svelte
        MetricCard.svelte
    routes/
      login/
      dashboard/
      services/
      incidents/
  supabase/
    migrations/
    seed.sql
  README.md
```

Do not create more folders until real files need them.

## 13. README Requirements

The README should include:

- Project pitch
- Demo link
- Demo credentials
- Screenshots
- Tech stack
- Features
- Database model summary
- Architecture diagram or simple text architecture
- Local setup
- Environment variables
- What I learned
- Future improvements

## 14. Interview Talking Points

Use these points in interviews:

- "I designed the database around operational traceability."
- "I used PostgreSQL relationships instead of storing everything as JSON."
- "I used Supabase Auth instead of building password handling manually."
- "I kept the architecture simple: one SvelteKit app, server-side logic, and Postgres."
- "The incident timeline reflects what I learned from application support and SLA workflows."
- "The health-check runner shows backend logic, failure handling, and automated incident creation."

## 15. Future Improvements

Add only after MVP is deployed:

- Java Spring Boot checker service
- Email/Slack alerts
- Configurable alert rules
- Team/workspace multi-tenancy
- Public status page
- Postmortem generator
- Webhook integrations
- Basic anomaly detection with Python

## 16. Success Criteria

The project is successful when:

- It has a live demo URL.
- It has a clean GitHub README.
- It has seeded demo data.
- It has at least 5 screenshots.
- It has one clear architecture explanation.
- It can be explained in under 2 minutes.
- It directly supports applications for backend/full-stack software engineer roles.

## 17. First Build Checklist

- [ ] Create SvelteKit project
- [ ] Add Tailwind
- [ ] Build dashboard shell
- [ ] Create Supabase project
- [ ] Add schema migration
- [ ] Seed demo data
- [ ] Connect app to Supabase
- [ ] Add login/demo login
- [ ] Build services page
- [ ] Build incidents page
- [ ] Add check runner
- [ ] Add README
- [ ] Deploy


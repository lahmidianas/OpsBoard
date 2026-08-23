import { error } from '@sveltejs/kit';
import { checkRuns as demoCheckRuns, incidents as demoIncidents, metrics as demoMetrics, services as demoServices, timelines as demoTimelines } from '$lib/demo';
import { hasSupabaseEnv, supabase } from './supabase';

type ServiceRow = {
	id: string;
	slug: string;
	name: string;
	description: string | null;
	owner_team: string;
	environment: string;
	status: string;
};

type IncidentRow = {
	id: string;
	service_id: string;
	title: string;
	severity: string;
	status: string;
	opened_at: string;
	assigned_to: string | null;
	sla_due_at: string;
	summary: string | null;
	services?: { name: string; slug: string } | { name: string; slug: string }[] | null;
};

type CheckRunRow = {
	service_id: string;
	status: string;
	http_status: number | null;
	response_time_ms: number | null;
	error_message: string | null;
	checked_at: string;
};

type EventRow = {
	message: string;
	created_at: string;
};

const time = (value: string) =>
	new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value));

const opened = (value: string) =>
	new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value));

function sla(value: string) {
	const minutes = Math.max(0, Math.round((new Date(value).getTime() - Date.now()) / 60000));
	return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function mapService(row: ServiceRow, latest?: CheckRunRow) {
	return {
		id: row.slug,
		dbId: row.id,
		name: row.name,
		team: row.owner_team,
		env: row.environment,
		status: row.status,
		lastCheck: latest ? time(latest.checked_at) : 'never',
		response: latest?.response_time_ms == null ? 'timeout' : `${latest.response_time_ms}ms`
	};
}

function mapIncident(row: IncidentRow) {
	const service = Array.isArray(row.services) ? row.services[0] : row.services;
	return {
		id: row.id,
		title: row.title,
		serviceId: service?.slug ?? row.service_id,
		service: service?.name ?? 'Unknown service',
		severity: row.severity,
		status: row.status,
		sla: sla(row.sla_due_at),
		opened: opened(row.opened_at),
		owner: row.assigned_to ?? 'Unassigned'
	};
}

function mapRun(row: CheckRunRow) {
	return {
		serviceId: row.service_id,
		status: row.status === 'timeout' ? 'failed' : row.status,
		code: row.http_status?.toString() ?? row.error_message ?? 'timeout',
		response: row.response_time_ms == null ? 'timeout' : `${row.response_time_ms}ms`,
		at: time(row.checked_at)
	};
}

function demoRows() {
	return {
		services: demoServices.map((service) => ({ ...service, dbId: service.id })),
		incidents: demoIncidents,
		checkRuns: demoCheckRuns
	};
}

async function rows() {
	const db = supabase();
	const [servicesResult, incidentsResult, runsResult] = await Promise.all([
		db.from('services').select('id, slug, name, description, owner_team, environment, status').order('name'),
		db
			.from('incidents')
			.select('id, service_id, title, severity, status, opened_at, assigned_to, sla_due_at, summary, services(name, slug)')
			.neq('status', 'resolved')
			.order('opened_at', { ascending: false }),
		db
			.from('check_runs')
			.select('service_id, status, http_status, response_time_ms, error_message, checked_at')
			.order('checked_at', { ascending: false })
	]);

	if (servicesResult.error) throw error(500, servicesResult.error.message);
	if (incidentsResult.error) throw error(500, incidentsResult.error.message);
	if (runsResult.error) throw error(500, runsResult.error.message);

	const runs = (runsResult.data ?? []) as CheckRunRow[];
	const latest = new Map<string, CheckRunRow>();
	for (const run of runs) if (!latest.has(run.service_id)) latest.set(run.service_id, run);

	return {
		services: ((servicesResult.data ?? []) as ServiceRow[]).map((service) => mapService(service, latest.get(service.id))),
		incidents: ((incidentsResult.data ?? []) as unknown as IncidentRow[]).map(mapIncident),
		checkRuns: runs.map(mapRun)
	};
}

export async function dashboardData() {
	if (!hasSupabaseEnv) return { metrics: demoMetrics, services: demoServices, incidents: demoIncidents };

	const data = await rows().catch(demoRows);
	const avg = Math.round(
		data.checkRuns.reduce((sum, run) => sum + (Number.parseInt(run.response) || 0), 0) / Math.max(data.checkRuns.length, 1)
	);
	const critical = data.incidents.filter((incident) => incident.severity === 'critical').length;

	return {
		...data,
		metrics: [
			{ label: 'Services', value: String(data.services.length), detail: `${data.services.filter((service) => service.status === 'operational').length} operational`, tone: 'text-slate-950' },
			{ label: 'Open incidents', value: String(data.incidents.length), detail: `${critical} critical`, tone: 'text-red-700' },
			{ label: 'SLA risk', value: String(data.incidents.filter((incident) => incident.sla.includes('min')).length), detail: 'due under 1h', tone: 'text-amber-700' },
			{ label: 'Avg response', value: `${avg}ms`, detail: 'latest checks', tone: 'text-emerald-700' }
		]
	};
}

export async function servicesData() {
	if (!hasSupabaseEnv) return { services: demoServices };
	return { services: (await rows().catch(demoRows)).services };
}

export async function serviceData(slug: string) {
	if (!hasSupabaseEnv) {
		const service = demoServices.find((item) => item.id === slug);
		if (!service) error(404, 'Service not found');
		return {
			service,
			incidents: demoIncidents.filter((item) => item.serviceId === service.id),
			checkRuns: demoCheckRuns.filter((item) => item.serviceId === service.id)
		};
	}

	const data = await rows().catch(demoRows);
	const service = data.services.find((item) => item.id === slug);
	if (!service) error(404, 'Service not found');
	return {
		service,
		incidents: data.incidents.filter((item) => item.serviceId === service.id),
		checkRuns: data.checkRuns.filter((item) => item.serviceId === service.dbId)
	};
}

export async function incidentsData() {
	if (!hasSupabaseEnv) return { incidents: demoIncidents };
	return { incidents: (await rows().catch(() => ({ incidents: demoIncidents }))).incidents };
}

export async function incidentData(id: string) {
	if (!hasSupabaseEnv) {
		const incident = demoIncidents.find((item) => item.id === id);
		if (!incident) error(404, 'Incident not found');
		return {
			incident,
			service: demoServices.find((item) => item.id === incident.serviceId),
			checkRuns: demoCheckRuns.filter((item) => item.serviceId === incident.serviceId),
			timeline: demoTimelines[incident.id] ?? []
		};
	}

	const data = await rows().catch(demoRows);
	const incident = data.incidents.find((item) => item.id === id);
	if (!incident) error(404, 'Incident not found');

	let events: EventRow[] | null = null;
	try {
		const result = await supabase()
			.from('incident_events')
			.select('message, created_at')
			.eq('incident_id', id)
			.order('created_at', { ascending: false });
		if (result.error) throw result.error;
		events = (result.data ?? []) as EventRow[];
	} catch {
		events = null;
	}

	const service = data.services.find((item) => item.id === incident.serviceId);
	return {
		incident,
		service,
		checkRuns: service ? data.checkRuns.filter((item) => item.serviceId === service.dbId) : [],
		timeline: events
			? events.map((event) => ({ at: time(event.created_at), event: event.message }))
			: demoTimelines[incident.id] ?? []
	};
}

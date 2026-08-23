export const metrics = [
	{ label: 'Services', value: '8', detail: '6 operational', tone: 'text-slate-950' },
	{ label: 'Open incidents', value: '3', detail: '1 critical', tone: 'text-red-700' },
	{ label: 'SLA risk', value: '2', detail: 'due under 1h', tone: 'text-amber-700' },
	{ label: 'Avg response', value: '184ms', detail: 'last 24h', tone: 'text-emerald-700' }
];

export const services = [
	{
		id: 'coupa-sap-sync',
		name: 'Coupa SAP Sync',
		team: 'Integration',
		env: 'production',
		status: 'degraded',
		lastCheck: '2 min ago',
		response: '712ms'
	},
	{
		id: 'organizer-api',
		name: 'Organizer API',
		team: 'Platform',
		env: 'production',
		status: 'operational',
		lastCheck: '1 min ago',
		response: '143ms'
	},
	{
		id: 'media-uploads',
		name: 'Media Uploads',
		team: 'Platform',
		env: 'production',
		status: 'down',
		lastCheck: 'now',
		response: 'timeout'
	},
	{
		id: 'ticket-checkout',
		name: 'Ticket Checkout',
		team: 'Payments',
		env: 'production',
		status: 'operational',
		lastCheck: '4 min ago',
		response: '198ms'
	}
];

export const incidents = [
	{
		id: 'inc-1001',
		title: 'Signed upload endpoint timing out',
		serviceId: 'media-uploads',
		service: 'Media Uploads',
		severity: 'critical',
		status: 'investigating',
		sla: '42 min',
		opened: 'Today 17:31',
		owner: 'Platform'
	},
	{
		id: 'inc-1002',
		title: 'Delayed purchase order sync',
		serviceId: 'coupa-sap-sync',
		service: 'Coupa SAP Sync',
		severity: 'high',
		status: 'open',
		sla: '1h 15m',
		opened: 'Today 16:58',
		owner: 'Integration'
	},
	{
		id: 'inc-1003',
		title: 'Organizer dashboard slow reports',
		serviceId: 'organizer-api',
		service: 'Organizer API',
		severity: 'medium',
		status: 'open',
		sla: '3h',
		opened: 'Today 15:44',
		owner: 'Platform'
	}
];

export const checkRuns = [
	{ serviceId: 'media-uploads', status: 'failed', code: 'timeout', response: '5000ms', at: '18:12' },
	{ serviceId: 'media-uploads', status: 'failed', code: 'timeout', response: '5000ms', at: '18:10' },
	{ serviceId: 'coupa-sap-sync', status: 'failed', code: '502', response: '712ms', at: '18:08' },
	{ serviceId: 'organizer-api', status: 'success', code: '200', response: '143ms', at: '18:07' }
];

export const timelines: Record<string, { at: string; event: string }[]> = {
	'inc-1001': [
		{ at: '18:12', event: 'Third failed upload check confirmed the incident.' },
		{ at: '18:02', event: 'Status changed to investigating by Platform.' },
		{ at: '17:31', event: 'Incident opened after repeated timeout failures.' }
	],
	'inc-1002': [
		{ at: '17:21', event: 'NJAMS-style integration delay detected.' },
		{ at: '16:58', event: 'Incident opened for delayed purchase order sync.' }
	],
	'inc-1003': [
		{ at: '15:52', event: 'Dashboard response time above expected threshold.' },
		{ at: '15:44', event: 'Incident opened by support.' }
	]
};

export const statusClass: Record<string, string> = {
	operational: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
	degraded: 'bg-amber-50 text-amber-700 ring-amber-200',
	down: 'bg-red-50 text-red-700 ring-red-200',
	investigating: 'bg-sky-50 text-sky-700 ring-sky-200',
	open: 'bg-slate-100 text-slate-700 ring-slate-200',
	failed: 'bg-red-50 text-red-700 ring-red-200',
	success: 'bg-emerald-50 text-emerald-700 ring-emerald-200'
};

export const severityClass: Record<string, string> = {
	critical: 'bg-red-700 text-white',
	high: 'bg-orange-100 text-orange-800',
	medium: 'bg-blue-100 text-blue-800'
};

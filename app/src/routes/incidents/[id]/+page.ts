import { error } from '@sveltejs/kit';
import { checkRuns, incidents, services, timelines } from '$lib/demo';

export function load({ params }) {
	const incident = incidents.find((item) => item.id === params.id);
	if (!incident) error(404, 'Incident not found');

	return {
		incident,
		service: services.find((item) => item.id === incident.serviceId),
		checkRuns: checkRuns.filter((item) => item.serviceId === incident.serviceId),
		timeline: timelines[incident.id] ?? []
	};
}

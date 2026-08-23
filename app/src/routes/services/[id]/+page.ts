import { error } from '@sveltejs/kit';
import { checkRuns, incidents, services } from '$lib/demo';

export function load({ params }) {
	const service = services.find((item) => item.id === params.id);
	if (!service) error(404, 'Service not found');

	return {
		service,
		incidents: incidents.filter((item) => item.serviceId === service.id),
		checkRuns: checkRuns.filter((item) => item.serviceId === service.id)
	};
}

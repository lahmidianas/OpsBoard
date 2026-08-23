import { incidentData } from '$lib/server/data';

export const load = ({ params }) => incidentData(params.id);

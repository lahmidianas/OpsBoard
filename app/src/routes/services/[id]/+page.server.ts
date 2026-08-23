import { serviceData } from '$lib/server/data';

export const load = ({ params }) => serviceData(params.id);

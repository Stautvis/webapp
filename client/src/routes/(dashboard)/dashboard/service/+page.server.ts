import api from '$lib/server/api';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	const { parent, locals } = event;
	await parent();
	const services = (await api.get(
		event,
		`/company/${locals.user?.companyID}/service`
	)) as App.IService[];
	return {
		services
	};
};

import api from '$lib/server/api';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	try {
		const companies = await api.get<App.ICompany[]>(event, '/company');
		return {
			companies
		};
	} catch (err) {
		return { companies: [] };
	}
};

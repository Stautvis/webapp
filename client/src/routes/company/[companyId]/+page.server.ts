import api from '$lib/server/api';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	try {
		const company = await api.get<App.ICompany>(event, `/company/${event.params.companyId}`);
		return {
			company
		};
	} catch (err) {
		return { company: undefined };
	}
};

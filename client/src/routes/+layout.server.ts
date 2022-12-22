import api from '$lib/server/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { locals } = event;
	if (locals.user) {
		try {
			event.locals.company = await api.get(event, `/company/${locals.user.companyID}`);
		} catch (err) {
			event.locals.company = undefined;
		}
	}
	return {
		user: event.locals.user,
		company: event.locals.company
	};
};

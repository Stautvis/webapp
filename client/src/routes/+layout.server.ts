import api from '$lib/server/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { locals } = event;
	if (locals.user) {
		event.locals.company = await api.get(event, `/company/${locals.user.companyID}`);
	}
	return {
		user: event.locals.user,
		company: event.locals.company
	};
};

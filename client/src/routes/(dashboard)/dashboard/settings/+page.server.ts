import { companyEditScheme } from '$lib/schemas/company';
import api from '$lib/server/api';
import { validateForm } from '$lib/server/validateForm';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const load: ServerLoad = async (event) => {
	const { locals } = event;
	event.locals.company = await api.get<App.ICompany>(event, `/company/${locals.user?.companyID}`);
	return { company: event.locals.company };
};

export const actions: Actions = {
	default: async (event) => {
		const { request, url, locals } = event;
		const { data, errors } = await validateForm(request.formData(), companyEditScheme);

		if (Object.keys(errors).length > 0) return { data, errors, open: true };

		try {
			await api.put<string>(event, `/company/${locals.user?.companyID}`, data);
		} catch (err) {
			if (err instanceof ZodError) {
				return {
					data,
					errors: err.flatten().fieldErrors,
					open: true
				};
			}
		}
		throw redirect(301, url.searchParams.get('redirect') || '/dashboard/settings');
	}
};

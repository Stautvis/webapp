import { serviceAddScheme } from '$lib/schemas/serviceAdd';
import api from '$lib/server/api';
import { validateForm } from '$lib/server/validateForm';
import { redirect, type Actions } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions: Actions = {
	default: async (event) => {
		const { request, url, locals } = event;
		const { data, errors } = await validateForm(request.formData(), serviceAddScheme);

		if (Object.keys(errors).length > 0) return { data, errors };

		try {
			await api.post<string>(event, `/company/${locals.user?.companyID}/service`, data);
			console.log('created');
		} catch (err) {
			console.log(err);
			if (err instanceof ZodError) {
				return {
					data,
					errors: err.flatten().fieldErrors
				};
			}
		}
		throw redirect(301, url.searchParams.get('redirect') || '/dashboard/service');
	}
};

import { registerScheme } from '$lib/schemas/register';
import api from '$lib/server/api';
import { validateForm } from '$lib/server/validateForm';
import { redirect, type Actions } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions: Actions = {
	default: async (event) => {
		const { request, url, locals } = event;
		const { data, errors } = await validateForm(request.formData(), registerScheme);

		if (Object.keys(errors).length > 0) return { data, errors };

		try {
			await api.post<string>(event, `/company/2/service`, data);
		} catch (err) {
			if (err instanceof ZodError) {
				return {
					data,
					errors: err.flatten().fieldErrors
				};
			}
		}
		throw redirect(301, url.searchParams.get('redirect') || '/');
	}
};

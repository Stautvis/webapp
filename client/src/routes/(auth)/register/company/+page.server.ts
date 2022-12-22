import { companyEditScheme } from '$lib/schemas/company';
import api from '$lib/server/api';
import { validateForm } from '$lib/server/validateForm';
import { redirect, type Actions } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions: Actions = {
	default: async (event) => {
		const { request, url, locals } = event;
		const { data, errors } = await validateForm(request.formData(), companyEditScheme);

		if (Object.keys(errors).length > 0) return { data, errors, open: true };

		try {
			const company = await api.post<App.ICompany>(event, `/company`, data);
			locals.company = company;
		} catch (err) {
			if (err instanceof ZodError) {
				return {
					data,
					errors: err.flatten().fieldErrors,
					open: true
				};
			}
		}
		throw redirect(301, url.searchParams.get('redirect') || '/dashboard');
	}
};

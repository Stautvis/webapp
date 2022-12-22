import { serviceAddScheme } from '$lib/schemas/serviceAdd';
import api from '$lib/server/api';
import { validateForm } from '$lib/server/validateForm';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const load: ServerLoad = async (event) => {
	const { locals, params } = event;
	return (await api.get(
		event,
		`/company/${locals.user?.companyID}/service/${params.serviceId}`
	)) as App.IService;
};

export const actions: Actions = {
	default: async (event) => {
		const { request, url, locals, params } = event;
		const { data, errors } = await validateForm(request.formData(), serviceAddScheme);

		if (Object.keys(errors).length > 0) return { data, errors };

		try {
			const res = await api.put<string>(
				event,
				`/company/${locals.user?.companyID}/service/${params.serviceId}`,
				data
			);
		} catch (err) {
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

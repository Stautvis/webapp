import { registerScheme } from '$lib/schemas/register';
import api from '$lib/server/api';
import { validateForm } from '$lib/server/validateForm';
import { redirect, type Actions } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions: Actions = {
	default: async (event) => {
		const { cookies, request, url } = event;
		const { data, errors } = await validateForm(request.formData(), registerScheme);

		if (Object.keys(errors).length > 0) return { data, errors };

		data.gender = parseInt(data.gender as string, 10);

		try {
			await api.post<string>(event, '/user', data);
			const token = await api.post<string>(event, '/user/login', {
				emailAddress: data.emailAddress,
				password: data.password
			});
			cookies.set('auth', token);
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

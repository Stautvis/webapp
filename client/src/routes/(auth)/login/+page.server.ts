import api from '$lib/server/api';
import { validateForm } from '$lib/server/validateForm';
import { redirect, type Actions } from '@sveltejs/kit';
import { ZodError, z } from 'zod';

const loginScheme = z.object({
	emailAddress: z.string({ required_error: 'Email address is required!' }).email(),
	password: z.string().min(1, { message: 'Password is required!' })
});

export const actions: Actions = {
	default: async (event) => {
		const { cookies, request, url } = event;
		const { data, errors } = await validateForm(request.formData(), loginScheme);

		if (Object.keys(errors).length > 0) return { data, errors };

		try {
			const token = await api.post<string>(event, '/user/login', data);
			cookies.set('auth', token, { path: '/' });
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

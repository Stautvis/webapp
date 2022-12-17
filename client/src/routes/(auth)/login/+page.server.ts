import { redirect, type Actions } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { post } from '$lib/utils/api';
import { validateData } from '$lib/utils/validateData';

const loginScheme = z.object({
	emailAddress: z.string({ required_error: 'Email address is required!' }).email(),
	password: z.string().min(1, { message: 'Password is required!' })
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { data, errors } = await validateData(request.formData(), loginScheme);

		if (Object.keys(errors).length > 0) return invalid(400, { data, errors });

		try {
			const token = await post('/user/login', data, cookies);
			cookies.set('Bearer', ('Bearer ' + token) as string);
		} catch (err) {
			if (err instanceof ZodError) {
				return invalid(400, {
					data,
					errors: err.flatten().fieldErrors
				});
			}
		}
		throw redirect(301, '/');
	}
};

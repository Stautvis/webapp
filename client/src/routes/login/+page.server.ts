import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { post } from '../../lib/utils/api';
import { validateData } from '../../lib/utils/validateData';

const loginScheme = z.object({
	emailAddress: z.string({ required_error: 'Email address is required!' }).email(),
	password: z
		.string({ required_error: 'Password is required!' })
		.min(1, { message: 'Password is required!' })
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { data, errors } = await validateData(request.formData(), loginScheme);

		if (errors !== null) return invalid(300, { data, errors });

		try {
			const token = await post('/user/login', data);
			cookies.set('Bearer', token as string);
			console.log(cookies.get('Bearer'));
		} catch (err) {
			if (err instanceof ZodError) {
				return invalid(300, {
					data,
					errors: err.flatten().fieldErrors
				});
			}
		}
		throw redirect(301, '/');
	}
};

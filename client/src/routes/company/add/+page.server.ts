import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { post } from '../../../lib/utils/api';
import { validateData } from '../../../lib/utils/validateData';

export const companyAddScheme = z.object({
	title: z.string().min(1, { message: 'Title is required!' }),
	description: z.string().min(1, { message: 'Description is required!' })
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { data, errors } = await validateData(request.formData(), companyAddScheme);

		if (Object.keys(errors).length > 0) return invalid(400, { data, errors });
		try {
			await post('/company', data, cookies);
		} catch (err) {
			if (err instanceof ZodError) {
				return invalid(400, {
					data,
					errors: err.flatten().fieldErrors as { [x: string]: string[] }
				});
			}
		}
		throw redirect(301, '/');
	}
};

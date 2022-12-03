import { post } from '$lib/utils/api';
import { validateData } from '$lib/utils/validateData';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { z, ZodError } from 'zod';

export const serviceAddScheme = z.object({
	title: z.string().min(1, { message: 'Title is required!' }),
	description: z.string().min(1, { message: 'Description is required!' })
});

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		const { data, errors } = await validateData(request.formData(), serviceAddScheme);

		if (Object.keys(errors).length > 0) return invalid(400, { data, errors });
		try {
			await post(`/company/${params.id}/service`, data, cookies);
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

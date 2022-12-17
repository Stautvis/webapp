import { get, HttpRequestError, put } from '$lib/utils/api';
import { validateData } from '$lib/utils/validateData';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { zfd } from 'zod-form-data';
import type { PageServerLoad } from './$types';

const serviceAddScheme = zfd.formData({
	title: zfd.text(z.string({ required_error: 'Title is required!' })),
	description: zfd.text(z.string({ required_error: 'Description is required!' })),
	price: zfd.numeric(
		z
			.number({ required_error: 'Price is required' })
			.nonnegative({ message: 'Price must be greater than or equal to 0' })
	)
});

export const load: PageServerLoad = async ({ params }) => {
	try {
		const data = (await get(`/company/2/service/${params.serviceId}`, undefined)) as App.IService[];
		return data;
	} catch (err) {
		if (err instanceof HttpRequestError) {
			if (err.status === 401 || err.status === 403) throw redirect(301, '/login');
		}
	}
};

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		const { data, errors } = await validateData(request.formData(), serviceAddScheme);

		// const company = cookies.get('Company');

		if (Object.keys(errors).length > 0) return invalid(400, { data, errors });
		try {
			await put(`/company/2/service/${params.serviceId}`, data, cookies);
		} catch (err) {
			if (err instanceof ZodError) {
				return invalid(400, {
					data,
					errors: err.flatten().fieldErrors as { [x: string]: string[] }
				});
			}
			if (err instanceof HttpRequestError) {
				if (err.status === 401) throw redirect(301, '/login');
			}
		}
		throw redirect(301, '/dashboard/service');
	}
};

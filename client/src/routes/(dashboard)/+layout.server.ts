import { HttpRequestError, post } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	try {
		const token = (await post(`/User/RefreshToken`, {}, cookies)) as App.IService[];
		console.log(token);
		cookies.set('Bearer', ('Bearer ' + token) as string);
		return { token };
	} catch (err) {
		console.log(err);
		if (err instanceof HttpRequestError) {
			if (err.status === 401 || err.status === 403) throw redirect(301, '/login');
		}
	}
};

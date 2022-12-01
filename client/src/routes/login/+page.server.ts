import type { Actions } from '@sveltejs/kit';
import { post } from '../../$lib/api.server';

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const data = await request.formData();

		const emailAddress = data.get('emailAddress')?.toString();
		const password = data.get('password')?.toString();

		const res = await post(fetch, '/user/login', { emailAddress, password });
		console.log(res);

		cookies.set('session', res, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 30 });

		const service = await post(
			fetch,
			'/company/14/service',
			{ title: 'Naujas' },
			cookies.get('session')
		);

		console.log(service);
	}
};

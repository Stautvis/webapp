import { error, redirect } from '@sveltejs/kit';

const HOST = 'http://localhost:63843';

export const get = async (call: typeof fetch, url: string) => {
	const response = await call(HOST + url, {});

	if (response.status == 404) throw redirect(301, '/');
	if (response.status == 401) throw redirect(301, '/login');
	const data = await response.json();
	return data;
};

export const post = async (call: typeof fetch, url: string, body: object, token?: string) => {
	const response = await call(HOST + url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`
		}
	});

	if (response.status == 401) throw redirect(301, '/login');

	const contentType = response.headers.get('content-type');
	if (contentType == null) throw error(301, { message: 'Invalid content-type' });
	if (contentType.includes('json')) return await response.json();

	return await response.text();
};

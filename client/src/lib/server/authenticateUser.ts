import { API_HOST } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

export const authenticateUser: AuthenticateUser = async (event: RequestEvent) => {
	const { cookies, fetch } = event;
	const auth = cookies.get('auth');

	if (auth === undefined) return undefined;

	const response = await fetch(`${API_HOST}/User`, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + auth }
	});

	const { status } = response;
	if (status === 401) return undefined;

	return (await response.json()) as App.IUser;
};

export type AuthenticateUser = (event: RequestEvent) => Promise<App.IUser | undefined>;

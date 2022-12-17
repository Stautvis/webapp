import api from '$lib/server/api';
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const authenticate: Handle = async ({ event, resolve }) => {
	event.locals.user = await getUer(event);
	const response = await resolve(event);
	return response;
};

type GetUser = (event: RequestEvent) => Promise<App.Locals['user'] | undefined>;
const getUer: GetUser = async (event) => {
	try {
		const user = await api.get<App.IUser>(event, '/user/logged');
		const token = await api.post<string>(event, '/user/refreshToken', null);
		event.cookies.set('auth', token);
		return user;
	} catch (err) {
		return undefined;
	}
};

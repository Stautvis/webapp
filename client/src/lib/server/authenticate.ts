import api, { HttpRequestError } from '$lib/server/api';
import type { RequestEvent } from '@sveltejs/kit';

type Authenticaete = (event: RequestEvent) => Promise<App.Locals['user'] | undefined>;
export const authenticate: Authenticaete = async (event) => {
	try {
		const user = await api.get<App.IUser>(event, '/user/logged');
		// const token = await api.post<string>(event, '/user/refreshToken', null);
		// event.cookies.set('auth', token, { path: '/' });
		return user;
	} catch (err) {
		if (err instanceof HttpRequestError) {
			// event.cookies.delete('refreshToken');
			event.cookies.delete('auth', { path: '/' });
			return undefined;
		}
	}
};

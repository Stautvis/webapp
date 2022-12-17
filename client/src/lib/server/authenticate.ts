import api from '$lib/server/api';
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const authenticate: Handle = async ({ event, resolve }) => {
	const user = await getUer(event);

	if (user === undefined) console.log('undefined user');
	const response = await resolve(event);
	return response;
};

type GetUser = (event: RequestEvent) => Promise<App.Locals['user'] | undefined>;
const getUer: GetUser = async (event) => {
	try {
		const user = await api.get<App.IUser | undefined>(event, '/user');
		console.log(user);
		return user;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};

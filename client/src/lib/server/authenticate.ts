import { authenticateUser } from '$lib/server/authenticateUser';
import { logout } from '$lib/server/logout';
import { redirect, type Handle } from '@sveltejs/kit';

export const authenticate: Handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event);
	if (!event.locals.user && !event.request.url.includes('/login')) {
		logout(event);
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};

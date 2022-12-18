import { HttpRequestError } from '$lib/server/api';
import { authenticate } from '$lib/server/authenticate';
import { protectedRoutes } from '$lib/server/protectedRoutes';
import { error, redirect, type Handle } from '@sveltejs/kit';

// export const handle = sequence(authenticate, protectedRoutes);
export const handle: Handle = async ({ event, resolve }) => {
	try {
		event.locals.user = await authenticate(event);
		await protectedRoutes(event);
	} catch (err) {
		if (err instanceof HttpRequestError) {
			if (err.status == 401 && !event.url.pathname.includes('/login')) {
				throw redirect(303, `/login?redirect=${event.url.pathname}`);
			}
			if (err.status === 403) {
				throw error(403, 'Permission denied');
			}
		}
	}
	const response = await resolve(event);

	return response;
};

import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('auth');
	cookies.delete('refreshToken');
	// locals.user = undefined;
	throw redirect(301, '/');
};

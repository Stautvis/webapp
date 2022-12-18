import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, locals }) => {
	cookies.delete('auth', { path: '/' });
	// cookies.delete('refreshToken', { path: '/' });
	locals.user = undefined;
	throw redirect(301, '/');
};

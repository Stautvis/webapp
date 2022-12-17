import { error, redirect, type Handle } from '@sveltejs/kit';

enum UserRoles {
	ADMIN = 3,
	OWNER = 2,
	USER = 1
}

const PROTECTED_ROUTES: { [k: string]: UserRoles[] } = {
	'/dashboard': [UserRoles.ADMIN, UserRoles.OWNER]
};

export const protectedRoutes: Handle = async ({ event, resolve }) => {
	const { locals, url } = event;
	const { user } = locals;
	const { pathname } = url;

	if (isProtected(pathname)) {
		if (user === undefined) {
			throw redirect(303, `/login?redirect=${pathname}`);
		}
		if (!hasUserRole(user, pathname)) {
			throw error(403);
		}
	}

	const response = await resolve(event);
	return response;
};

const hasUserRole = (user: App.Locals['user'], pathname: string) => {
	const roles = getRoles(pathname);
	return roles.some((role) => user?.roles.includes(role));
};

const isProtected = (pathname: string) => {
	if (pathname === '/') return false;
	const keys = Object.keys(PROTECTED_ROUTES);
	return keys.some((key) => pathname.startsWith(key));
};

const getRoles = (pathname: string) => {
	const key = Object.keys(PROTECTED_ROUTES).find((key) => key.startsWith(pathname));
	if (key === undefined) return [];
	return PROTECTED_ROUTES[key];
};

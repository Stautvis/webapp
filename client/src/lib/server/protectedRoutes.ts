import { HttpRequestError } from '$lib/server/api';
import { redirect, type RequestEvent } from '@sveltejs/kit';

enum UserRoles {
	ADMIN = 3,
	OWNER = 2,
	USER = 1
}

const PROTECTED_ROUTES: { [k: string]: UserRoles[] } = {
	'/dashboard': [UserRoles.ADMIN, UserRoles.OWNER]
};

export const protectedRoutes = async (event: RequestEvent) => {
	const { locals, url } = event;
	const { pathname } = url;

	if (isProtected(pathname)) {
		if (event.locals.user === undefined) {
			throw redirect(303, `/login?redirect=${pathname}`);
		}
		if (!hasUserRole(locals.user, pathname)) {
			throw new HttpRequestError(403, 'Permission denied!');
		}
	}
};

const hasUserRole = (user: App.Locals['user'], pathname: string) => {
	const roles = getRoles(pathname);
	console.log('USER ROLES');
	const isAllowed = roles.some((role) => {
		const include = user?.roles.includes(role);
		console.log(role, include);
		return include;
	});
	console.log(isAllowed);
	return isAllowed;
};

const isProtected = (pathname: string) => {
	if (pathname === '/') return false;
	console.log('ROUTES');
	const keys = Object.keys(PROTECTED_ROUTES);
	const isAllowed = keys.some((key) => {
		const include = pathname.includes(key);
		console.log(include, pathname, key);
		return include;
	});
	console.log(isAllowed);
	return isAllowed;
};

const getRoles = (pathname: string) => {
	const key = Object.keys(PROTECTED_ROUTES).find((key) => key.startsWith(pathname));
	if (key === undefined) return [];
	return PROTECTED_ROUTES[key];
};

import { HttpRequestError } from '$lib/server/api';
import { type RequestEvent } from '@sveltejs/kit';

enum UserRoles {
	ADMIN = 3,
	OWNER = 2,
	USER = 1
}

const PROTECTED_ROUTES: { [k: string]: UserRoles[] } = {
	'/dashboard': [UserRoles.ADMIN, UserRoles.OWNER],
	'/settings': [UserRoles.USER]
};

export const protectedRoutes = async (event: RequestEvent) => {
	const { locals, url } = event;
	const { pathname } = url;

	if (isProtected(pathname)) {
		if (locals.user === undefined) {
			throw new HttpRequestError(401, `/login?redirect=${pathname}`);
		}
		if (!hasUserRole(locals.user, pathname)) {
			throw new HttpRequestError(403, 'Permission denied!');
		}
	}
};

const hasUserRole = (user: App.Locals['user'], pathname: string) => {
	const roles = getRoles(pathname);
	if (roles.length === 0) return false;
	const isAllowed = roles.some((role) => {
		const include = user?.roles.includes(role);
		return include;
	});
	return isAllowed;
};

const isProtected = (pathname: string) => {
	if (pathname === '/') return false;
	const keys = Object.keys(PROTECTED_ROUTES);
	const isAllowed = keys.some((key) => {
		const regex = RegExp(key);
		const include = regex.test(pathname);
		return include;
	});
	return isAllowed;
};

const getRoles = (pathname: string) => {
	const key = Object.keys(PROTECTED_ROUTES).find((key) => pathname.startsWith(key));
	if (key === undefined) return [];
	return PROTECTED_ROUTES[key];
};

import type { RequestEvent } from '@sveltejs/kit';

export const logout = (event: RequestEvent) => {
	const { cookies } = event;
	cookies.delete('auth');
	cookies.delete('refreshToken');
};

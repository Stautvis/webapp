import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ cookies }) => {
	cookies.delete('auth');
	cookies.delete('refreshToken');
	throw redirect(303, '/');
};

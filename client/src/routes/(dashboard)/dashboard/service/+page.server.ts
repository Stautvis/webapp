import { get } from '../../../../$lib/api.server';
import type { PageServerLoad } from './$types';

const HOST = import.meta.env.VITE_PUBLIC_BASE_PATH;

export const load: PageServerLoad = async ({ fetch }) => {
	const data = await get(fetch, '/company/14/service');
	console.log(data);
	return {
		services: data
	};
};

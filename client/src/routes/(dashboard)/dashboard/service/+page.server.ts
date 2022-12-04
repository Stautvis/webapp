import { get } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const services = (await get('/Company/2/Service', cookies)) as ArrayLike<{ id: number }>;
		return { services };
	} catch (err) {
		console.error(err);
	}
	return { services: [] };
};

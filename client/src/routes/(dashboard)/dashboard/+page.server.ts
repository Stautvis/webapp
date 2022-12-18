import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ parent }) => {
	await parent();
	return { services: [] };
};

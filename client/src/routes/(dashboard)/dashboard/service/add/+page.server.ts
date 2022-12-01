import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = ({ cookies }) => {
	return {
		token: cookies.get('session')
	};
};

// export const actions: Actions = {
// 	add: async ({ cookies, request, url }) => {
// 		const data = await request.formData();
// 		const title: string = data.get('title');

// 		if (title.length > 1) {
// 			return invalid(400, { title, missing: true });
// 		} else {
// 			throw redirect(303, '/dashboard/service');
// 		}
// 	}
// };

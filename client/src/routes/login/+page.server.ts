import { invalid, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { validateData } from '../../lib/utils/validateData';

const loginScheme = z.object({
	emailAddress: z.string({ required_error: 'Email address is required!' }).email(),
	password: z.string({ required_error: 'Password is required!' })
});

export const actions: Actions = {
	default: async ({ request }) => {
		const { data, errors } = await validateData(request.formData(), loginScheme);
		return invalid(300, { data, errors });
	}
};

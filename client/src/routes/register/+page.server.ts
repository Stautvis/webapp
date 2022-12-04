import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { post } from '../../lib/utils/api';
import { validateData } from '../../lib/utils/validateData';

export const registerScheme = z
	.object({
		emailAddress: z.string().min(1, { message: 'Email address is required!' }).email(),
		firstName: z
			.string()
			.min(1, 'First name is required!')
			.regex(/^[a-žA-Ž]+$/, { message: 'First name must contain only letters!' }),
		lastName: z
			.string()
			.min(1, 'Last name is required!')
			.regex(/^[a-žA-Ž]+$/, { message: 'Last name must contain only letters!' }),
		gender: z.string(),
		birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: 'Select date or enter in following format: yyyy-mm-dd'
		}),
		password: z
			.string({ required_error: 'Password is required!' })
			.min(6, { message: 'Password must be atleast 6 charecters lenght!' }),
		confirmPassword: z.string()
	})
	.superRefine((v, ctx) => {
		if (v.password !== v.confirmPassword) {
			ctx.addIssue({
				message: "Passwords don't match up!",
				path: ['confirmPassword'],
				code: z.ZodIssueCode.custom
			});
		}
	});

export const actions: Actions = {
	default: async ({ request }) => {
		const { data, errors } = await validateData(request.formData(), registerScheme);
		data.gender = parseInt(data.gender as string);

		if (Object.keys(errors).length > 0) return invalid(400, { data, errors });
		try {
			const token = await post('/user', data);
		} catch (err) {
			if (err instanceof ZodError) {
				return invalid(400, {
					data,
					errors: err.flatten().fieldErrors as { [x: string]: string[] }
				});
			}
		}
		throw redirect(301, '/');
	}
};

import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const registerScheme = zfd.formData({
	emailAddress: z.string().min(1, { message: 'Email address is required!' }).email(),
	firstName: z
		.string()
		.min(1, 'First name is required!')
		.regex(/^[a-žA-Ž]+$/, { message: 'First name must contain only letters!' }),
	lastName: z
		.string()
		.min(1, 'Last name is required!')
		.regex(/^[a-žA-Ž]+$/, { message: 'Last name must contain only letters!' }),
	gender: zfd.numeric(z.number().gt(-1, { message: 'Gender is required!' })),
	birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: 'Select date or enter in following format: yyyy-mm-dd'
	}),
	password: z
		.string({ required_error: 'Password is required!' })
		.min(6, { message: 'Password must be atleast 6 charecters lenght!' })
});

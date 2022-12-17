import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const loginSchema = zfd.formData({
	emailAddress: zfd.text(z.string().min(1, 'Email address is required!').email()),
	password: zfd.text(z.string().min(1, { message: 'Password is required!' }))
});

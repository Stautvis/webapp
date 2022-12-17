import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const serviceAddScheme = zfd.formData({
	title: z.string().min(1, { message: 'Title is required' })
});

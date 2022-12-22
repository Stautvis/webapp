import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const companyEditScheme = zfd.formData({
	title: z.string().min(1, { message: 'Title is required!' }),
	shortDescription: z.string().min(1, { message: 'Short description is required!' }),
	description: z.string().min(1, { message: 'Description is required!' }),
	image: z.string().url({ message: 'Enter valid URL address!' })
});

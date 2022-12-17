import type { ZodSchema } from 'zod';

export const validateForm = async (formData: Promise<FormData>, schema: ZodSchema) => {
	const body = Object.fromEntries(await formData) as { [k: string]: string | number };
	const result = schema.safeParse(body);

	if (!result.success) {
		return {
			data: body,
			errors: result.error.flatten().fieldErrors as { [x: string]: string[] }
		};
	} else {
		return {
			data: body,
			errors: {}
		};
	}
};

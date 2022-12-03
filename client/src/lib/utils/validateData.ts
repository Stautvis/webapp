import type { ZodSchema } from 'zod';

export const validateData = async (formData: Promise<FormData>, schema: ZodSchema) => {
	const body = Object.fromEntries(await formData);
	const result = schema.safeParse(body);

	console.log(body);

	if (!result.success) {
		return {
			data: body,
			errors: result.error.flatten().fieldErrors
		};
	} else {
		return {
			data: body,
			errors: null
		};
	}
};

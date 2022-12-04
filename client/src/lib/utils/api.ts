import type { Cookies } from '@sveltejs/kit';
import { z, ZodError, type ZodIssue } from 'zod';

const HOST = 'http://localhost:53124';

export class HttpRequestError extends Error {
	constructor(public status: number, public message: string) {
		super(message, { cause: status });
		this.name = 'HttpRequestError';
		this.stack = new Error().stack;
	}
}

export const post = async (
	url: string,
	body: Record<string, unknown> | null,
	cookies: Cookies | undefined
) => {
	const Authorization = cookies === undefined ? '' : cookies.get('Bearer') || '';
	const response = await fetch(HOST + url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization
		},
		body: JSON.stringify(body)
	});
	const { status } = response;
	const data = await returnData(response);
	console.log(status);
	if (isStatusOk(status)) return data;
	else {
		throwZodError(data, status);
	}
};

const isStatusOk = (status: number) => status > 199 && status < 300;

const returnData = async (response: Response) => {
	const contentType = response.headers.get('Content-Type');
	if (contentType?.includes('json')) {
		return (await response.json()) as Record<string, unknown>;
	}
	return await response.text();
};

const throwZodError = (
	data: Record<string, unknown> | string,
	status: number | undefined = undefined
) => {
	if (typeof data == 'string') throw new HttpRequestError(status || 400, data);

	const errors: ZodIssue[] = Object.keys(data)
		.filter((key) => data[key] !== null)
		.map((key) => ({
			path: [key as string],
			code: z.ZodIssueCode.custom,
			message: data[key] as string
		}));
	throw new ZodError(errors);
};

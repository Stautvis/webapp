import type { Cookies } from '@sveltejs/kit';
import { z, ZodError, type ZodIssue } from 'zod';

const HOST = 'http://localhost:53124';

type RequestReturn = string | Record<string, unknown> | unknown[] | undefined;
type GetRequest = (url: string, cookies: Cookies | undefined) => Promise<RequestReturn>;
type PostRequest = (
	url: string,
	body: Record<string, unknown> | null,
	cookies?: Cookies
) => Promise<RequestReturn>;

export class HttpRequestError extends Error {
	constructor(public status: number, public message: string) {
		super(message, { cause: status });
		this.name = 'HttpRequestError';
		this.stack = new Error().stack;
	}
}

const configureHeaders = (cookies: Cookies | undefined) => {
	const Authorization = cookies === undefined ? '' : cookies.get('Bearer') || '';

	return {
		'Content-Type': 'application/json',
		Authorization
	};
};

const response = async (response: Response) => {
	const { status } = response;
	const data = await returnData(response);
	if (isStatusOk(status)) return data;
	else {
		throwZodError(data, status);
	}
};

const isStatusOk = (status: number) => status > 199 && status < 300;

const returnData = async (response: Response) => {
	const contentType = response.headers.get('Content-Type') || '';
	if (contentType.includes('json')) {
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

// Methods ----------------------------------------------------------------------------------------

export const get: GetRequest = async (url, cookies = undefined) => {
	const res = await fetch(HOST + url, {
		method: 'GET',
		headers: configureHeaders(cookies)
	});
	return response(res);
};

export const post: PostRequest = async (url, body, cookies = undefined) => {
	const res = await fetch(HOST + url, {
		method: 'POST',
		headers: configureHeaders(cookies),
		body: JSON.stringify(body)
	});
	return response(res);
};

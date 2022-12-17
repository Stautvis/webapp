import { API_HOST } from '$env/static/private';
import type { Cookies, RequestEvent } from '@sveltejs/kit';
import { ZodError, z, type ZodIssue } from 'zod';

type BodyType = Record<string, unknown> | null;
type Api = <T>(method: string, url: string, body: BodyType, cookies: Cookies) => Promise<T>;

class HttpRequestError extends Error {
	constructor(public status: number, public message: string) {
		super(message, { cause: status });
		this.name = 'HttpRequestError';
		this.stack = new Error().stack;
	}
}

const response = async (response: Response) => {
	const { status } = response;
	const data = await returnData(response);
	if (isStatusOk(status)) return data;
	else {
		throwZodError(data, status);
	}
};

const returnData = async (response: Response) => {
	const contentType = response.headers.get('Content-Type') || '';
	if (contentType.includes('json')) {
		return await response.json();
	}
	return await response.text();
};

const throwZodError = (
	data: string | Record<string, unknown>,
	status: number | undefined = undefined
) => {
	if (typeof data == 'string') throw new HttpRequestError(status || 400, data);
	if (status === 401) throw new HttpRequestError(status, 'Unauthorized!');
	if (status === 403) throw new HttpRequestError(status, 'Permission denied!');

	const errors: ZodIssue[] = Object.keys(data)
		.filter((key) => data[key] !== null)
		.map((key) => ({
			path: [key as string],
			code: z.ZodIssueCode.custom,
			message: data[key] as string
		}));
	throw new ZodError(errors);
};

const api: Api = async (method, url, body, cookies) => {
	const res = await fetch(API_HOST + url, {
		method: 'POST',
		headers: configureHeaders(cookies),
		body: JSON.stringify(body),
		credentials: 'include'
	});
	return response(res);
};

// Methods ----------------------------------------------------------------------------------------

export default {
	get: <T>(event: RequestEvent, url: string) => api<T>('GET', url, null, event.cookies),
	post: (event: RequestEvent, url: string, body: BodyType) => api('POST', url, body, event.cookies),
	patch: (event: RequestEvent, url: string, body: BodyType) =>
		api('PATCH', url, body, event.cookies),
	delete: (event: RequestEvent, url: string, body: BodyType) =>
		api('DELETE', url, body, event.cookies),
	put: (event: RequestEvent, url: string, body: BodyType) => api('PUT', url, body, event.cookies)
};

const isStatusOk = (status: number) => status > 199 && status < 300;

const configureHeaders = (cookies: Cookies | undefined) => {
	const Authorization = cookies === undefined ? '' : `Bearer ${cookies.get('auth')}` || '';

	return {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
		'Access-Control-Allow-Origin': '*',
		Authorization
	};
};

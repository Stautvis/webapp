import { API_HOST } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import setCookie from 'set-cookie-parser';
import { ZodError, z, type ZodIssue } from 'zod';

type BodyType = Record<string, unknown> | null | undefined;
type Api = <T>(method: string, url: string, body: BodyType, cookies: RequestEvent) => Promise<T>;

export class HttpRequestError extends Error {
	constructor(public status: number, public message: string) {
		super(message, { cause: status });
		this.name = 'HttpRequestError';
		this.stack = new Error().stack;
	}
}

const response = async (response: Response) => {
	const { status } = response;
	const data = await returnData(response);
	if (isStatusOk(status)) {
		return data;
	} else {
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

const api: Api = async (method, url, body, event) => {
	const res = await fetch(API_HOST + url, {
		method,
		headers: configureHeaders(event, url),
		body: JSON.stringify(body),
		credentials: 'include'
	});
	if (res.url.includes('refreshToken') || res.url.includes('login')) {
		await configureCookies(event, res);
	}
	return response(res);
};

const configureCookies = async (event: RequestEvent, response: Response) => {
	const responseCookie = response.headers.get('Set-Cookie');
	if (responseCookie !== null) {
		const refreshToken = setCookie.parse(responseCookie, { map: true })['refreshToken'];
		if (refreshToken) {
			event.cookies.set('refreshToken', refreshToken.value);

			event.cookies.set('auth', await response.text(), { path: '/' });
		}
	}
};

// Methods ----------------------------------------------------------------------------------------

export default {
	get: <T>(event: RequestEvent, url: string) => api<T>('GET', url, undefined, event),
	post: <T>(event: RequestEvent, url: string, body: BodyType) => api<T>('POST', url, body, event),
	patch: <T>(event: RequestEvent, url: string, body: BodyType) => <T>api('PATCH', url, body, event),
	delete: <T>(event: RequestEvent, url: string, body: BodyType) =>
		<T>api('DELETE', url, body, event),
	put: <T>(event: RequestEvent, url: string, body: BodyType) => api<T>('PUT', url, body, event)
};

const isStatusOk = (status: number) => status > 199 && status < 300;

const configureHeaders = (event: RequestEvent, url: string) => {
	const { cookies } = event;
	const Authorization = cookies === undefined ? '' : `Bearer ${cookies.get('auth')}` || '';

	return {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
		'Access-Control-Allow-Origin': API_HOST,
		'Access-Control-Allow-Headers': 'Content-Type, *',
		// 'Set-Cookie': `"refreshToken=${cookies.get(
		// 	'refreshToken'
		// )}; Domain=localhost; Path=/; HttpOnly`,
		Authorization: Authorization
	};
};

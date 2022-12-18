import api from '$lib/server/api';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const { cookies, locals, url, params } = event;
	await api.delete(
		event,
		`/company/${locals.user?.companyID}/service/${params.serviceId}`,
		undefined
	);
	throw redirect(301, '/dashboard/service');
};

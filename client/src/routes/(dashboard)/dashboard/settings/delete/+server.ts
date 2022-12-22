import api from '$lib/server/api';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	await api.delete(event, `/company/${event.locals.user?.companyID}`, null);
	throw redirect(301, '/');
};

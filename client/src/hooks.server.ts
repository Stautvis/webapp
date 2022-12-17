import { authenticate } from '$lib/server/authenticate';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authenticate);

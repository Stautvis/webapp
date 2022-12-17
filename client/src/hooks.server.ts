import { authenticate } from '$lib/server/authenticate';
import { protectedRoutes } from '$lib/server/protectedRoutes';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authenticate, protectedRoutes);

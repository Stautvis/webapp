// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}

	interface IUser {
		id: number;
		firstName: string;
		lastName: string;
		roles: UserRoles[];
	}

	enum UserRoles {
		ADMIN = 3,
		OWNER = 2,
		USER = 1
	}

	interface Layout {
		size: 'xs' | 'sm' | 'default' | 'md' | 'lg';
	}

	interface Locals {
		user?: IUser;
	}
	// interface PageData {}
	// interface Platform {}
}

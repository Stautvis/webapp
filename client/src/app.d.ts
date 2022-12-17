// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Layout {
		size: 'xs' | 'sm' | 'default' | 'md' | 'lg';
	}
	interface Locals {
		user?: IUser;
	}
	// interface PageData {}
	// interface Platform {}

	interface IUser {
		id: number;
	}
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}

	interface IUser {
		id: number;
		firstName: string;
		lastName: string;
		emailAddress: string;
		gender: boolean;
		profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg';
		birthday: Date;
		roles: UserRoles[];
		companyID: number;
	}

	interface IService {
		id: number;
		title: string;
		company: ICompany;
		image: string;
		description: string;
		shortDescription: string;
	}

	interface ICompany {
		id: number;
		title: string;
		employees?: IUser[];
		image: string;
		description: string;
		shortDescription: string;
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
		company?: ICompany;
	}
	// interface PageData {}
	// interface Platform {}
}

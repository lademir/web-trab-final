export type SignInDtoOut = {
	email: string;
	id: string;
	name: string;
	roles: string[];
	access_token: string;
};

export type SignInDtoIn = {
	email: string;
	password: string;
};

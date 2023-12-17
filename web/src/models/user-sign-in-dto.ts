export type SignInDtoOut = {
	email: string;
	sub: string;
	name: string;
	roles: string[];
	access_token: string;
};

export type SignInDtoIn = {
	email: string;
	password: string;
};

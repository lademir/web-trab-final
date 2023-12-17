import { User } from "@/models/user";
import { SignInDtoOut } from "@/models/user-sign-in-dto";
import { createStore } from "zustand";

interface Actions {
	login: (userSignInOut: SignInDtoOut) => void;
	reset: () => void;
}

export const UserStore = createStore<
	User & { auth: boolean; access_token: string } & Actions
>((set) => ({
	id: "",
	name: "",
	email: "",
	roles: [],
	access_token: "",
	auth: false,

	login: (userSignInOut: SignInDtoOut) => {
		set({
			auth: true,
			id: userSignInOut.sub,
			name: userSignInOut.name,
			email: userSignInOut.email,
			roles: userSignInOut.roles,
		});
		// salvar token no localstorage
	},

	reset: () => {
		set({
			id: "",
			name: "",
			email: "",
			roles: [],
			access_token: "",
			auth: false,
		});
		// remover token do localstorage
	},
}));

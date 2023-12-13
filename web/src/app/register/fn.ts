"use server";

import { api } from "@/lib/axios";
import { SetStateUserStore } from "../login/fn";
import { cookies } from "next/headers";

export type SignUpDtoIn = {
	name: string;
	email: string;
	password: string;
};

export type SignUpDtoOut = {
	email: string;
	id: string;
	name: string;
	roles: string[];
	access_token: string;
};

export async function SignUp(signUpDto: SignUpDtoIn) {
	try {
		const response = await api.post<SignUpDtoOut>("/users", signUpDto);
		console.log(response.data);

		const cookiesStore = cookies();
		cookiesStore.set("access_token", response.data.access_token, {
			path: "/",
			maxAge: 24 * 60 * 60 * 30, // 1 day
		});

		SetStateUserStore(response.data);

		return response.data;
	} catch (error) {
		throw error;
	}
}

"use server";

import { api } from "@/lib/axios";
import { UserStore } from "@/lib/state/user-store";
import { SignInDtoIn, SignInDtoOut } from "@/models/user-sign-in-dto";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function login(singInDtoIn: SignInDtoIn): Promise<SignInDtoOut> {
	try {
		const response = await api.post<SignInDtoOut>("/auth/login", singInDtoIn);
		// console.log(response.data.access_token);

		const cookiesStore = cookies();
		cookiesStore.set("access_token", response.data.access_token, {
			path: "/",
			maxAge: 24 * 60 * 60 * 30, // 1 day
			sameSite: "strict",
		});

		SetStateUserStore(response.data);

		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function logout() {
	try {
		cookies().delete("access_token");
		UserStore.getState().reset();
		// window.location.href = "/login";
	} catch (error) {
		throw error;
	}
}

export async function SetStateUserStore(user: SignInDtoOut) {
	UserStore.setState((state) => ({
		id: user.sub,
		name: user.name,
		email: user.email,
		roles: user.roles,
		access_token: user.access_token,
		auth: true,
	}));
}

export async function SetStateFromJwt() {
	// console.log("SetStateFromJwt");
	const jwt = cookies().get("access_token");
	// console.log(jwt?.value);
	if (jwt) {
		const user = jwtDecode(jwt.value) as SignInDtoOut;
		// console.log(user);
		SetStateUserStore(user);
	}
}

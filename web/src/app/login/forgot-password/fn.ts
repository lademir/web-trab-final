"use server";

import { api } from "@/lib/axios";

interface ForgotPasswordProps {
	email: string;
	newPassword: string;
}

export async function forgotPassword({
	email,
	newPassword,
}: ForgotPasswordProps) {
	try {
		const res = await api.put("/users/changepassword", {
			email,
			newPassword,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

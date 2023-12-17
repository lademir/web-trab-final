"use server";

import { api } from "@/lib/axios";

interface UpdateUserProps {
	name: string;
	email: string;
	password: string;
	id: string;
}

export async function updateUser(data: UpdateUserProps) {
	try {
		const res = await api.put("/users/updateuser", data);
		return res.data;
		// atualizar os cookies
	} catch (error) {
		throw error;
	}
}

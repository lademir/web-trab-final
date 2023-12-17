import { api } from "@/lib/axios";

interface GetAllUserResponse {
	name: string;
	email: string;
	id: number;
}

export async function getAllUsers() {
	try {
		const res = await api.get<GetAllUserResponse[]>("/admin/getallusers");
		return res.data;
	} catch (error) {
		throw error;
	}
}

interface CreateStudentDtoIn {
	id: number;
}

interface CreateStudentDtoOut {}

export async function createStudent({ id }: CreateStudentDtoIn) {
	try {
		const res = await api.post("/admin/adduser", { id });
		return res.data;
	} catch (error) {
		throw error;
	}
}

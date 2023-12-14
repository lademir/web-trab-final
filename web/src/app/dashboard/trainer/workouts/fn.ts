import { api } from "@/lib/axios";

interface GetAllStudentsResponse {
	name: string;
	email: string;
	id: number;
}

export async function getAllStudents() {
	try {
		const res = await api.get<GetAllStudentsResponse[]>(
			"/admin/getallstudents"
		);
		return res.data;
	} catch (error) {
		throw error;
	}
}

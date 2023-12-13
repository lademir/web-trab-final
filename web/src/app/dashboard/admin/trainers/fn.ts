import { api } from "@/lib/axios";

interface GetNonTrainersResponse {
	id: number;
	name: string;
}

export async function getNonTrainers() {
	try {
		const response = await api.get<GetNonTrainersResponse[]>(
			"/admin/addtrainer"
		);
		const nonTrainers = response.data;
		return nonTrainers;
	} catch (error) {
		throw error;
	}
}

export async function addTrainer(id: number) {
	try {
		const res = await api.post("/admin/addtrainer", { id });
		console.log(res);
		return res.data;
	} catch (error) {
		throw error;
	}
}

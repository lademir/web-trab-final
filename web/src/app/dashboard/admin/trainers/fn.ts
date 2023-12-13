import { api } from "@/lib/axios";

interface GetTrainersResponse {
	id: number;
	name: string;
	email: string;
}

export async function getNonTrainers() {
	try {
		const response = await api.get<GetTrainersResponse[]>("/admin/addtrainer");
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

export async function removeTrainer(id: number) {
	try {
		const res = await api.delete("/admin/removetrainer", { data: { id } });
		// console.log(res);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function getTrainers() {
	try {
		const response = await api.get<GetTrainersResponse[]>(
			"/admin/getalltrainers"
		);
		const trainers = response.data;
		return trainers;
	} catch (error) {
		throw error;
	}
}

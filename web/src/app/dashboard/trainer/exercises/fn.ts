"use server";

import { api } from "@/lib/axios";

interface GetAllExercisesResponse {
	id: string;
	name: string;
	description?: string;
}

export async function getAllExercises() {
	try {
		const res = await api.get<GetAllExercisesResponse[]>(
			"/trainer/getallexercises"
		);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function createExercise({
	name,
	description,
}: {
	name: string;
	description?: string;
}) {
	try {
		const res = await api.post("/trainer/createexercise", {
			name,
			description,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function deleteExercise(exerciseId: string) {
	try {
		const res = await api.delete(`/trainer/deleteexercise`, {
			data: {
				exerciseId,
			},
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

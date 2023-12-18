"use server";

import { api } from "@/lib/axios";

interface WorkoutLogResponse {
	createdAt: string;
	Workout: {
		name: string;
		id: number;
	};
}

export async function getWorkoutLog({ studentId }: { studentId: string }) {
	try {
		const res = await api.get<WorkoutLogResponse[]>(`/student/getworkoutlog`, {
			data: {
				studentId,
			},
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

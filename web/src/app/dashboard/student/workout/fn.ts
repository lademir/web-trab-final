"use server";

import { api } from "@/lib/axios";

interface InitWorkoutProps {
	studentId: string;
	workoutId: string;
}

export async function initWorkout({ studentId, workoutId }: InitWorkoutProps) {
	try {
		const res = await api.post("/student/initworkout", {
			studentId,
			workoutId,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

import { api } from "@/lib/axios";

type exercise = {
	reps: number;
	series: number;
	weight: number;
	exercise: {
		name: string;
		description?: string;
	};
};
type GetAllStudentWorkoutsResponse = {
	name: string;
	id: string;
	Exercises: exercise[];
};

export async function getAllStudentWorkouts(studentId: string) {
	try {
		const res = await api.get<GetAllStudentWorkoutsResponse[]>(
			"/trainer/getstudentworkouts",
			{
				data: {
					studentId,
				},
			}
		);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function getAllExercises() {
	try {
		const res = await api.get<{ name: string; id: string }[]>(
			"/trainer/getallexercises"
		);
		return res.data;
	} catch (error) {
		throw error;
	}
}

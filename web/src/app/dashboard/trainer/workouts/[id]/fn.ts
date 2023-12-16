import { api } from "@/lib/axios";

type exercise = {
	reps: number;
	series: number;
	weight: number;
	rest: number;
	exercise: {
		name: string;
		description?: string;
	};
};

type CreateWorkoutExercise = {
	reps: number;
	series: number;
	weight: number;
	rest: number;
	id: string;
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

export async function createWorkout({
	name,
	studentId,
	exercise,
}: {
	name: string;
	studentId: string;
	exercise: CreateWorkoutExercise[];
}) {
	try {
		const res = await api.post("/trainer/createworkout", {
			name,
			studentId,
			exercises: exercise,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function deleteWorkout(workoutId: string) {
	try {
		const res = await api.delete("/trainer/deleteworkout", {
			data: {
				workoutId,
			},
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

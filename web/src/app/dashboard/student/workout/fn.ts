"use server";

import { api } from "@/lib/axios";
import { cookies } from "next/headers";

interface InitWorkoutProps {
	studentId: string;
	workoutId: string;
}

// {
//     "Workout": {
//       "name": "teste1",
//       "id": 1,
//       "Exercises": [
//         {
//           "reps": 5,
//           "series": 3,
//           "weight": 1,
//           "rest": 1,
//           "exercise": {
//             "name": "ex1",
//             "description": ""
//           }
//         },
//         {
//           "reps": 4,
//           "series": 4,
//           "weight": 1,
//           "rest": 1,
//           "exercise": {
//             "name": "ex1",
//             "description": ""
//           }
//         }
//       ]
//     }
//   }

interface InitWorkoutResponse {
	Workout: {
		name: string;
		id: number;
		Exercises: {
			reps: number;
			series: number;
			weight: number;
			rest: number;
			exercise: {
				name: string;
				description: string;
			};
		}[];
	};
}

export interface FormattedWorkout {
	name: string;
	id: number;
	exercises: {
		reps: number;
		series: number;
		weight: number;
		rest: number;
		exercise: string;
		done: number;
	}[];
}

const formatWorkout = (workout: InitWorkoutResponse) => {
	const exercises = workout.Workout.Exercises.map((exercise) => {
		return {
			reps: exercise.reps,
			series: exercise.series,
			weight: exercise.weight,
			rest: exercise.rest,
			exercise: exercise.exercise.name,
			done: 0,
		};
	});

	return {
		name: workout.Workout.name,
		id: workout.Workout.id,
		exercises,
	};
};

export async function initWorkout({ studentId, workoutId }: InitWorkoutProps) {
	try {
		const res = await api.post<InitWorkoutResponse>("/student/initworkout", {
			studentId,
			workoutId,
		});

		const cookiesStore = cookies();
		const formattedWork = formatWorkout(res.data);
		cookiesStore.set("workoutStarted", JSON.stringify(formattedWork));
		return formattedWork;
	} catch (error) {
		throw error;
	}
}

export async function getWorkoutStarted() {
	const cookiesStore = cookies();
	const workoutStarted = cookiesStore.get("workoutStarted");
	if (workoutStarted) {
		return JSON.parse(workoutStarted.value) as FormattedWorkout;
	}
	return null;
}

export async function finishWorkout() {
	const cookiesStore = cookies();
	cookiesStore.delete("workoutStarted");
}

export async function updateWorkoutStarted(workout: FormattedWorkout) {
	const cookiesStore = cookies();
	cookiesStore.set("workoutStarted", JSON.stringify(workout));
	return workout;
}

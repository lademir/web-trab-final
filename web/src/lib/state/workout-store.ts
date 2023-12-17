import { FormattedWorkout } from "@/app/dashboard/student/workout/fn";
import { createStore } from "zustand";

interface Actions {
	set: (workout: FormattedWorkout) => void;
	reset: () => void;
	update: (exercise: string, done: number) => void;
}

export const WorkoutStore = createStore<FormattedWorkout & Actions>((set) => ({
	name: "",
	id: 0,
	exercises: [],

	set: (workout: FormattedWorkout) => {
		set(workout);
	},

	reset: () => {
		set({
			name: "",
			id: 0,
			exercises: [],
		});
	},

	update: (exercise: string, done: number) => {
		set((state) => {
			const exercises = state.exercises.map((ex) => {
				if (ex.exercise === exercise) {
					return {
						...ex,
						done,
					};
				}
				return ex;
			});
			return {
				...state,
				exercises,
			};
		});
	},
}));

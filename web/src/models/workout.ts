import { Exercise } from "./exercise";

export type WorkoutStudent = Workout & {
	start: Date | null;
	end: Date | null;
	studentId: string;
};

export type Workout = {
	id: string;
	name: string;
	description: string;
	exercises: Exercise[];
};

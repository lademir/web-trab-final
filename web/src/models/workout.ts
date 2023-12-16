export type exercise = {
	reps: number;
	series: number;
	weight: number;
	rest: number;
	exercise: {
		name: string;
		description?: string;
	};
};
export type Workout = {
	name: string;
	id: string;
	Exercises: exercise[];
};

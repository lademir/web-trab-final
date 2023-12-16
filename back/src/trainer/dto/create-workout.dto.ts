type Exercise = {
  id: string;
  reps: number;
  weight: number;
  series: number;
  rest: number;
};

export type CreateWorkoutDto = {
  name: string;
  studentId: string;
  exercises: Exercise[];
};

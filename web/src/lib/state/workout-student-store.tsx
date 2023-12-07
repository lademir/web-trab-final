import { WorkoutStudent } from "@/models/workout";
import { create } from "zustand";

type Actions = {
    setStart: (workoutStudent: WorkoutStudent) => void,
    setEnd: (end: Date) => void,
};

export const workoutStore = create<WorkoutStudent & Actions>((set) => ({
    start: null,
    end: null,
    id: "",
    name: "",
    description: "",
    exercises: [],
    studentId: "",


    setStart: (workoutStudent: WorkoutStudent) => set({ ...workoutStudent }),
    setEnd: (end: Date) => set({ end }),
}));
import { WorkoutCard } from "@/app/dashboard/workout/[id]/workout-card";
import { Button } from "@/components/ui/button";

import { Workout } from "@/models/workout";

interface WorkoutDetailsProps {
    workout: Workout;
}

export const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
    const tag = workout.name[workout.name.length - 1];
    return (
        <div>
            <span className="flex items-center text-center gap-x-4 mb-4">
                <h1 className="text-3xl font-bold">{workout.name}</h1>
            </span>
            <WorkoutCard>
                <div className="flex flex-col gap-y-4">
                    {workout.Exercises.map((exercise, index) => (
                        <div key={index} className="flex flex-col hover:bg-slate-900 p-2 rounded transition duration-200 ease-in-out">
                            <span className="flex items-center gap-x-4">
                                <h3 className="text-xl font-semibold">{exercise.exercise.name}</h3>
                                -
                                <h4 className="text-xl font-semibold">{exercise.series}x{exercise.reps}</h4>
                            </span>
                            <span className="flex items-center gap-x-4">
                                <span className="text-sm text-gray-500">Peso</span>
                                <span className="text-sm text-gray-500">Descanso</span>
                            </span>
                            <span className="flex items-center gap-x-4">
                                <span className="text-xl font-semibold">{exercise.weight}kg</span>
                                <span className="text-xl font-semibold">{exercise.rest}s</span>
                            </span>
                        </div>
                    ))}
                    {/* <Button variant={"secondary"}>
                        Editar
                    </Button> */}
                </div>
            </WorkoutCard>
        </div>
    );
};
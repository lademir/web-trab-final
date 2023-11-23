import { Button } from "@/components/ui/button";
import { WorkoutCard } from "./workout-card";

interface Props {
    params: {
        id: string;
    };
}

const mockWorkout = {
    name: "Treino e Triceps",
    tag: "A",
    exercises: [
        {
            name: "Supino reto",
            sets: 3,
            reps: 10,
            rest: 60,
            weight: 50,
        },
        {
            name: "Agachamento",
            sets: 4,
            reps: 8,
            rest: 90,
            weight: 80,
        },
        {
            name: "Rosca direta",
            sets: 3,
            reps: 12,
            rest: 45,
            weight: 30,
        },
    ]
};

export default function WorkoutPage({ params }: Props) {
    return (
        <main className="items-center flex flex-col">
            <span className="flex items-center text-center gap-x-4 mb-4">
                <h1 className="text-3xl font-bold">{mockWorkout.name}</h1>
                -
                <h2 className="text-3xl font-semibold">{mockWorkout.tag}</h2>
            </span>
            <WorkoutCard>
                <div className="flex flex-col gap-y-4">
                    {mockWorkout.exercises.map((exercise, index) => (
                        <div key={index} className="flex flex-col hover:bg-slate-900 p-2 rounded transition duration-200 ease-in-out">
                            <span className="flex items-center gap-x-4">
                                <h3 className="text-xl font-semibold">{exercise.name}</h3>
                                -
                                <h4 className="text-xl font-semibold">{exercise.sets}x{exercise.reps}</h4>
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
                    <Button>
                        Iniciar
                    </Button>
                    <Button variant={"secondary"}>
                        Editar
                    </Button>
                </div>
            </WorkoutCard>
        </main>
    );
}
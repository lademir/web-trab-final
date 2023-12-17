'use client';

import { Button } from "@/components/ui/button";
import { FormattedWorkout, finishWorkout, updateWorkoutStarted } from "../fn";
import { useRouter } from "next/navigation";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { WorkoutCard } from "@/app/dashboard/workout/[id]/workout-card";
import { useEffect, useState } from "react";
import { WorkoutStore } from "@/lib/state/workout-store";



interface Props {
    workout: FormattedWorkout;

}

export const ShowWorkout = ({ workout }: Props) => {
    const [actualWorkout, setActualWorkout] = useState(workout);
    const router = useRouter();
    const [isCountDownPlaying, setIsCountDownPlaying] = useState(-1);
    const [key, setKey] = useState(0);

    const handleFinishWorkout = () => {
        finishWorkout();
        router.push('/dashboard/student/workout');
    };

    const handleFinishExercise = async (exerciseId: string) => {

        setIsCountDownPlaying(-1);
        setKey(key + 1);
        const newWorkout = await updateWorkoutStarted({
            ...actualWorkout,
            exercises: actualWorkout.exercises.map((exercise, index) => {
                if (index == parseInt(exerciseId)) {
                    return {
                        ...exercise,
                        done: exercise.done + 1
                    };
                }
                return exercise;
            })
        });
        setActualWorkout(newWorkout);
        // updateWorkoutStarted({
        //     ...actualWorkout,
        //     exercises: actualWorkout.exercises.map((exercise, index) => {
        //         if (index == parseInt(exerciseId)) {
        //             return {
        //                 ...exercise,
        //                 done: exercise.done + 1
        //             };
        //         }
        //         return exercise;
        //     })
        // })
    };

    return (
        <div className="flex flex-col">
            {/* {JSON.stringify(workout)} */}
            <div>
                <span className="flex items-center text-center gap-x-4 mb-4">
                    <h1 className="text-3xl font-bold">{actualWorkout.name}</h1>
                </span>
                <WorkoutCard>
                    <div className="flex flex-col gap-y-4">
                        {actualWorkout.exercises.map((exercise, index) => (
                            <div key={index} className={`flex justify-between items-center hover:bg-slate-700 p-2 rounded transition duration-200 ease-in-out ${exercise.done == exercise.reps ? 'bg-green-600 hover:bg-green-600' : ''}`}>
                                <div className="flex flex-col">
                                    <span className="flex items-center gap-x-4">
                                        <h3 className="text-xl font-semibold">{exercise.exercise}</h3>
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
                                <Button disabled={exercise.done == exercise.reps} onClick={() => setIsCountDownPlaying(index)}>
                                    {
                                        isCountDownPlaying == index ? 'Pausar' : 'Iniciar'
                                    }
                                </Button>
                                <CountdownCircleTimer key={key}
                                    isPlaying={isCountDownPlaying == index}
                                    duration={exercise.rest + 5}
                                    initialRemainingTime={exercise.rest + 5}

                                    onComplete={() => {
                                        handleFinishExercise(index.toString());
                                    }}
                                    colors={['#94a3b8', '#94a3b8', '#94a3b8', '#A30000', '#A30000']}
                                    colorsTime={[7, 5, 4, 2, 0]}>
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                            </div>
                        ))}
                        {/* <Button variant={"secondary"}>
                        Editar
                    </Button> */}
                    </div>
                    <Button className="w-full mt-5" onClick={handleFinishWorkout}>
                        Finalizar treino
                    </Button>
                </WorkoutCard>
            </div>
        </div>
    );
};
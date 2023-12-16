"use client";
import { Input } from "@/components/ui/input";
import { createWorkout, getAllExercises } from "./fn";
import { ComboboxDemo } from "./exercise-combobox";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface IdName {
    id: string;
    name: string;

}

interface CreateWorkoutFormProps {
    exercises: IdName[];
    studentId: string;
}

interface FormValues {
    workout: {
        name: string;
        exercise: {
            id: string;
            series: number;
            reps: number;
            weight: number;
            rest: number;
        }[];
    };
}

export const CreateWorkoutForm = ({ exercises, studentId }: CreateWorkoutFormProps) => {
    const [selectedExercises, setSelectedExercises] = useState<IdName[]>([]);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const { toast } = useToast();

    const onSubmit = async (data: FormValues) => {
        try {
            await createWorkout({
                ...data.workout,
                studentId,

            });
            router.refresh();
            toast({
                title: "Treino criado com sucesso",
            });
        } catch (error) {
            toast({
                title: "Erro ao criar treino",
                variant: "destructive"
            });
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Nome do treino" {...register("workout.name", {
                required: 'Nome do treino obrigatório',
            })} />
            {
                <span className="text-red-500 text-xs">{errors?.workout?.name?.message?.toString()}</span>
            }

            <div className="flex flex-1 my-10 justify-center w-full">
                <Command className="">
                    <CommandInput placeholder="Escolhe o exercício" onValueChange={(val) => val.length > 0 ? setOpen(true) : setOpen(false)} />
                    {
                        open ?
                            <>
                                <CommandEmpty>Nenhum encontrado</CommandEmpty>
                                <CommandGroup >
                                    {exercises.map((framework) => (
                                        <CommandItem
                                            key={framework.id}
                                            value={framework.id}
                                            onSelect={(currentValue) => {
                                                setSelectedExercises([...selectedExercises, framework]);
                                                setOpen(false);
                                            }}
                                        >

                                            {framework.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </> : <></>
                    }

                </Command>
            </div>

            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                    <tr className="rou">
                        <th className="py-2 px-4">Exercício</th>
                        <th className="py-2 px-4">Séries</th>
                        <th className="py-2 px-4">Repetições</th>
                        <th className="py-2 px-4">Peso</th>
                        <th className="py-2 px-4">Descanso (segs)</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedExercises.map((exercise, index) => (
                        <tr key={index} className="bg-slate-700 text-slate-500">
                            <td className="py-2 px-4">
                                <Input
                                    value={exercise.name} // Exibe o nome do exercício
                                    disabled
                                />
                                <input
                                    type="hidden"
                                    {...register(`workout.exercise.${index}.id`, { value: exercise.id })}
                                    value={exercise.id} // Envia o ID ao React Hook Form
                                />
                            </td>
                            <td className="py-2 px-4">
                                <Input type="number" defaultValue={1} min={1} placeholder="Séries" {...register(`workout.exercise.${index}.series`)} />
                            </td>
                            <td className="py-2 px-4">
                                <Input type="number" defaultValue={1} min={1} placeholder="Repetições" {...register(`workout.exercise.${index}.reps`)} />
                            </td>
                            <td className="py-2 px-4">
                                <Input type="number" defaultValue={1} min={1} placeholder="Peso" {...register(`workout.exercise.${index}.weight`)} />
                            </td>
                            <td className="py-2 px-4">
                                <Input type="number" defaultValue={1} min={1} placeholder="Descanso" {...register(`workout.exercise.${index}.rest`)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button>Salvar treino</Button>
        </form>
    );
};
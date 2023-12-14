"use client";
import { Input } from "@/components/ui/input";
import { getAllExercises } from "./fn";
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

interface IdName {
    id: string;
    name: string;

}

interface CreateWorkoutFormProps {
    exercises: IdName[];
}

export const CreateWorkoutForm = ({ exercises }: CreateWorkoutFormProps) => {
    const [selectedExercises, setSelectedExercises] = useState<IdName[]>([]);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
    // console.log(errors?.workout?.name?.message);
    // console.log(JSON.stringify(errors));
    return (
        <form onSubmit={handleSubmit((val) => console.log(val))}>
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
                {/* <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            Escolha o exercicio
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full flex p-0">
                        <Command className="">
                            <CommandInput placeholder="Escolhe o exercício" />
                            <CommandEmpty>Nenhum encontrado</CommandEmpty>
                            <CommandGroup>
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
                        </Command>
                    </PopoverContent>
                </Popover> */}
            </div>

            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">Exercício</th>
                        <th className="py-2 px-4">Séries</th>
                        <th className="py-2 px-4">Repetições</th>
                        <th className="py-2 px-4">Peso</th>
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
                                <Input type="number" min={1} placeholder="Séries" {...register(`workout.exercise.${index}.series`)} />
                            </td>
                            <td className="py-2 px-4">
                                <Input type="number" min={1} placeholder="Repetições" {...register(`workout.exercise.${index}.reps`)} />
                            </td>
                            <td className="py-2 px-4">
                                <Input type="number" min={1} placeholder="Peso" {...register(`workout.exercise.${index}.weight`)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button>Salvar treino</Button>
        </form>
    );
};
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createExercise } from "./fn";

interface FormValues {
    name: string;
    description: string;
}

export const CreateExerciseForm = () => {

    const { handleSubmit, register, formState: { errors } } = useForm<FormValues>();
    const router = useRouter();
    const { toast } = useToast();

    const onSubmit = async (data: FormValues) => {
        try {
            await createExercise(data);
            router.refresh();
            toast({
                title: 'Exercício criado com sucesso',

            });
        } catch (error) {
            toast({
                title: 'Erro ao criar exercício',
                variant: "destructive"
            });
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="gap-y-5 flex flex-col">
            <Input type="text" placeholder="Nome" {...register('name', { required: 'Nome obrigatório' })} />
            {
                <span className="text-red-500 text-xs">{errors?.name?.message?.toString()}</span>
            }
            <Input type="text" placeholder="Descrição" {...register('description')} />

            <Button>Criar exercício</Button>
        </form>
    );
};
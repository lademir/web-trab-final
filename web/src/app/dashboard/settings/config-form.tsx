'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { updateUser } from "./fn";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { logout } from "@/app/login/fn";

interface FormProps {
    name: string;
    email: string;
    password: string;
    id: string;
}

interface ConfigFormProps {
    user: {
        email: string;
        name: string;
        id: string;
    };
}

export const ConfigForm = ({ user }: ConfigFormProps) => {

    const { register, handleSubmit } = useForm<FormProps>();
    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: FormProps) => {
        try {
            await updateUser({
                ...data,
                id: user.id
            });
            toast({
                title: 'Usuário atualizado com sucesso, por favor, relogue com suas novas credenciais'
            });
            logout();
            router.push('/login');
        } catch (error) {
            toast({
                title: 'Erro ao atualizar usuário',
                variant: 'destructive'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="gap-y-5 flex flex-col w-full">
            <Input type="text" placeholder="Nome" className="w-full focus-visible:ring-offset-0" {...register('name', {
                value: user.name
            })} />
            <Input type="email" placeholder="E-mail" className="w-full focus-visible:ring-offset-0" {...register('email', {
                value: user.email
            })} />
            <Input type="passoword" placeholder="Nova Senha" className="w-full focus-visible:ring-offset-0" {...register('password')} />
            <Button className="w-full">
                Salvar
            </Button>
        </form >
    );
};
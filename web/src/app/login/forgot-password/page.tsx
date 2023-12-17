'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { forgotPassword } from "./fn";
import { useToast } from "@/components/ui/use-toast";

interface FormProps {
    email: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const ForgotPasswordPage = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormProps>();

    const onSubmit = async (data: FormProps) => {
        try {
            setIsLoading(true);
            await forgotPassword(data);
            toast({
                title: "E-mail enviado",
            });
            router.push('/login');
        } catch (error: any) {
            toast({
                title: "Falha ao enviar e-mail",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <Card className="w-1/3 px-3 py-5 bg-slate-800 border-transparent text-slate-50">
                <CardHeader>
                    <h1 className="text-2xl font-bold">Esqueci minha senha</h1>
                </CardHeader>
                <CardContent className="text-slate-900">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <Input type="email" placeholder="E-mail" className="w-full focus-visible:ring-offset-0" {...register('email',
                            {
                                required: 'E-mail obrigatório',
                            }
                        )} />
                        {
                            <span className="text-red-500 text-xs">{errors?.email?.message?.toString()}</span>
                        }
                        <Input type="password" placeholder="Nova Senha" className="w-full mt-2 focus-visible:ring-offset-0" {...register('newPassword', {
                            required: "Senha obrigatória"
                        })} />
                        {
                            <span className="text-red-500 text-xs">{errors?.newPassword?.message?.toString()}</span>
                        }

                        <Input type="password" placeholder="Confimação de senha" className="w-full mt-2 focus-visible:ring-offset-0" {...register('newPasswordConfirm', {
                            required: "Senha obrigatória",
                            validate: (value) => value === watch('newPassword') || "Senhas não coincidem"
                        })} />
                        {
                            <span className="text-red-500 text-xs">{errors?.newPasswordConfirm?.message?.toString()}</span>
                        }
                        <div className="flex flex-col mt-5">

                            <Button disabled={isLoading} type="submit" className="w-full">
                                {
                                    isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Entrar"
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default ForgotPasswordPage;
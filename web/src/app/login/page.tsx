'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Metadata, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { login } from "./fn";
import Axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { typeError } from "@/lib/utils";

const LoginPage: NextPage = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data: any) {
        setIsLoading(true);

        try {
            const res = await login(data);
            // window.location.href = '/dashboard';
            router.push('/dashboard');
        } catch (error: any) {
            // console.log(error);
            // console.log(error);
            toast({
                title: "Falha ao autenticar",
                variant: "destructive"
            });

        } finally {
            setIsLoading(false);

        }


    }

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <Card className="w-1/3 px-3 py-5 bg-slate-800 border-transparent text-slate-50">
                <CardHeader className="">
                    <Image src="/logo.png" alt="BoraTreinar" className="m-auto" width={200} height={200} />
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
                        <Input type="password" placeholder="Senha" className="w-full mt-2 focus-visible:ring-offset-0" {...register('password', {
                            required: "Senha obrigatória"
                        })} />
                        {
                            errors.password && <span className="text-red-500 text-xs">{errors.password.message?.toString()}</span>
                        }
                        <div className="flex flex-col mt-1">
                            <span className="mb-4">
                                <Link className="text-slate-300 text-xs  min-w-fit hover:text-slate-50 transition duration-200" href="/login/forgot-password">
                                    Esqueceu a senha?
                                </Link>
                            </span>
                            <Button disabled={isLoading} type="submit" className="w-full">
                                {
                                    isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Entrar"
                                }
                            </Button>
                            <Button disabled={isLoading} type="button" onClick={() => router.push('/register')} className="w-full mt-3" variant="secondary">Cadastrar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default LoginPage;
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { watch } from 'fs';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';





const RegisterPage = () => {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm();

    const handleRegister = () => {
        // Lógica para registrar o usuário
    };

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <title>BoraTreinar - Cadastro</title>
            <Card className="w-1/3 px-3 bg-slate-800 border-transparent text-slate-50">
                <CardHeader className="">
                    <Image src="/logo.png" alt="BoraTreinar" className="m-auto" width={200} height={200} />
                </CardHeader>
                <CardContent className="text-slate-900">
                    <p className='text-slate-50 text-center pb-5 text-2xl'>Cadastre-se</p>
                    <form className='' onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
                        <ul className='gap-y-2 flex flex-col'>
                            <Input type="email" placeholder="E-mail" className="w-full border-none" {...register('email', {
                                required: 'E-mail obrigatório'
                            })} />
                            {
                                errors.email && <p className='text-red-500 text-xs'>{errors.email.message as string}</p>
                            }
                            <Input type="email" placeholder="Confirmar e-mail" className="w-full" {...register('emailConfirmation', {
                                required: 'Confirmação do e-mail obrigatório',
                                validate: (value) => value === watch('email') || 'O campo não confere com o campo anterior'
                            })} />
                            {
                                errors.emailConfirmation && <p className='text-red-500 text-xs'>{errors.emailConfirmation.message?.toString()}</p>
                            }
                            <Input type='password' placeholder="Senha" className="w-full" {...register('password', {
                                required: "Senha obrigatória",
                            })} />
                            {
                                errors.password && <p className='text-red-500 text-xs'>{errors?.password.message?.toString()}</p>
                            }
                            <Input type='password' placeholder="Confirmar senha" className="w-full" {...register('passwordConfirmation', {
                                required: "Confirmação de senha obrigatória",
                                validate: (value) => value === watch('password') || 'O campo não confere com o campo anterior'
                            })} />
                            {
                                errors.passwordConfirmation && <p className='text-red-500 text-xs'>{errors.passwordConfirmation.message?.toString()}</p>
                            }
                        </ul>

                        <Button type='submit' className="w-full mt-5 mb-0 hover:brightness-110">Cadastrar</Button>
                        <Button type='button' onClick={() => router.push('/login')} className="w-full mt-3" variant="secondary">Voltar</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default RegisterPage;

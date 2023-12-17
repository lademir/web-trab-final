// 'use client';
import { SetStateFromJwt } from "@/app/login/fn";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserStore } from "@/lib/state/user-store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ConfigForm } from "./config-form";

const SettingPage = () => {
    SetStateFromJwt();
    const user = UserStore.getState();



    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Card className="bg-slate-700 max-w-5xl w-full border-none p-5">
                <CardHeader>
                    <h1 className="font-bold text-slate-50">Configurações</h1>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <ConfigForm user={{
                        email: user.email,
                        name: user.name,
                        id: user.id
                    }} />

                </CardContent>
            </Card>
        </div>
    );
};
export default SettingPage;
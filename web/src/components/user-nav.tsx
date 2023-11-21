"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";


export const UserNav = () => {

    const router = useRouter();




    const handleLogout = () => {
        // signOut();

        router.push("/login");
    };


    return (
        <div className="bg-slate-800 h-5 flex items-center p-7 border-b border-slate-700">
            <span className="flex mx-24 justify-between w-full">
                <span className="flex items-center">
                    BoraTreinar
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-slate-700 p-2 rounded">Menu</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-none text-slate-50">
                        <DropdownMenuLabel>Olá, Lademir!</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-500" />
                        <DropdownMenuItem className="hover:bg-slate-500">
                            <Link className="flex-1" href={"/dashboard/workouts"}>
                                Treinos
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-500">
                            <Link className="flex-1" href={"/dashboard/workouts"}>
                                Dados antropometricos
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-500">
                            <Link className="flex-1" href={"/dashboard/workouts"}>
                                Treinos
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-500">
                            <Link className="flex-1" href={"/dashboard/workouts"}>
                                Alunos
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-slate-500" />
                        <DropdownMenuItem className="hover:bg-slate-500">
                            <button className="flex-1 text-left" onClick={handleLogout}>Sair</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </span>

        </div>
    );
};
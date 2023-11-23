"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Link } from "./link";
import { UserNavButton } from "./user-nav-button";


export const UserNav = () => {

    // const router = useRouter();




    const handleLogout = () => {
        // signOut();

        // router.push("/login");
    };


    const menuItems = [
        {
            label: "Configurações",
            href: "/dashboard/settuings",
        },
        {
            label: "Dados antropometricos",
            href: "/dashboard/workouts",
        },
        {
            label: "Estatísticas",
            href: "/dashboard/stats",
        },

    ];

    const navButtons = [
        {
            label: "Historico",
            href: "/dashboard/history",
        },
    ];


    return (
        <nav className="bg-slate-800 h-5 flex items-center p-7 border-b border-slate-700">
            <span className="flex mx-24 justify-between w-full">
                <span className="flex items-center">
                    BoraTreinar
                </span>
                <span className="flex items-center flex-1 px-16">
                    {
                        navButtons.map((item, index) => (
                            <UserNavButton key={index} href={item.href}>
                                {item.label}
                            </UserNavButton>
                        ))
                    }
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-slate-700 p-2 rounded">Menu</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-none text-slate-50">
                        <DropdownMenuLabel>Olá, Lademir!</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-500" />
                        {
                            menuItems.map((item, index) => (
                                <DropdownMenuItem key={index} className="hover:bg-slate-500">
                                    <Link className="flex-1 hover:text-slate-50" href={item.href}>
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                        <DropdownMenuSeparator className="bg-slate-500" />
                        <DropdownMenuItem className="hover:bg-slate-500">
                            <Link className="flex-1" href="/login">
                                Sair
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </span>

        </nav>
    );
};
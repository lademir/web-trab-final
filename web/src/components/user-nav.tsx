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
import { Button } from "./ui/button";
import { logout } from "@/app/login/fn";

interface UserNavProps {
    name: string;
}


export const UserNav = ({ name }: UserNavProps) => {

    const router = useRouter();


    const hello = name ? `Olá, ${name}!` : "Olá!";

    const handleLogout = async () => {
        await logout();
        // console.log('logout');
        router.push('/login');
        // window.location.href = '/login';

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
        <nav className="bg-slate-800 h-5 flex items-center justify-center p-7 border-b border-slate-700">
            <span className="flex max-w-7xl justify-between w-full">
                <span className="flex items-center">
                    {hello}
                </span>
                <span className="flex items-center flex-1 px-16">
                    {
                        navButtons.map((item, index) => (
                            <UserNavButton key={index} href={item.href}>
                                {item.label}
                            </UserNavButton>
                        ))
                    }
                    <Button onClick={handleLogout}>
                        Sair
                    </Button>
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-slate-700 p-2 rounded">Menu</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-none text-slate-50">
                        <DropdownMenuLabel>Olá, Lademir!</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-500" />
                        {
                            menuItems.map((item, index) => (
                                <DropdownMenuItem key={index} className="focus:bg-slate-900">
                                    <Link className="flex-1 " href={item.href}>
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                        <DropdownMenuSeparator className="bg-slate-500" />
                        <DropdownMenuItem className="focus:bg-slate-900">

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </span>

        </nav>
    );
};
"use client";

import { useRouter } from "next/navigation";
import { Link } from "../link";
import { UserNavButton } from "./user-nav-button";
import { Button } from "../ui/button";
import { logout } from "@/app/login/fn";
import { navButtons } from "./menu-list";

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



    return (
        <nav className="bg-slate-800 h-5 flex items-center justify-center p-7 border-b border-slate-700">
            <span className="flex max-w-7xl justify-between w-full">
                <span className="flex items-center">
                    {hello}
                </span>
                <span className="flex items-center justify-evenly flex-1 px-16 gap-x-5">
                    {
                        navButtons.map((item, index) => (
                            <UserNavButton key={index} href={item.href}>
                                {item.label}
                            </UserNavButton>
                        ))
                    }
                </span>
                <Button onClick={handleLogout}>
                    Sair
                </Button>


            </span>

        </nav>
    );
};
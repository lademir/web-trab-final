import Link from "next/link";

interface UserNavButtonProps {
    href: string,
    children: React.ReactNode,
};

export const UserNavButton = ({ href, children }: UserNavButtonProps) => {
    return (
        <Link className="hover:text-slate-600 duration-200 transition ease-in-out" href={href}>
            {children}
        </Link>
    );
};
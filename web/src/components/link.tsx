import NextLink from "next/link";

interface LinkProps {
    href: string;
    children: React.ReactNode;
    type?: "default" | "primary";
}
export const Link = ({ href, children, type = "default" }: LinkProps) => {

    const className = type === "default" ?
        "text-slate-50 hover:text-slate-200"
        :
        "text-slate-50 hover:text-slate-200 text-sm font-medium h-10 px-4 py-2 text-sm rounded bg-slate-900";


    return (
        <NextLink className={className} href={href}>
            {children}
        </NextLink>
    );
};
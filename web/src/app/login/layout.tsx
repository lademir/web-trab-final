import { Metadata } from "next";


export const metadata: Metadata = {
    title: "BoraTreinar - login",
    description: 'Sistema para auxiliar o treinamento em academias',
}

export default function LoginLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="">
            {children}
        </div>
    )
}
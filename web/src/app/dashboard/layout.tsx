import { UserNav } from "@/components/user-nav";

export const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-1">
                <UserNav />
                <main className="flex flex-col flex-1 py-24 max-w-7xl self-center w-full ">
                    {children}
                </main>
            </div>
        </div>
        //    <Footer />

    );
};
export default DashboardLayout;;

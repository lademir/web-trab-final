import { UserNav } from "@/components/user-nav";
import { SetStateFromJwt } from "../login/fn";
import { UserStore } from "@/lib/state/user-store";

export const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {
    SetStateFromJwt();
    const userName = UserStore.getState().name;
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-1">
                <UserNav name={userName} />
                <main className="flex flex-col flex-1 py-24 max-w-7xl self-center w-full ">
                    {children}
                </main>
            </div>
        </div>
        //    <Footer />

    );
};
export default DashboardLayout;;

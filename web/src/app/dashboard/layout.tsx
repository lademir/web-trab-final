import { UserNav } from "@/components/user-nav/user-nav";
import { SetStateFromJwt } from "../login/fn";
import { UserStore } from "@/lib/state/user-store";

export const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {
    SetStateFromJwt();
    const userName = UserStore.getState().name;
    const userRoles = UserStore.getState().roles;
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-1">
                <UserNav userName={userName} userRoles={userRoles} />
                <main className="flex flex-col flex-1 py-24 max-w-7xl self-center w-full ">
                    {children}
                </main>
            </div>
        </div>
        //    <Footer />

    );
};
export default DashboardLayout;;

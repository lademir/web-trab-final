import { UserNav } from "@/components/user-nav";

export const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col fl
            ex-1">
                <UserNav />
                <div className="flex flex-1">
                    {/* <Sidebar /> */}
                    <div className="flex flex-col flex-1">
                        <main className="flex flex-col items-center justify-between p-24">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};
export default DashboardLayout;

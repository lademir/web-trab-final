import { getAllUsers } from "./fn";
import { Card } from "@/components/ui/card";
import { UserTable } from "./user-table";


const ManageStundentPage = async () => {
    const allUsers = await getAllUsers();


    return (
        <div className="flex flex-1 flex-col items-center ">
            <Card className="bg-slate-700 max-w-5xl w-full border-none p-5">
                <UserTable users={allUsers} />
            </Card>
        </div>
    );
};

export default ManageStundentPage;
import { Card, CardContent } from "@/components/ui/card";
import { getNonTrainers } from "./fn";
import { NonTrainer, NonTrainerTable } from "./non-trainer-table";

const ManageTrainersPage = async () => {

    const nonTrainers = await getNonTrainers();

    return (
        <div className="flex flex-col flex-1">
            <h1>Gerencia os treinadores</h1>
            <Card className="bg-slate-500 border-none">
                <CardContent className="">
                    <NonTrainerTable nonTrainers={nonTrainers} />
                </CardContent>
            </Card>
        </div>
    );
};
export default ManageTrainersPage;

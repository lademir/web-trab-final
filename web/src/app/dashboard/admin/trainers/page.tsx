import { Card, CardContent } from "@/components/ui/card";
import { getNonTrainers, getTrainers } from "./fn";
import { NonTrainer, NonTrainerTable } from "./non-trainer-table";

const ManageTrainersPage = async () => {

    const nonTrainers = await getNonTrainers();
    const trainers = await getTrainers();


    return (
        <div className="flex flex-col flex-1">
            <h1>Gerencia os treinadores</h1>
            <Card className="bg-slate-700 max-w-3xl w-full self-center  border-none p-5">
                {/* <CardContent className=""> */}
                <NonTrainerTable nonTrainers={nonTrainers} type="non-trainer" />
                {/* </CardContent> */}

            </Card>
            <Card className="bg-slate-700 max-w-3xl w-full self-center  border-none p-5">
                {/* <CardContent className=""> */}
                <NonTrainerTable nonTrainers={trainers} type="trainer" />
                {/* </CardContent> */}

            </Card>
        </div>
    );
};
export default ManageTrainersPage;

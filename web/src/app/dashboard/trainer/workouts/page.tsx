import { Card } from "@/components/ui/card";
import { getAllStudents } from "./fn";
import { StudentsTable } from "./students-table";

const TrainerWorkoutsPage = async () => {
    const students = await getAllStudents();
    return (
        <div className="flex justify-center">
            {/* <h1>Gerencie os treinos dos seus alunos</h1> */}
            <Card className="bg-slate-700 max-w-5xl w-full border-none p-5">
                <StudentsTable students={students} />
            </Card>

        </div>
    );
};

export default TrainerWorkoutsPage;
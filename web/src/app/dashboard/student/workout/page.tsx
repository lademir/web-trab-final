import { SetStateFromJwt } from "@/app/login/fn";
import { UserStore } from "@/lib/state/user-store";
import { getAllStudentWorkouts } from "../../trainer/workouts/[id]/fn";
import { StudentsWorkoutsTable } from "./student-workout-table";
import { Card, CardContent } from "@/components/ui/card";

const WorkoutStudentPage = async () => {
    SetStateFromJwt();
    const userId = UserStore.getState().id;
    const workouts = await getAllStudentWorkouts(userId);
    return (
        <div className="flex w-full justify-center">
            {/* {JSON.stringify(workouts)} */}
            <Card className="bg-slate-700 max-w-5xl w-full border-none p-5">
                <StudentsWorkoutsTable workouts={workouts} studentId={userId} />

            </Card>
        </div>
    );
};

export default WorkoutStudentPage;
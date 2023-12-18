import { SetStateFromJwt } from "@/app/login/fn";
import { getWorkoutLog } from "./fn";
import { UserStore } from "@/lib/state/user-store";
import { Card } from "@/components/ui/card";
import { WorkoutLogTable } from "./history-table";

const StudentHistoryPage = async () => {
    SetStateFromJwt();
    const userId = UserStore.getState().id;
    const workoutLogs = await getWorkoutLog({
        studentId: userId
    });

    const formattedWorkoutLogs = workoutLogs.map(workoutLog => {
        return {
            name: workoutLog.Workout.name,
            id: +workoutLog.Workout.id,
            createdAt: new Date(workoutLog.createdAt).toLocaleDateString('pt-BR')
        };
    }
    );

    return (
        <div className="flex w-full justify-center">
            {/* {JSON.stringify(workouts)} */}
            <Card className="bg-slate-700 max-w-5xl w-full border-none p-5">
                <WorkoutLogTable workoutLogs={formattedWorkoutLogs} />

            </Card>
        </div>
    );

};
export default StudentHistoryPage;
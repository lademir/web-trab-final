import { SetStateFromJwt } from "@/app/login/fn";
import { UserStore } from "@/lib/state/user-store";
import { getAllStudentWorkouts } from "../../trainer/workouts/[id]/fn";
import { StudentsWorkoutsTable } from "./student-workout-table";
import { Card } from "@/components/ui/card";
import { getWorkoutStarted } from "./fn";
import { redirect } from "next/navigation";

const WorkoutStudentPage = async () => {
    SetStateFromJwt();
    const userId = UserStore.getState().id;
    const workouts = await getAllStudentWorkouts(userId);

    const workoutStarted = await getWorkoutStarted();

    if (workoutStarted != null) {
        redirect(`/dashboard/student/workout/${workoutStarted.id}`);
    }

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
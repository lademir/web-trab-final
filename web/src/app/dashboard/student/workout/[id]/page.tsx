import { redirect } from "next/navigation";
import { finishWorkout, getWorkoutStarted } from "../fn";
import { Button } from "@/components/ui/button";
import { ShowWorkout } from "./show-workout";

const WorkoutExecPage = async () => {
    const workout = await getWorkoutStarted();

    if (workout == null) {
        redirect('/dashboard/student/workout');
    }

    return (
        <div>
            <ShowWorkout workout={workout} />
        </div>
    );
};

export default WorkoutExecPage;
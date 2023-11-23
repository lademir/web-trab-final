import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { WorkoutCardAvatar } from "./avatar";

interface WorkoutCardProps {
    workoutTag: string;
    workoutName: string;
    workoutId: string;
}

export const WorkoutCard = ({ workoutTag, workoutName, workoutId }: WorkoutCardProps) => {
    return (
        <Link href={`/dashboard/workout/${workoutId}`}>
            <Card className="bg-slate-800 border-none max-w-md hover:brightness-75 transition duration-150 ease-in-out hover:cursor-pointer">
                <CardContent className="text-slate-100 flex-1 py-3 h-32">
                    <span className="flex flex-row items-center h-full">
                        <WorkoutCardAvatar className="">
                            {workoutTag}
                        </WorkoutCardAvatar>
                        <span className="flex w-3/4 px-5 mx-auto">
                            {workoutName}
                        </span>
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
};
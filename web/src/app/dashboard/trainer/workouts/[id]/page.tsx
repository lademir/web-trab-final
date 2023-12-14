import { WorkoutCard } from "@/components/workout-card";
import { getAllExercises, getAllStudentWorkouts } from "./fn";
import { Card } from "@/components/ui/card";
import { WorkoutTable } from "./workout-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateWorkoutForm } from "./create-workout-form";

interface TrainerStundentWorkoutPageProps {
    params: {
        id: string;
    };
}

const TrainerStundentWorkoutPage = async ({ params }: TrainerStundentWorkoutPageProps) => {
    const workouts = await getAllStudentWorkouts(params.id);

    const exercises = await getAllExercises();
    return (
        <div className='flex flex-row justify-center gap-x-10'>

            <Card className="bg-slate-700 max-w-5xl w-full border-none p-5">
                <Tabs defaultValue="treinos" className="self-center">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="treinos">Treinos</TabsTrigger>
                        <TabsTrigger value="add">Adicionar treino</TabsTrigger>
                    </TabsList>
                    <TabsContent value="treinos">
                        <WorkoutTable workouts={workouts} />
                    </TabsContent>
                    <TabsContent value="add">
                        <CreateWorkoutForm exercises={exercises} />
                    </TabsContent>
                </Tabs>
            </Card>

        </div>
    );
};

export default TrainerStundentWorkoutPage;
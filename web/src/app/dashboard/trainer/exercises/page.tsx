import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllExercises } from "./fn";
import { ExercisesTable } from "./exercises-table";
import { CreateExerciseForm } from "./create-exercise-form";

const ManageExercisesPage = async () => {
    const exercises = await getAllExercises();
    return (
        <div className='flex flex-row justify-center gap-x-10'>

            <Card className="bg-slate-700 max-w-5xl w-full border-none p-5">
                <Tabs defaultValue="exercises" className="self-center">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="exercises">Exercícios</TabsTrigger>
                        <TabsTrigger value="add-exercise">Adicionar exercício novo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="exercises">
                        {/* <WorkoutTable workouts={workouts} /> */}
                        <ExercisesTable exercises={exercises} />
                    </TabsContent>
                    <TabsContent value="add-exercise">
                        {/* <CreateWorkoutForm exercises={exercises} /> */}
                        <CreateExerciseForm />
                    </TabsContent>
                </Tabs>
            </Card>

        </div>
    );
};

export default ManageExercisesPage;
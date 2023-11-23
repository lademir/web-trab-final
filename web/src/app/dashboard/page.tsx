import { WorkoutCard } from '@/components/workout-card';

export default function Home() {


  const workouts = [
    {
      workoutTag: 'A',
      workoutName: 'Peito e Triceps',
    },
    {
      workoutTag: 'B',
      workoutName: 'Costas e Biceps',
    },
    {
      workoutTag: 'C',
      workoutName: 'Ombro e Perna',
    },
  ];

  return (
    <main className="flex flex-col h-1/4 justify-between">
      <section className='flex flex-col'>
        <h1 className='text-3xl font-semibold mb-4'>
          Treinos
        </h1>
        <div className='flex flex-row gap-x-10'>
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.workoutTag}
              workoutTag={workout.workoutTag}
              workoutName={workout.workoutName}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

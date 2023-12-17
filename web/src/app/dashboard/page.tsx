import { WorkoutCard } from '@/components/workout-card';

export default function Home() {


  const workouts = [
    {
      workoutTag: 'A',
      workoutName: 'Peito e Triceps',
      id: '1',
    },
    {
      workoutTag: 'B',
      workoutName: 'Costas e Biceps',
      id: '2',
    },
    {
      workoutTag: 'C',
      workoutName: 'Ombro e Perna',
      id: '3',
    },
  ];

  return (
    <main className="flex flex-col h-1/4 justify-between">
      <div className='flex w-full justify-center text-center'>
        Bem-vindo ao Dashboard do <pre><strong> BoraTreinar</strong></pre>
      </div>
    </main>
  );
}

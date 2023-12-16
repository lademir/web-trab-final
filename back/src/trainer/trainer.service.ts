import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { DeleteWorkoutDto } from './dto/delete-workout.dto';

@Injectable()
export class TrainerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllStudents() {
    return await this.prisma.student.findMany({
      include: {
        User: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
    });
  }

  //todo: criar workout para o aluno
  async createExercise({ name, description }: CreateExerciseDto) {
    return await this.prisma.exercise.create({
      data: {
        name,
        description,
      },
      select: {
        name: true,
        description: true,
      },
    });
  }

  async deleteExercise({ exerciseId }: { exerciseId: string }) {
    const res2 = await this.prisma.exerciseWorkout.deleteMany({
      where: {
        exerciseId: +exerciseId,
      },
    });
    const res1 = await this.prisma.exercise.delete({
      where: {
        id: +exerciseId,
      },
    });

    return Promise.all([res1, res2]);
  }

  async getAllExercises() {
    return await this.prisma.exercise.findMany({
      select: {
        name: true,
        description: true,
        id: true,
      },
    });
  }

  async getStudentWorkouts(studentId: string) {
    return await this.prisma.workout.findMany({
      where: {
        studentId: +studentId,
      },
      select: {
        name: true,
        id: true,
        Exercises: {
          select: {
            reps: true,
            series: true,
            weight: true,
            rest: true,
            exercise: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }

  async createWorkout(createWorkoutDto: CreateWorkoutDto) {
    const { name, studentId, exercises } = createWorkoutDto;
    return await this.prisma.workout.create({
      data: {
        name,
        Student: {
          connect: {
            id: +studentId,
          },
        },
        Exercises: {
          create: [
            ...exercises.map((exercise) => ({
              exerciseId: +exercise.id,
              reps: +exercise.reps,
              weight: +exercise.weight,
              series: +exercise.series,
              rest: +exercise.rest,
            })),
          ],
        },
      },
    });
  }

  async deleteWorkout({ workoutId }: DeleteWorkoutDto) {
    const res2 = await this.prisma.exerciseWorkout.deleteMany({
      where: {
        workoutId: +workoutId,
      },
    });
    const res1 = await this.prisma.workout.delete({
      where: {
        id: +workoutId,
      },
    });
    return Promise.all([res1, res2]);
  }
}

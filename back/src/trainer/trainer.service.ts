import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';

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

  async getAllExercises() {
    return await this.prisma.exercise.findMany({
      select: {
        name: true,
        description: true,
        id: true,
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
              reps: exercise.reps,
              weight: exercise.weight,
              series: exercise.series,
            })),
          ],
        },
      },
    });
  }
}

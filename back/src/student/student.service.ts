import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async initWorkout({
    studentId,
    workoutId,
  }: {
    studentId: string;
    workoutId: string;
  }) {
    return await this.prisma.workoutLog.create({
      data: {
        Student: {
          connect: {
            UserId: +studentId,
          },
        },
        Workout: {
          connect: {
            id: +workoutId,
          },
        },
      },
      select: {
        Workout: {
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
        },
      },
    });
  }
  async getWorkoutLog({ studentId }: { studentId: string }) {
    return await this.prisma.workoutLog.findMany({
      where: {
        Student: {
          UserId: +studentId,
        },
      },
      select: {
        createdAt: true,
        Workout: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }
}

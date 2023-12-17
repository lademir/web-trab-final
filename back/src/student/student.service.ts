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
    });
  }
}

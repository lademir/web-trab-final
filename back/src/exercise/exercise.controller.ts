import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Replace with your Prisma service file

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAllExercises() {
    return this.prisma.exercise.findMany();
  }

  @Get(':id')
  async getExerciseById(@Param('id') id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
    });
  }

  @Post()
  async createExercise(@Body() exerciseData: any) {
    return this.prisma.exercise.create({
      data: exerciseData,
    });
  }

  @Put(':id')
  async updateExercise(@Param('id') id: number, @Body() exerciseData: any) {
    return this.prisma.exercise.update({
      where: { id },
      data: exerciseData,
    });
  }

  @Delete(':id')
  async deleteExercise(@Param('id') id: number) {
    return this.prisma.exercise.delete({
      where: { id },
    });
  }
}

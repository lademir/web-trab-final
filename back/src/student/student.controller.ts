import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/initworkout')
  initWorkout(@Body() data: { studentId: string; workoutId: string }) {
    return this.studentService.initWorkout(data);
  }

  @Get('/getworkoutlog')
  getWorkoutLog(@Body() data: { studentId: string }) {
    return this.studentService.getWorkoutLog(data);
  }
}

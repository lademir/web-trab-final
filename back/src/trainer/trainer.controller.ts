import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { DeleteWorkoutDto } from './dto/delete-workout.dto';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get('getallstudents')
  getAllStudents() {
    return this.trainerService.getAllStudents();
  }

  @Post('/createexercise')
  createExercise(@Body() createExerciseDto: CreateExerciseDto) {
    return this.trainerService.createExercise(createExerciseDto);
  }

  @Get('/getallexercises')
  getAllExercises() {
    return this.trainerService.getAllExercises();
  }

  @Post('/createworkout')
  createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    console.log(createWorkoutDto);
    return this.trainerService.createWorkout(createWorkoutDto);
  }

  @Get('/getstudentworkouts')
  getStudentWorkouts(@Body() { studentId }: { studentId: string }) {
    // console.log(studentId);
    return this.trainerService.getStudentWorkouts(studentId);
  }

  @Delete('/deleteworkout')
  deleteWorkout(@Body() deleteWorkoutDto: DeleteWorkoutDto) {
    return this.trainerService.deleteWorkout(deleteWorkoutDto);
  }

  @Delete('/deleteexercise')
  deleteExercise(@Body() data: { exerciseId: string }) {
    return this.trainerService.deleteExercise(data);
  }
}

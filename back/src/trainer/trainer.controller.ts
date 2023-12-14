import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';

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
}

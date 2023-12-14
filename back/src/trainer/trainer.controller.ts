import { Controller, Get } from '@nestjs/common';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get('getallstudents')
  getAllStudents() {
    return this.trainerService.getAllStudents();
  }
}

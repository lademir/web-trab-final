import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/addtrainer')
  async findAll() {
    return this.adminService.findAllNormalUsers();
  }

  @Get('/getalltrainers')
  async getAllTrainers() {
    return this.adminService.getAllTrainers();
  }

  @Post('/addtrainer')
  async createTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    return this.adminService.createTrainer(createTrainerDto);
  }

  @Delete('/removetrainer')
  async removeTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    return this.adminService.removeTrainer(createTrainerDto);
  }
}

import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/addtrainer')
  async findAll() {
    return this.adminService.findAllNonTrainers();
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

  @Get('/getallusers')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Post('/adduser')
  async addUser(@Body() createStudentDto: CreateStudentDto) {
    return this.adminService.createStudent(createStudentDto);
  }

  @Get('/getallstudents')
  async getAllStudents() {
    return this.adminService.getAllStudents();
  }
}

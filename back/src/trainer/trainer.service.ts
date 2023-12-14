import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrainerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllStudents() {
    return await this.prisma.student.findMany();
  }
}

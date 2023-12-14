import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService, PrismaService],
})
export class TrainerModule {}

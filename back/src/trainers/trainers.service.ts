import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrainersService {
  constructor(private readonly prisma: PrismaService) {}
  //adicionar a role ao user e criar o trainer
  async create({ id }: CreateTrainerDto) {
    const res = await this.prisma.trainer.create({
      data: {
        UserId: +id,
      },
    });
    const res2 = await this.prisma.user.update({
      where: { id: +id },
      data: {
        UserRoles: {
          create: {
            role: {
              connect: {
                name: 'trainer',
              },
            },
          },
        },
      },
    });

    return Promise.all([res, res2]);
  }

  findAll() {
    return `This action returns all trainers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainer`;
  }

  update(id: number, updateTrainerDto: UpdateTrainerDto) {
    return `This action updates a #${id} trainer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainer`;
  }
}

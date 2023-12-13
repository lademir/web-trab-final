import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllNormalUsers() {
    const notTrainers = await this.prisma.user.findMany({
      where: {
        NOT: {
          UserRoles: {
            some: {
              role: {
                name: 'trainer',
              },
            },
          },
        },
      },
    });
    const res = notTrainers.map((user) => ({
      id: user.id,
      name: user.name,
    }));
    return res;
  }

  async createTrainer({ id }: CreateTrainerDto) {
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

  async removeTrainer({ id }: CreateTrainerDto) {
    const res = await this.prisma.trainer.delete({
      where: {
        UserId: +id,
      },
    });
    const res2 = await this.prisma.user.update({
      where: { id: +id },
      data: {
        UserRoles: {
          deleteMany: [{ roleRid: 3 }],
        },
      },
    });

    return Promise.all([res, res2]);
  }
}

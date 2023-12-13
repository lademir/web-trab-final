import { ConflictException, Injectable } from '@nestjs/common';
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
      //   include: {
      //     UserRoles: {
      //       include: {
      //         role: true,
      //       },
      //     },
      //   },
    });
    const res = notTrainers.map((user) => ({
      id: user.id,
      name: user.name,
    }));
    // console.log(notTrainers);
    return res;
  }

  async createTrainer({ id }: CreateTrainerDto) {
    try {
      const res = await this.prisma.trainer.create({
        data: {
          UserId: +id,
        },
      });
      // console.log(res);
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

      console.log(res2);

      return Promise.all([res, res2]);
    } catch (error) {
      throw new ConflictException('Usuário já é treinador');
    }
  }

  async removeTrainer({ id }: CreateTrainerDto) {
    const res = await this.prisma.trainer.delete({
      where: {
        UserId: +id,
      },
    });
    console.log(res);
    const res2 = await this.prisma.user.update({
      where: { id: +id },
      data: {
        UserRoles: {
          deleteMany: [{ roleRid: 3 }],
        },
      },
    });
    console.log(res2);

    return Promise.all([res, res2]);
  }
}

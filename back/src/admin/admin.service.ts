import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllNonTrainers() {
    const usersWithUserRole = await this.prisma.user.findMany({
      where: {
        UserRoles: {
          some: {
            role: {
              name: 'user',
            },
          },
        },
        NOT: {
          UserRoles: {
            some: {
              role: {
                NOT: {
                  name: 'user',
                },
              },
            },
          },
        },
      },
    });
    const res = usersWithUserRole.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
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

      // console.log(res2);

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
    // console.log(res2);

    return Promise.all([res, res2]);
  }

  async getAllTrainers() {
    const trainers = await this.prisma.trainer.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    const res = trainers.map((trainer) => ({
      id: trainer.UserId,
      name: trainer.User.name,
      email: trainer.User.email,
    }));
    // console.log(trainers);
    return res;
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        UserRoles: {
          some: {
            role: {
              name: 'user',
            },
          },
          every: {
            role: {
              name: 'user',
            },
          },
        },
      },
    });
  }

  async getAllStudents() {
    const students = await this.prisma.student.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const res = students.map((student) => ({
      id: student.UserId,
      name: student.User.name,
      email: student.User.email,
    }));

    return res;
  }

  async createStudent({ id }: CreateTrainerDto) {
    try {
      const res = await this.prisma.student.create({
        data: {
          UserId: +id,
        },
        include: {
          User: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      // console.log(res);
      await this.prisma.user.update({
        where: { id: +id },
        data: {
          UserRoles: {
            create: {
              role: {
                connect: {
                  name: 'student',
                },
              },
            },
          },
        },
      });

      const user = {
        id: res.User.id,
        name: res.User.name,
        email: res.User.email,
      };

      // return Promise.all([res, res2]);
      return user;
    } catch (error) {
      throw new ConflictException('Usuário já é aluno');
    }
  }
}

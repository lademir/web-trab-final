import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: userData.password,
        UserRoles: {
          create: {
            role: {
              connect: {
                name: 'user',
              },
            },
          },
        },
      },
      include: {
        UserRoles: {
          select: {
            role: true,
          },
        },
      },
    });

    const payload = {
      email: newUser.email,
      sub: newUser.id,
      name: newUser.name,
      roles: newUser.UserRoles.map((role) => role.role.name),
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        name: newUser.name,
        id: newUser.id,
        email: newUser.email,
        roles: newUser.UserRoles.map((role) => role.role.name),
      },
    };
  }

  @Put('/updateuser')
  async updateUser(
    @Body()
    userData: {
      email: string;
      name: string;
      id: number;
      password: string;
    },
  ) {
    if (userData.password === '') {
      return this.prisma.user.update({
        where: { id: +userData.id },
        data: {
          email: userData.email,
          name: userData.name,
        },
        select: {
          name: true,
          email: true,
          password: false,
        },
      });
    } else {
      return this.prisma.user.update({
        where: { id: +userData.id },
        data: {
          email: userData.email,
          name: userData.name,
          password: userData.password,
        },
        select: {
          name: true,
          email: true,
          password: false,
        },
      });
    }
  }

  @Put('/changepassword')
  async forgetPassword(@Body() data: { email: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: data.newPassword,
      },
      select: {
        name: true,
        email: true,
        password: false,
      },
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

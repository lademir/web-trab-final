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
import { UpdateUserDto } from './dto/update-user.dto';
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
      data: userData,
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

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

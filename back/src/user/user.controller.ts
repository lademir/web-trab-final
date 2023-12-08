import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('users')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

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
  async createUser(@Body() userData: any) {
    return this.prisma.user.create({
      data: userData,
    });
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: any) {
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

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'inf321-trabalho-final',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}

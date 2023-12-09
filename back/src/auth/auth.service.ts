import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in-dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
      include: {
        UserRoles: {
          include: { role: true },
        },
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.password !== signInDto.password) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    // jwt
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      roles: user.UserRoles.map((role) => role.role.name),
    };
    const access_token = this.jwtService.sign(payload);
    console.log(access_token);
    return {
      access_token,
    };
  }
}

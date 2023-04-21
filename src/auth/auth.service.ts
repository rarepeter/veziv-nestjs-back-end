import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  ApiHttpException,
  ForbiddenHttpException,
  InvalidCredentialsHttpException,
  InvalidTokenHttpException,
} from '../error-handlers/ApiHttpException';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  verifyToken(accessToken: string) {
    try {
      const isTokenValid = this.jwtService.verify(accessToken, {
        secret: this.config.get('JWT_SECRET'),
      });
      if (isTokenValid) return;
    } catch (error) {
      throw new InvalidTokenHttpException();
    }
  }

  async signUp(createUserDto: AuthDto) {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ApiHttpException(
        {
          type: 'email_already_registered',
          message: 'A user with this email already exists.',
          solution: 'If this is your email, try recovering the password.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUserDto = await this.userService.createUser(createUserDto);

    return await this.signToken(newUserDto.id, newUserDto.email);
  }

  async signIn(authDto: AuthDto) {
    const foundUser = await this.userService.findUserByEmail(authDto.email);

    const pwMatch = await bcrypt.compare(
      authDto.password,
      foundUser.hashedPassword,
    );

    if (pwMatch) {
      return await this.signToken(foundUser.id, foundUser.email);
    }

    throw new InvalidCredentialsHttpException();
  }

  private async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    try {
      const payload = {
        sub: userId,
        email,
      };

      const secret = this.config.get('JWT_SECRET');

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret,
      });

      return {
        access_token: token,
      };
    } catch (error) {
      throw new ApiHttpException(
        {
          type: 'token_sign_error',
          message: 'There has been an error while signing your JWT token.',
          solution: 'Try again later.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

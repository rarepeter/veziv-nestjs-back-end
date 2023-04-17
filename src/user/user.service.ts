import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, UserDto } from '../auth/dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ApiHttpException } from '../../error-handlers/ApiHttpException';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(authDto: AuthDto) {
    try {
      const hashedUserPassword = await bcrypt.hash(authDto.password, 3);
  
      const newUserDto: UserDto = await this.prisma.user.create({
        data: {
          email: authDto.email,
          hashedPassword: hashedUserPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
  
      return newUserDto;
    } catch (err) {
      throw new ApiHttpException(
        {
          type: 'error_while_creating_user',
          message: 'There has been an error while creating a user.',
          solution: 'Try again later.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findUserByEmail(email: User['email']) {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}

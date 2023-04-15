import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../auth/dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(authDto: AuthDto) {
    const hashedUserPassword = await bcrypt.hash(authDto.password, 3);
    const newUser = this.prisma.user.create({
      data: {
        email: authDto.email,
        hashedPassword: hashedUserPassword,
      },
    });

    return newUser;
  }
}

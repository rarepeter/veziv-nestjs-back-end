import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioEntryModule } from './portfolio-entry/portfolio-entry.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, PortfolioEntryModule, PrismaModule],
})
export class AppModule {}

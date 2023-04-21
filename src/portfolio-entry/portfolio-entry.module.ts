import { Module } from '@nestjs/common';
import { PortfolioEntryController } from './portfolio-entry.controller';
import { PortfolioEntryService } from './portfolio-entry.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, JwtModule.register({})],
  controllers: [PortfolioEntryController],
  providers: [PortfolioEntryService],
  exports: [PortfolioEntryService],
})
export class PortfolioEntryModule {}

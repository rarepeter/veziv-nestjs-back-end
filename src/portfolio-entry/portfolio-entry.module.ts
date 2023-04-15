import { Module } from '@nestjs/common';
import { PortfolioEntryController } from './portfolio-entry.controller';
import { PortfolioEntryService } from './portfolio-entry.service';

@Module({
  controllers: [PortfolioEntryController],
  providers: [PortfolioEntryService],
})
export class PortfolioEntryModule {}

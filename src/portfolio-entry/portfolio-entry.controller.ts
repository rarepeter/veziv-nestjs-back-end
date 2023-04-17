import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PortfolioEntryService } from './portfolio-entry.service';
import { AuthGuard } from '../auth/guards';

@Controller('portfolio-entries')
export class PortfolioEntryController {
  constructor(private portfolioEntryService: PortfolioEntryService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllPortfolioEntries() {
    return this.portfolioEntryService.getAll();
  }

  @Get('public')
  async getPublicPortfolioEntries() {
    return this.portfolioEntryService.getPublic();
  }

  @Post()
  async addPortfolioEntry() {}

  @Put(':id')
  async modifyPortfolioEntry() {}

  @Put('/toggle-visibility/:id')
  async togglePortfolioEntryVisibility() {}
}

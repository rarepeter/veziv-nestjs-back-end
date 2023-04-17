import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PortfolioEntryService } from './portfolio-entry.service';
import { AuthGuard } from '../auth/guards';
import { PortfolioEntryDto } from './dto';

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
  @UseGuards(AuthGuard)
  async addPortfolioEntry(@Body() newPortfolioEntryDto: PortfolioEntryDto) {
    return this.portfolioEntryService.addPortfolioEntry(newPortfolioEntryDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async modifyPortfolioEntry(
    @Param('id') portfolioEntryId,
    @Body() modifiedPortfolioEntryDto: PortfolioEntryDto,
  ) {
    return this.portfolioEntryService.modifyPortfolioEntry(
      portfolioEntryId,
      modifiedPortfolioEntryDto,
    );
  }
}

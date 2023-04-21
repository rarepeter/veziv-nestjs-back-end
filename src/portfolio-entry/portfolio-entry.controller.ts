import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PortfolioEntryService } from './portfolio-entry.service';
import { AuthGuard } from '../auth/guards';
import { PortfolioEntryDto } from './dto';
import { PortfolioEntry } from '@prisma/client';

@Controller('portfolio-entries')
export class PortfolioEntryController {
  constructor(private portfolioEntryService: PortfolioEntryService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  @UseGuards(AuthGuard)
  async getAllPortfolioEntries() {
    return await this.portfolioEntryService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('public')
  async getPublicPortfolioEntries() {
    return await this.portfolioEntryService.getPublic();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard)
  async addPortfolioEntry(@Body() newPortfolioEntryDto: PortfolioEntryDto) {
    return await this.portfolioEntryService.addPortfolioEntry(
      newPortfolioEntryDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Put(':projectId')
  @UseGuards(AuthGuard)
  async modifyPortfolioEntry(
    @Param('projectId') portfolioEntryId: string,
    @Body() modifiedPortfolioEntryDto: PortfolioEntryDto,
  ) {
    return await this.portfolioEntryService.modifyPortfolioEntry(
      portfolioEntryId,
      modifiedPortfolioEntryDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':projectId')
  @UseGuards(AuthGuard)
  async deletePortfolioEntry(
    @Param('projectId') projectId: PortfolioEntry['id'],
  ) {
    return await this.portfolioEntryService.deletePortfolioEntry(projectId);
  }
}

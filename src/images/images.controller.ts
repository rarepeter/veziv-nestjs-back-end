import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfolioEntry } from '@prisma/client';
import { ImagesService } from './images.service';
import { AuthGuard } from '../auth/guards';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(':projectId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadPortfolioEntryImage(
    @Param('projectId') projectId: PortfolioEntry['id'],
    @Query('orderNum', ParseIntPipe) orderNum: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.imageService.uploadPortfolioEntryImage(
      projectId,
      orderNum,
      image,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('cover-image/:projectId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadPortfolioEntryCoverImage(
    @Param('projectId') projectId: PortfolioEntry['id'],
    @UploadedFile() coverImage: Express.Multer.File,
  ) {
    return await this.imageService.uploadPortfolioEntryCoverImage(projectId, coverImage)
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { PortfolioEntry } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { ApiHttpException } from '../../error-handlers/ApiHttpException';
import { PortfolioEntryService } from '../portfolio-entry/portfolio-entry.service';

const SERVER_URL = 'http://localhost:5000';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private portfolioEntryService: PortfolioEntryService,
  ) {}

  async uploadPortfolioEntryCoverImage(
    projectId: PortfolioEntry['id'],
    coverImage: Express.Multer.File,
  ) {
    const portfolioEntryCoverImageDir = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'portfolio-entries',
      'images',
      projectId,
      'cover-image',
    );

    if (!fs.existsSync(portfolioEntryCoverImageDir)) {
      fs.mkdirSync(portfolioEntryCoverImageDir, { recursive: true });
    }

    const coverImageUrl = await this.uploadCoverImage(
      coverImage,
      portfolioEntryCoverImageDir,
      projectId,
    );

    const updatedPortfolioEntry =
      await this.portfolioEntryService.setCoverImageUrl(
        projectId,
        coverImageUrl,
      );

    return updatedPortfolioEntry;
  }

  async uploadPortfolioEntryImage(
    projectId: PortfolioEntry['id'],
    orderNumber: number,
    image: Express.Multer.File,
  ) {
    const portfolioEntryImageDir = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'portfolio-entries',
      'images',
      projectId,
    );

    if (!fs.existsSync(portfolioEntryImageDir)) {
      fs.mkdirSync(portfolioEntryImageDir, { recursive: true });
    }

    const uploadedDbImage = await this.addImageToDb(projectId, orderNumber);

    this.uploadImage(image, portfolioEntryImageDir, uploadedDbImage.id);

    return uploadedDbImage;
  }

  private async addImageToDb(
    projectId: PortfolioEntry['id'],
    orderNumber: number,
  ) {
    try {
      const createdImage = await this.prisma.portfolioEntryImage.create({
        data: {
          orderNum: orderNumber,
          portfolioEntryId: projectId,
        },
      });

      return createdImage;
    } catch (err) {
      throw new ApiHttpException(
        {
          message: 'Failed image entity creation in the database.',
          solution: 'Try again later.',
          type: 'failed_db_entity_creation',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async uploadImage(
    image: Express.Multer.File,
    portfolioEntryImageDir: string,
    imageId: string,
  ) {
    const imageExtension = image.mimetype.split('/')[1];
    fs.writeFileSync(
      path.join(portfolioEntryImageDir, `${imageId}.${imageExtension}`),
      image.buffer,
    );
  }

  private async uploadCoverImage(
    image: Express.Multer.File,
    portfolioEntryCoverImageDir: string,
    projectId: string,
  ) {
    const imageExtension = image.mimetype.split('/')[1];
    fs.writeFileSync(
      path.join(portfolioEntryCoverImageDir, `cover.${imageExtension}`),
      image.buffer,
    );

    const coverImageUrl = `${SERVER_URL}/portfolio-entries/images/${projectId}/cover-image/cover.${imageExtension}`;

    return coverImageUrl;
  }
}

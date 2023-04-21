import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ApiHttpException,
  FailedDbEntityCreationHttpException,
  FailedDbEntityModificationHttpException,
  FailedDbFetchHttpException,
} from '../error-handlers/ApiHttpException';
import { PortfolioEntryDto } from './dto';
import { PortfolioEntry } from '@prisma/client';

@Injectable()
export class PortfolioEntryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const allEntries = await this.prisma.portfolioEntry.findMany();

      return {
        portfolioEntries: allEntries,
      };
    } catch (error) {
      throw new FailedDbFetchHttpException();
    }
  }

  async getPublic() {
    try {
      const publicEntries = await this.prisma.portfolioEntry.findMany({
        where: {
          isPubliclyVisible: true,
        },
      });

      return {
        portfolioEntries: publicEntries,
      };
    } catch (error) {
      throw new FailedDbFetchHttpException();
    }
  }

  async addPortfolioEntry(newPortfolioEntryDto: PortfolioEntryDto) {
    try {
      const newPortfolioEntry = await this.prisma.portfolioEntry.create({
        data: newPortfolioEntryDto,
      });

      return newPortfolioEntry;
    } catch (error) {
      throw new FailedDbEntityCreationHttpException();
    }
  }

  async modifyPortfolioEntry(
    portfolioEntryId: string,
    modifiedPortfolioEntryDto: PortfolioEntryDto,
  ) {
    try {
      const modifiedPortfolioEntry = await this.prisma.portfolioEntry.update({
        where: {
          id: portfolioEntryId,
        },
        data: modifiedPortfolioEntryDto,
      });

      return modifiedPortfolioEntry;
    } catch (error) {
      throw new FailedDbEntityModificationHttpException();
    }
  }

  async setCoverImageUrl(
    projectId: PortfolioEntry['id'],
    coverImageUrl: string,
  ) {
    const updatedPortfolioEntry = await this.prisma.portfolioEntry.update({
      where: {
        id: projectId,
      },
      data: {
        coverImageUrl,
      },
    });

    return updatedPortfolioEntry;
  }

  async deletePortfolioEntry(projectId: PortfolioEntry['id']) {
    try {
      const deletedEntry = await this.prisma.portfolioEntry.delete({
        where: {
          id: projectId,
        },
      });

      return;
    } catch (err) {
      throw new ApiHttpException(
        {
          message: 'Failed to delete project.',
          solution: 'Try again later.',
          type: 'failed_db_entity_deletion',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioEntryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const allEntries = await this.prisma.portfolioEntry.findMany();

    return {
      portfolioEntries: allEntries,
    };
  }

  async getPublic() {}
}

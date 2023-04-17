import { PortfolioEntry } from '@prisma/client';
import { MaxLength } from 'class-validator';

export class PortfolioEntryDto implements Omit<PortfolioEntry, 'id'> {
  @MaxLength(100)
  title: string;
  @MaxLength(5000)
  description: string;
  @MaxLength(500)
  clientName: string;
  @MaxLength(2048)
  clientLink: string;
  @MaxLength(5000)
  clientReview: string;
  @MaxLength(5000)
  coverImageUrl: string;

  isPubliclyVisible: boolean;
}
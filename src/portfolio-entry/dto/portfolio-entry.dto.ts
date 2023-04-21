import { PortfolioEntry } from '@prisma/client';
import { IsNotEmpty, MaxLength, isNotEmpty } from 'class-validator';

export class PortfolioEntryDto implements Omit<PortfolioEntry, 'id'> {
  @MaxLength(100)
  title: string;
  @MaxLength(5000)
  description: string;
  @IsNotEmpty()
  @MaxLength(500)
  clientName: string;
  @IsNotEmpty()
  @MaxLength(2048)
  clientLink: string;
  @MaxLength(5000)
  clientReview: string;
  @MaxLength(5000)
  coverImageUrl: string;

  @IsNotEmpty()
  isPubliclyVisible: boolean;
}

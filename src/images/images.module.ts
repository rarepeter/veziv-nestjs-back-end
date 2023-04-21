import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PortfolioEntryModule } from '../portfolio-entry/portfolio-entry.module';

@Module({
  imports: [AuthModule, JwtModule.register({}), PortfolioEntryModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}

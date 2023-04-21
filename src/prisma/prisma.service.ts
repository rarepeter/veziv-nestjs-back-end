import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: config.get('DATABASE_URL'),
          url: 'postgresql://postgres:pmAJQDmGjqCXiUDFTFie@containers-us-west-103.railway.app:5476/railway',
        },
      },
    });
  }
}

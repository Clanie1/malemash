import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { UserModule } from '../user/user.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RatingController],
  providers: [RatingService, PrismaService],
  imports: [UserModule],
})
export class RatingModule {}

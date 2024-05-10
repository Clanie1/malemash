import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

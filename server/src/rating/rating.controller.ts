import { Body, Controller, Get, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RateUsersDto } from './dto/rate-users.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async rate(@Body() rateUsersDto: RateUsersDto) {
    return this.ratingService.rate({
      user1: { connect: { id: rateUsersDto.userId1 } },
      user2: { connect: { id: rateUsersDto.userId2 } },
      author: { connect: { id: rateUsersDto.authorId } },
      whoWon: { connect: { id: rateUsersDto.selectedUserId } },
    });
  }

  @Get('/latest')
  async getLatestRatings() {
    return this.ratingService.getLatestRatings();
  }
}

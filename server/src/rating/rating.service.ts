import { Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RatingService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async rate(data: Prisma.RatingCreateInput): Promise<Rating> {
    const rating = await this.prisma.rating.create({ data: data });
    this.calculateNewEloForPlayers(rating);
    return rating;
  }

  async getLatestRatings(): Promise<Rating[]> {
    return this.prisma.rating.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  private async calculateNewEloForPlayers(rating: Rating) {
    const user1 = await this.userService.findUnique({
      where: { id: rating.user1Id! },
    });

    if (!user1) throw new Error('User not found');

    const user2 = await this.userService.findUnique({
      where: { id: rating.user2Id! },
    });

    if (!user2) throw new Error('User not found');

    const probabilityToWin = this.calculateProbabilityOfPlayer1Winning(
      user1.elo,
      user2.elo,
    );

    const newElo1 = this.calculateNewElo(
      user1.elo,
      probabilityToWin,
      rating.whoWonId == rating.user1Id,
    );
    const newElo2 = this.calculateNewElo(
      user2.elo,
      probabilityToWin,
      rating.whoWonId == rating.user2Id,
    );

    await this.userService.updateUserRating(user1.id, newElo1);
    await this.userService.updateUserRating(user2.id, newElo2);
  }

  private calculateNewElo(
    playerElo: number,
    probabilityToWin: number,
    won: boolean,
  ): number {
    const kFactor = 24;
    return playerElo + kFactor * ((won ? 1 : 0) - probabilityToWin);
  }

  private calculateProbabilityOfPlayer1Winning(
    player1Elo: number,
    player2Elo: number,
  ) {
    const impactConstant = 400;
    return 1 / (1 + Math.pow(10, (player2Elo - player1Elo) / impactConstant));
  }
}

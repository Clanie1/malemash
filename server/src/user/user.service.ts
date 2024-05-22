import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: Omit<Prisma.UserCreateInput, 'elo'>) {
    return this.prisma.user.create({ data: { ...data, elo: 1500 } });
  }

  findUnique(params: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique({ ...params });
  }

  getTopUsers() {
    return this.prisma.user.findMany({
      orderBy: { elo: 'desc' },
      take: 10,
    });
  }

  updateUserRating(userId: number, rating: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { elo: rating },
    });
  }

  async getUsersToRate(myId: number): Promise<User[]> {
    const userCount = await this.prisma.user.count();
    const usersToTake = 1;
    const foundUsers = await this.prisma.user.findMany({
      take: usersToTake,
      skip: Math.floor(Math.random() * (userCount - usersToTake)),
    });

    if (foundUsers.length === 0) {
      return [];
    }
    const randomUser = foundUsers[0];

    // pick a user close to the foundUsers elo
    let foundUser = false;
    let range = 1;
    while (foundUser == false) {
      const userCloseToElo = await this.prisma.user.findFirst({
        where: {
          elo: {
            gte: randomUser.elo - 100 * range,
            lte: randomUser.elo + 100 * range,
          },
          id: {
            not: myId,
          },
        },
      });

      if (userCloseToElo) {
        foundUser = true;
        return [randomUser, userCloseToElo];
      }

      range += 1;
    }
    return [];
  }
}

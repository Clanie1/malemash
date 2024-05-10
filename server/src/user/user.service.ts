import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

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
}

import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

const rating = {
  id: 1,
  createdAt: new Date(),
  user1Id: 1,
  user2Id: 2,
  authorId: 3,
  whoWonId: 1,
};

describe('RatingController', () => {
  let controller: RatingController;

  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController],
      providers: [
        RatingService,
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    const user1 = {
      id: 1,
      email: 'test@gmail.com',
      elo: 1500,
      name: 'test',
    };

    const user2 = {
      id: 2,
      email: 'test2@gmail.com',
      elo: 1500,
      name: 'test2',
    };

    const user3 = {
      id: 3,
      email: 'test3@gmail.com',
      elo: 1500,
      name: 'test3',
    };

    prismaMock.rating.create.mockResolvedValue(rating);
    prismaMock.user.findUnique
      .mockResolvedValue(user1)
      .mockResolvedValue(user2)
      .mockResolvedValue(user3);

    controller = module.get<RatingController>(RatingController);
    prismaMock.rating.findMany.mockResolvedValue([rating]);
  });

  it('should return a rating', async () => {
    const ratings = await controller.getLatestRatings();
    expect(ratings).toStrictEqual([rating]);
  });

  it('should create a rating', async () => {
    const newRating = await controller.rate({
      authorId: 1,
      userId1: 2,
      userId2: 3,
      selectedUserId: 1,
    });
    expect(newRating).toStrictEqual(rating);
  });
});

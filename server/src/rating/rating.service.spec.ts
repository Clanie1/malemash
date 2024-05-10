import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from './rating.service';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('RatingService', () => {
  let service: RatingService;

  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<RatingService>(RatingService);

    const rating = {
      id: 1,
      user1Id: 1,
      user2Id: 2,
      authorId: 3,
      whoWonId: 1,
    };

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

    // prismaMock.user.update.mockResolvedValue({ ...user, elo: 1600 });
  });

  it('Should create a new rating', async () => {
    const rate = await service.rate({
      user1: { connect: { id: 1 } },
      user2: { connect: { id: 2 } },
      author: { connect: { id: 3 } },
      whoWon: { connect: { id: 1 } },
    });
    expect(rate).toBeDefined();
    expect(rate.authorId).toBe(3);
    expect(rate.user1Id).toBe(1);
    expect(rate.user2Id).toBe(2);
    expect(rate.whoWonId).toBe(1);
  });
});

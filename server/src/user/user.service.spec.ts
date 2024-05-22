import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    const user = {
      id: 1,
      email: 'test@gmail.com',
      elo: 1500,
      name: 'test',
    };

    prismaMock.user.create.mockResolvedValue(user);
    prismaMock.user.findUnique.mockResolvedValue(user);
    prismaMock.user.update.mockResolvedValue({ ...user, elo: 1600 });
    prismaMock.user.findMany.mockResolvedValue([user]);
  });

  it('should create a new user with 1500 elo', async () => {
    const user = await service.create({
      email: 'test@gmail.com',
      name: 'test',
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('test@gmail.com');
    expect(user.elo).toBe(1500);
  });

  it('should return user by id', async () => {
    const user = await service.findUnique({ where: { id: 1 } });

    expect(user).toBeDefined();
    expect(user?.id).toBe(1);
    expect(user?.email).toBe('test@gmail.com');
    expect(user?.elo).toBe(1500);
  });

  it('should update user rating', async () => {
    const user = await service.updateUserRating(1, 1600);

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.email).toBe('test@gmail.com');
    expect(user.elo).toBe(1600);
  });

  it('should return top users', async () => {
    const topUsers = await service.getTopUsers();
    expect(topUsers.length).toBe(1);
  });

  describe('getUsersToRate', () => {
    it('should return a pair of users to rate', async () => {
      const user1 = {
        id: 1,
        email: 'test1@gmail.com',
        elo: 1500,
        name: 'test1',
      };
      const user2 = {
        id: 2,
        email: 'test2@gmail.com',
        elo: 1520,
        name: 'test2',
      };

      prismaMock.user.count.mockResolvedValue(2);
      prismaMock.user.findMany.mockResolvedValue([user1]);
      prismaMock.user.findFirst.mockResolvedValue(user2);

      const usersToRate = await service.getUsersToRate(1);

      expect(usersToRate.length).toBe(2);
      expect(usersToRate).toContainEqual(user1);
      expect(usersToRate).toContainEqual(user2);
    });

    it('should increase range if no user found in initial range', async () => {
      const user1 = {
        id: 1,
        email: 'test1@gmail.com',
        elo: 1500,
        name: 'test1',
      };
      const user3 = {
        id: 3,
        email: 'test3@gmail.com',
        elo: 1700,
        name: 'test3',
      };

      prismaMock.user.count.mockResolvedValue(3);
      prismaMock.user.findMany.mockResolvedValue([user1]);
      prismaMock.user.findFirst
        .mockResolvedValueOnce(null) // first attempt with range 1
        .mockResolvedValueOnce(null) // second attempt with range 2
        .mockResolvedValueOnce(user3); // third attempt with range 3

      const usersToRate = await service.getUsersToRate(1);

      expect(usersToRate.length).toBe(2);
      expect(usersToRate).toContainEqual(user1);
      expect(usersToRate).toContainEqual(user3);
    });

    it('should return empty array if no users found', async () => {
      prismaMock.user.count.mockResolvedValue(0);
      prismaMock.user.findMany.mockResolvedValue([]);

      const usersToRate = await service.getUsersToRate(1);

      expect(usersToRate.length).toBe(0);
    });
  });
});

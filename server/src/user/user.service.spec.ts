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
});

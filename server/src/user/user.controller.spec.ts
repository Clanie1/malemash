import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

const user = {
  id: 1,
  email: 'test@gmail.com',
  elo: 1500,
  name: 'test',
  image: '',
};

describe('UserController', () => {
  let controller: UserController;

  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        PrismaService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);

    prismaMock.user.create.mockResolvedValue(user);
    prismaMock.user.findUnique.mockResolvedValue(user);
    prismaMock.user.update.mockResolvedValue({ ...user, elo: 1600 });
    prismaMock.user.findMany.mockResolvedValue([user]);
  });

  it('should create a new user', async () => {
    expect(
      await controller.create({
        email: 'test@gmail.com',
        name: 'test',
      }),
    ).toBe(user);
  });

  it('should find a user', async () => {
    expect(await controller.getUser('1')).toBe(user);
  });

  it('should get top users', async () => {
    expect(await controller.getTopUsers()).toEqual([user]);
  });
});

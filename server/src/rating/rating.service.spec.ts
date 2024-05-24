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
      createdAt: new Date(),
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
      image: '',
    };

    const user2 = {
      id: 2,
      email: 'test2@gmail.com',
      elo: 1500,
      name: 'test2',
      image: '',
    };

    const user3 = {
      id: 3,
      email: 'test3@gmail.com',
      elo: 1500,
      name: 'test3',
      image: '',
    };

    prismaMock.rating.create.mockResolvedValue(rating);
    prismaMock.user.findUnique
      .mockResolvedValue(user1)
      .mockResolvedValue(user2)
      .mockResolvedValue(user3);
    prismaMock.rating.findMany.mockResolvedValue([rating]);

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

  test('calculates new Elo correctly', () => {
    const playerElo = 1500;
    const probabilityToWin = 0.6;
    const won = true;
    const expectedNewElo = 1500 + 24 * (1 - probabilityToWin);
    const actualNewElo = service['calculateNewElo'](
      playerElo,
      probabilityToWin,
      won,
    );
    expect(actualNewElo).toBe(expectedNewElo);
  });

  test('calculates probability of player 1 winning correctly', () => {
    const player1Elo = 1500;
    const player2Elo = 1600;
    const expectedProbability =
      1 / (1 + Math.pow(10, (player2Elo - player1Elo) / 400));
    const actualProbability = service['calculateProbabilityOfPlayer1Winning'](
      player1Elo,
      player2Elo,
    );
    expect(actualProbability).toBe(expectedProbability);
  });

  test('calculates new Elo when players have same Elo and player 1 wins', () => {
    const player1Elo = 1500;
    const player2Elo = 1500;
    const probabilityToWin = service['calculateProbabilityOfPlayer1Winning'](
      player1Elo,
      player2Elo,
    );
    const won = true;
    const expectedNewEloPlayer1 = player1Elo + 24 * (1 - probabilityToWin);
    const actualNewEloPlayer1 = service['calculateNewElo'](
      player1Elo,
      probabilityToWin,
      won,
    );
    expect(actualNewEloPlayer1).toBe(expectedNewEloPlayer1);

    const expectedNewEloPlayer2 = player2Elo + 24 * -probabilityToWin;
    const actualNewEloPlayer2 = service['calculateNewElo'](
      player2Elo,
      probabilityToWin,
      !won,
    );
    expect(actualNewEloPlayer2).toBe(expectedNewEloPlayer2);
  });

  test('calculates new Elo when players have same Elo and player 1 wins', () => {
    const player1Elo = 1500;
    const player2Elo = 1500;
    const probabilityToWin = service['calculateProbabilityOfPlayer1Winning'](
      player1Elo,
      player2Elo,
    );
    const won = true;
    const expectedNewEloPlayer1 = player1Elo + 24 * (1 - probabilityToWin);
    const actualNewEloPlayer1 = service['calculateNewElo'](
      player1Elo,
      probabilityToWin,
      won,
    );
    expect(actualNewEloPlayer1).toBe(expectedNewEloPlayer1);

    const expectedNewEloPlayer2 = player2Elo + 24 * -probabilityToWin;
    const actualNewEloPlayer2 = service['calculateNewElo'](
      player2Elo,
      probabilityToWin,
      !won,
    );
    expect(actualNewEloPlayer2).toBe(expectedNewEloPlayer2);
  });

  test('calculates new Elo when players have significantly different Elo and player 1 wins', () => {
    const player1Elo = 2000;
    const player2Elo = 1000;
    const probabilityToWin = service['calculateProbabilityOfPlayer1Winning'](
      player1Elo,
      player2Elo,
    );
    const won = true;
    const actualNewEloPlayer1 = service['calculateNewElo'](
      player1Elo,
      probabilityToWin,
      won,
    );
    expect(actualNewEloPlayer1).toBeGreaterThan(player1Elo); // Player 1's Elo should increase significantly

    const actualNewEloPlayer2 = service['calculateNewElo'](
      player2Elo,
      probabilityToWin,
      !won,
    );
    expect(actualNewEloPlayer2).toBeLessThan(player2Elo); // Player 2's Elo should decrease significantly
  });

  test('calculates probability of player 1 winning when both players have very low Elo', () => {
    const player1Elo = 100;
    const player2Elo = 200;
    const actualProbability = service['calculateProbabilityOfPlayer1Winning'](
      player1Elo,
      player2Elo,
    );
    expect(actualProbability).toBeLessThan(0.5);
  });

  test('calculates probability of player 1 winning when both players have very high Elo', () => {
    const player1Elo = 2500;
    const player2Elo = 2400;
    const actualProbability = service['calculateProbabilityOfPlayer1Winning'](
      player1Elo,
      player2Elo,
    );
    expect(actualProbability).toBeGreaterThan(0.5);
  });

  test('calculates new Elo when player 1 has higher Elo and player 2 wins', () => {
    const player1Elo = 1600;
    const player2Elo = 1500;
    const probabilityToWin = service['calculateProbabilityOfPlayer1Winning'](
      player1Elo,
      player2Elo,
    );

    console.log('probabilityToWin', probabilityToWin);
    const won = true;
    const expectedNewEloPlayer1 = player1Elo + 24 * (1 - probabilityToWin);
    const actualNewEloPlayer1 = service['calculateNewElo'](
      player1Elo,
      probabilityToWin,
      won,
    );
    expect(actualNewEloPlayer1).toBe(expectedNewEloPlayer1);

    const expectedNewEloPlayer2 = player2Elo + 24 * -probabilityToWin;

    const actualNewEloPlayer2 = service['calculateNewElo'](
      player2Elo,
      probabilityToWin,
      !won,
    );
    expect(actualNewEloPlayer2).toBe(expectedNewEloPlayer2);
  });

  test('should return the latest ratings', async () => {
    const ratings = await service.getLatestRatings();
    expect(ratings).toHaveLength(1);
  });
});

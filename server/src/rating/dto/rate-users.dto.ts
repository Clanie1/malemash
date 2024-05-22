import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class RateUsersDto {
  @IsInt()
  @ApiProperty()
  authorId: number;

  @IsInt()
  @ApiProperty()
  userId1: number;

  @IsInt()
  @ApiProperty()
  userId2: number;

  @IsInt()
  @ApiProperty()
  selectedUserId: number;
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({
      name: createUserDto.name,
      email: createUserDto.email,
    });
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findUnique({ where: { id: parseInt(id) } });
  }

  @Get('/top')
  async getTopUsers() {
    return this.userService.getTopUsers();
  }
}

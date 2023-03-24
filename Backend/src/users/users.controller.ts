import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, Post, SerializeOptions, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('/adduser')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() payload: CreateUserDto) {
    return await this.userService.createUser(payload);
  }
}

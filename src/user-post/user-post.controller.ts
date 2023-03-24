import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { UserPostService } from './user-post.service';
import { CreateUserPostDto } from './dto/create-user-post.dto';
import { UpdateUserPostDto } from './dto/update-user-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user-post')
@ApiTags("User post")
export class UserPostController {
  constructor(private readonly userPostService: UserPostService) { }

  @Post('/add')
  create(@Headers() headers, @Body() createUserPostDto: CreateUserPostDto) {
    return this.userPostService.create(headers.authorization, createUserPostDto);
  }

  @Get('/listPost')
  findAll(@Headers() headers) {
    let token = headers.authorization
    token = token.split(" ")
    token = token[1];
    return this.userPostService.findAll(token);
  }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.userPostService.findOne(headers.authorization, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPostDto: UpdateUserPostDto) {
    return this.userPostService.update(id, updateUserPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPostService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserPostDto } from './dto/create-user-post.dto';
import { UpdateUserPostDto } from './dto/update-user-post.dto';
import { UserPost } from './entities/user-post.entity';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserPostService {
  constructor(
    @InjectRepository(UserPost)
    private userPostRepository: Repository<UserPost>,
    private readonly authService: AuthService,
  ) { }

  async create(tokens, createUserPostDto: CreateUserPostDto) {
    const token = await this.authService.jwtVerify(tokens)
    const data = await this.userPostRepository.save({
      title: createUserPostDto.title,
      user: {
        id: token.id
      }
    })
    return data
  }

  async findAll(tokens) {
    const token = await this.authService.jwtVerify(tokens)
    const data = await this.userPostRepository.find({
      relations: ["user"],
      where: {
        user: {
          id: token.id
        }
      }
    })
    return data;
  }

  async findOne(tokens, id: string) {
    const token = await this.authService.jwtVerify(tokens)
    const data = await this.userPostRepository.findOne({
      relations: ['user'],
      where: {
        id: id,
        user: {
          id: token.id
        }
      }
    })
    return data;
  }

  async update(id: string, updateUserPostDto: UpdateUserPostDto) {
    const data = await this.userPostRepository.update(
      id,
      { ...updateUserPostDto }
    )
    return data;
  }

  async remove(id: string) {
    const data = await this.userPostRepository.softDelete(id)
    return data;
  }
}

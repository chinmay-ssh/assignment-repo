import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { UpdateUserDto } from './dto/update-user.dto';
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async createUser(payload: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    payload.password = await bcrypt.hash(
      payload.password,
      salt,
    );

    const data = await this.userRepository.save(payload);
    delete data.password
    return data
  }

  findOne(fields: EntityCondition<User>) {
    return this.userRepository.findOne({
      where: fields,
    });
  }

  async update(id: string, updateProfileDto: UpdateUserDto) {
    return await this.userRepository.save(
      this.userRepository.create({
        id,
        ...updateProfileDto,
      }),
    );
  }

}

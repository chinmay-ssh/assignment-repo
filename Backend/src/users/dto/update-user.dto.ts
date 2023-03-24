import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'Raghav' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Patel' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty()
  @IsNotEmpty()
  password: string
}

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
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


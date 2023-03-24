import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateUserPostDto } from './create-user-post.dto';

export class UpdateUserPostDto extends PartialType(CreateUserPostDto) {
    @ApiProperty({ example: 'Raghav' })
    @IsNotEmpty()
    title: string | null;
}

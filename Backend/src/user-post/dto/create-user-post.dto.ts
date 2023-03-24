import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CreateUserPostDto {
    @ApiProperty({ example: 'Raghav' })
    @IsNotEmpty()
    title: string | null;
}

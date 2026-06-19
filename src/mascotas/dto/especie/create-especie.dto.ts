import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEspecieDto {
	@ApiProperty({ example: 'Perro' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	nombre!: string;
}

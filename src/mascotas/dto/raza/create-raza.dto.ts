import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRazaDto {
	@ApiProperty({ example: 'Labrador' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	nombre!: string;

	@ApiProperty({ example: 'uuid-especie' })
	@IsUUID()
	especieId!: string;
}

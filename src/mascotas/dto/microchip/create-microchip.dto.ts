import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMicrochipDto {
	@ApiProperty({ example: 'CHIP-123456789' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	codigo!: string;
}

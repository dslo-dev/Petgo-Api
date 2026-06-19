import {
	IsString,
	IsNotEmpty,
	IsNumber,
	IsDateString,
	IsUUID,
	IsOptional,
	Min,
	MaxLength,
	IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMascotaDto {
	@ApiProperty({ example: 'Firulais' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	nombre!: string;

	@ApiProperty({ example: 12.5 })
	@IsNumber()
	@Min(0)
	peso!: number;

	@ApiProperty({ example: 'M' })
	@IsString()
	@IsIn(['M', 'F'])
	sexo!: string;

	@ApiProperty({ example: '2020-05-10' })
	@IsDateString()
	nacimiento!: string;

	@ApiProperty({ example: 'Perro blanco con manchas negras', required: false })
	@IsOptional()
	@IsString()
	@MaxLength(255)
	descripcionFisica?: string;

	@ApiProperty({ example: 'uuid-especie' })
	@IsUUID()
	especieId!: string;

	@ApiProperty({ example: 'uuid-raza' })
	@IsUUID()
	razaId!: string;

	@ApiProperty({ example: '1234567890' })
	@IsString()
	@MaxLength(30)
	microchipCodigo!: string;
}

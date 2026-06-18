import {
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	IsUrl,
	IsDateString,
	ValidateNested,
	IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContactoDto } from '../contacto/createContactoDTO';

export class CreateProfileDto {
	@IsOptional()
	@IsUrl()
	avatar?: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	nombre!: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(70)
	appat!: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(70)
	apmat!: string;

	@IsDateString()
	@IsNotEmpty()
	nacimiento!: string;

	@ValidateNested()
	@Type(() => CreateContactoDto)
	@IsNotEmpty()
	@IsObject()
	contacto!: CreateContactoDto;
}

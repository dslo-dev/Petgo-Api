import {
	ArrayNotEmpty,
	IsArray,
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsObject,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from '../profile/createProfileDTO';

export class createUserDTO {
	@IsString()
	@IsNotEmpty()
	nombreUsuario!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	contraseña!: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsInt({ each: true })
	roles!: number[];

	@ValidateNested()
	@Type(() => CreateProfileDto)
	@IsObject()
	perfil!: CreateProfileDto;
}

import {
	IsEmail,
	IsNotEmpty,
	IsObject,
	IsString,
	MinLength,
	ValidateNested,
	IsArray,
	IsInt,
	ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from 'src/user/dto/profile/createProfileDTO';

export class RegisterDTO {
	@IsString()
	@IsNotEmpty()
	username!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsInt({ each: true })
	roles!: number[];

	@ValidateNested()
	@Type(() => CreateProfileDto)
	@IsObject()
	perfil!: CreateProfileDto;
}

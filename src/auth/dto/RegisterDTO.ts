import { IsEmail, IsNotEmpty, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateProfileDto } from '../../user/profile/dto/create-profile.dto';
import { Type } from 'class-transformer';

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

	@ValidateNested()
	@Type(() => CreateProfileDto)
	@IsObject()
	profile!: CreateProfileDto;
}

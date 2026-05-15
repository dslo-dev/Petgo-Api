import { IsEmail, IsNotEmpty, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
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

	@ValidateNested()
	@Type(() => CreateProfileDto)
	@IsObject()
	profile!: CreateProfileDto;
}

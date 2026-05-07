import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
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
}

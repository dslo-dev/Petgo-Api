import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ example: 'usuario@correo.com' })
	email!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@ApiProperty({ example: 'password123' })
	password!: string;
}

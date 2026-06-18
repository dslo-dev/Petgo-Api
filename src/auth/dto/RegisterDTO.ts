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
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDTO {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Claudinho' })
	nombreUsuario!: string;

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ example: 'Claudinho@gmail.com' })
	email!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@ApiProperty({ example: 'ContraseñaUltraSecretaYSegura777' })
	contraseña!: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsInt({ each: true })
	@ApiProperty({ example: [1] })
	roles!: number[];

	@ValidateNested()
	@Type(() => CreateProfileDto)
	@IsObject()
	@ApiProperty({ type: CreateProfileDto })
	perfil!: CreateProfileDto;
}

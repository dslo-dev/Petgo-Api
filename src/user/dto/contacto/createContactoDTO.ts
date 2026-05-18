import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateContactoDto {
	@IsString()
	@Length(8, 15)
	telefonoPrincipal!: string;

	@IsOptional()
	@IsString()
	@Length(8, 15)
	telefonoSegundario?: string;

	@IsEmail()
	@Length(5, 100)
	email!: string;
}

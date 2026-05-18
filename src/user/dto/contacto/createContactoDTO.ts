import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateContactoDto {
	@IsString()
	@Length(8, 15)
	@Matches(/^\+?[1-9]\d{7,14}$/, {
		message: 'El teléfono principal no tiene un formato válido',
	})
	telefonoPrincipal!: string;

	@IsOptional()
	@IsString()
	@Length(8, 15)
	@Matches(/^\+?[1-9]\d{7,14}$/, {
		message: 'El teléfono secundario no tiene un formato válido',
	})
	telefonoSegundario?: string;

	@IsEmail()
	@Length(5, 100)
	email!: string;
}

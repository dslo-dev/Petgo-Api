import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateGrupoFamiliarDto {
	@IsString()
	@MaxLength(150)
	nombre!: string;

	@IsUUID()
	propietarioId!: string;

	@IsUUID()
	creadoPor!: string;

	@IsOptional()
	@IsString()
	descripcion?: string;

	@IsOptional()
	@IsString()
	urlImagen?: string;
}

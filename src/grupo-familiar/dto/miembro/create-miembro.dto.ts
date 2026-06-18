import { IsEnum, IsUUID } from 'class-validator';

import { Rol } from '../../../common/Enums';

export class CreateMiembroDto {
	@IsUUID()
	grupoId!: string;

	@IsUUID()
	usuarioId!: string;

	@IsEnum(Rol)
	rol!: Rol;
}

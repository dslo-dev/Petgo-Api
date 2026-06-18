import { IsEnum, IsUUID } from 'class-validator';

import { Rol } from '../../../common/Enums';

export class CambiarRolDto {
	@IsUUID()
	miembroId!: string;

	@IsEnum(Rol)
	rol!: Rol;
}

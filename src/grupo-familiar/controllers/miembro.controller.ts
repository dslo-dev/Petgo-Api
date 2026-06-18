import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

import { MiembroService } from '../services/miembro.service';

import { CreateMiembroDto } from '../dto/miembro/create-miembro.dto';

import { CambiarRolDto } from '../dto/miembro/cambiar-rol.dto';

@Controller('miembros')
export class MiembroController {
	constructor(private readonly miembroService: MiembroService) {}

	@Post()
	agregarMiembro(
		@Body()
		dto: CreateMiembroDto,
	) {
		return this.miembroService.agregarMiembro(dto);
	}

	@Patch('rol')
	cambiarRol(
		@Body()
		dto: CambiarRolDto,
	) {
		return this.miembroService.cambiarRol(dto);
	}

	@Delete(':id')
	expulsar(
		@Param('id')
		id: string,
	) {
		return this.miembroService.expulsar(id);
	}
}

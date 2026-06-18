import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

import { MiembroService } from '../services/miembro.service';
import { CreateMiembroDto } from '../dto/miembro/create-miembro.dto';
import { CambiarRolDto } from '../dto/miembro/cambiar-rol.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Miembros')
@Controller('miembros')
export class MiembroController {
	constructor(private readonly miembroService: MiembroService) {}

	@Post()
	@ApiOperation({ summary: 'Agregar un miembro a un grupo' })
	@ApiResponse({ status: 201, description: 'Miembro agregado correctamente' })
	agregarMiembro(@Body() dto: CreateMiembroDto) {
		return this.miembroService.agregarMiembro(dto);
	}

	@Patch('rol')
	@ApiOperation({ summary: 'Cambiar rol de un miembro' })
	@ApiResponse({ status: 200, description: 'Rol actualizado correctamente' })
	cambiarRol(@Body() dto: CambiarRolDto) {
		return this.miembroService.cambiarRol(dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Expulsar un miembro del grupo' })
	@ApiParam({ name: 'id', description: 'ID del miembro' })
	@ApiResponse({ status: 200, description: 'Miembro eliminado del grupo' })
	expulsar(@Param('id') id: string) {
		return this.miembroService.expulsar(id);
	}
}

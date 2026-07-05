import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { MiembroService } from '../services/miembro.service';
import { CreateMiembroDto } from '../dto/miembro/create-miembro.dto';
import { CambiarRolDto } from '../dto/miembro/cambiar-rol.dto';
import { CurrentUser } from '../../common/auth/current-user.decorator';

@ApiTags('Miembros')
@Controller('miembros')
export class MiembroController {
	constructor(private readonly miembroService: MiembroService) {}

	@Post()
	@ApiOperation({ summary: 'Agregar un miembro a un grupo (solo dueño, no puede ser DUENO)' })
	@ApiResponse({ status: 201, description: 'Miembro agregado' })
	agregarMiembro(@Body() dto: CreateMiembroDto, @CurrentUser('sub') usuarioId: string) {
		return this.miembroService.agregarMiembro(dto, usuarioId);
	}

	@Get('grupo/:grupoId')
	@ApiOperation({ summary: 'Obtener miembros activos de un grupo' })
	@ApiResponse({ status: 200, description: 'Lista de miembros' })
	obtenerMiembros(@Param('grupoId') grupoId: string) {
		return this.miembroService.obtenerMiembrosPorGrupo(grupoId);
	}

	@Patch('rol')
	@ApiOperation({ summary: 'Cambiar rol de un miembro (solo dueño)' })
	@ApiResponse({ status: 200, description: 'Rol actualizado' })
	cambiarRol(@Body() dto: CambiarRolDto, @CurrentUser('sub') usuarioId: string) {
		return this.miembroService.cambiarRol(dto, usuarioId);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Expulsar un miembro del grupo (solo dueño, soft delete)' })
	@ApiResponse({ status: 200, description: 'Miembro expulsado' })
	expulsar(@Param('id') id: string, @CurrentUser('sub') usuarioId: string) {
		return this.miembroService.expulsar(id, usuarioId);
	}
}

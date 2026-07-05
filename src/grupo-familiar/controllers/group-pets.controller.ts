import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { GroupPetsService } from '../services/group-pets.service';
import { AddMascotaDto } from '../dto/mascota/add-mascota.dto';
import { CurrentUser } from '../../common/auth/current-user.decorator';

@ApiTags('Mascotas del grupo')
@Controller('grupos/:grupoId/mascotas')
export class GroupPetsController {
	constructor(private readonly groupPetsService: GroupPetsService) {}

	@Post()
	@ApiOperation({ summary: 'Agregar una mascota al grupo (solo dueño)' })
	@ApiResponse({ status: 201, description: 'Mascota agregada al grupo' })
	agregarMascota(
		@Param('grupoId') grupoId: string,
		@Body() dto: AddMascotaDto,
		@CurrentUser('sub') usuarioId: string,
	) {
		return this.groupPetsService.agregarMascota({ ...dto, grupoId }, usuarioId);
	}

	@Get()
	@ApiOperation({ summary: 'Listar mascotas del grupo' })
	@ApiResponse({ status: 200, description: 'Lista de mascotas del grupo' })
	listarMascotas(@Param('grupoId') grupoId: string) {
		return this.groupPetsService.listarMascotasDelGrupo(grupoId);
	}

	@Delete(':mascotaId')
	@ApiOperation({ summary: 'Remover una mascota del grupo (solo dueño)' })
	@ApiResponse({ status: 200, description: 'Mascota removida del grupo' })
	removerMascota(
		@Param('grupoId') grupoId: string,
		@Param('mascotaId') mascotaId: string,
		@CurrentUser('sub') usuarioId: string,
	) {
		return this.groupPetsService.removerMascota(grupoId, mascotaId, usuarioId);
	}
}

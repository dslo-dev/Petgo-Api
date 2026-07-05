import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

import { GrupoFamiliarService } from '../services/grupo-familiar.service';
import { CreateGrupoFamiliarDto } from '../dto/grupo/create-grupo-familiar.dto';
import { UpdateGrupoFamiliarDto } from '../dto/grupo/update-grupo-familiar.dto';
import { CurrentUser } from '../../common/auth/current-user.decorator';

@ApiTags('Grupos familiares')
@Controller('grupos')
export class GrupoFamiliarController {
	constructor(private readonly grupoService: GrupoFamiliarService) {}

	@Post()
	@ApiOperation({ summary: 'Crear un grupo familiar (auto-asigna dueño como miembro)' })
	@ApiResponse({ status: 201, description: 'Grupo creado correctamente' })
	create(@Body() dto: CreateGrupoFamiliarDto, @CurrentUser('sub') usuarioId: string) {
		return this.grupoService.create(dto, usuarioId);
	}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los grupos (opcional: filtrar por usuario)' })
	@ApiQuery({ name: 'usuarioId', required: false })
	@ApiResponse({ status: 200, description: 'Lista de grupos' })
	findAll(@Query('usuarioId') usuarioId?: string) {
		return this.grupoService.findAll(usuarioId);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener un grupo familiar por ID' })
	@ApiResponse({ status: 200, description: 'Grupo encontrado' })
	findOne(@Param('id') id: string) {
		return this.grupoService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Actualizar un grupo (solo dueño)' })
	@ApiResponse({ status: 200, description: 'Grupo actualizado' })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateGrupoFamiliarDto,
		@CurrentUser('sub') usuarioId: string,
	) {
		return this.grupoService.update(id, dto, usuarioId);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar (soft delete) un grupo (solo dueño)' })
	@ApiResponse({ status: 200, description: 'Grupo eliminado' })
	remove(@Param('id') id: string, @CurrentUser('sub') usuarioId: string) {
		return this.grupoService.remove(id, usuarioId);
	}
}

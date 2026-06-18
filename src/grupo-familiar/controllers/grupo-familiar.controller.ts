import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { GrupoFamiliarService } from '../services/grupo-familiar.service';
import { CreateGrupoFamiliarDto } from '../dto/grupo/create-grupo-familiar.dto';
import { UpdateGrupoFamiliarDto } from '../dto/grupo/update-grupo-familiar.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Grupos familiares')
@Controller('grupos')
export class GrupoFamiliarController {
	constructor(private readonly grupoService: GrupoFamiliarService) {}

	@Post()
	@ApiOperation({ summary: 'Crear un grupo familiar' })
	@ApiResponse({ status: 201, description: 'Grupo creado correctamente' })
	create(@Body() dto: CreateGrupoFamiliarDto) {
		return this.grupoService.create(dto);
	}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los grupos familiares' })
	@ApiResponse({ status: 200, description: 'Lista de grupos' })
	findAll() {
		return this.grupoService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener un grupo familiar por ID' })
	@ApiParam({ name: 'id', description: 'ID del grupo' })
	@ApiResponse({ status: 200, description: 'Grupo encontrado' })
	findOne(@Param('id') id: string) {
		return this.grupoService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Actualizar un grupo familiar' })
	@ApiParam({ name: 'id', description: 'ID del grupo' })
	@ApiResponse({ status: 200, description: 'Grupo actualizado' })
	update(@Param('id') id: string, @Body() dto: UpdateGrupoFamiliarDto) {
		return this.grupoService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un grupo familiar' })
	@ApiParam({ name: 'id', description: 'ID del grupo' })
	@ApiResponse({ status: 200, description: 'Grupo eliminado' })
	remove(@Param('id') id: string) {
		return this.grupoService.remove(id);
	}
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalizacionService } from './localizacion.service';
import { CreateLocalizacionDto } from './dto/create-localizacion.dto';
import { UpdateLocalizacionDto } from './dto/update-localizacion.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Localización')
@Controller('localizacion')
export class LocalizacionController {
	constructor(private readonly localizacionService: LocalizacionService) {}

	@Post()
	@ApiOperation({ summary: 'Crear localización' })
	@ApiResponse({ status: 201, description: 'Localización creada correctamente' })
	create(@Body() createLocalizacionDto: CreateLocalizacionDto) {
		return this.localizacionService.create(createLocalizacionDto);
	}

	@Get()
	@ApiOperation({ summary: 'Obtener todas las localizaciones' })
	@ApiResponse({ status: 200, description: 'Lista de localizaciones' })
	findAll() {
		return this.localizacionService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener localización por ID' })
	@ApiParam({ name: 'id', description: 'ID de la localización' })
	@ApiResponse({ status: 200, description: 'Localización encontrada' })
	findOne(@Param('id') id: string) {
		return this.localizacionService.findOne(+id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Actualizar localización' })
	@ApiParam({ name: 'id', description: 'ID de la localización' })
	@ApiResponse({ status: 200, description: 'Localización actualizada' })
	update(@Param('id') id: string, @Body() updateLocalizacionDto: UpdateLocalizacionDto) {
		return this.localizacionService.update(+id, updateLocalizacionDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar localización' })
	@ApiParam({ name: 'id', description: 'ID de la localización' })
	@ApiResponse({ status: 200, description: 'Localización eliminada' })
	remove(@Param('id') id: string) {
		return this.localizacionService.remove(+id);
	}
}

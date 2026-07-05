import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/mascota/create-mascota.dto';
import { UpdateMascotaDto } from './dto/mascota/update-mascota.dto';
import { CurrentUser } from '../common/auth/current-user.decorator';

@ApiTags('Mascotas')
@Controller('mascotas')
export class MascotasController {
	constructor(private readonly service: MascotasService) {}

	@Post()
	create(@Body() dto: CreateMascotaDto, @CurrentUser('sub') usuarioId: string) {
		return this.service.create(dto, usuarioId);
	}

	@Get()
	@ApiQuery({ name: 'usuarioId', required: false, description: 'Filtrar mascotas por usuario creador' })
	findAll(@Query('usuarioId') usuarioId?: string) {
		return this.service.findAll(usuarioId);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.service.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateMascotaDto, @CurrentUser('sub') usuarioId: string) {
		return this.service.update(id, dto, usuarioId);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @CurrentUser('sub') usuarioId: string) {
		return this.service.remove(id, usuarioId);
	}
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/mascota/create-mascota.dto';
import { UpdateMascotaDto } from './dto/mascota/update-mascota.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mascotas')
@Controller('mascotas')
export class MascotasController {
	constructor(private readonly service: MascotasService) {}

	@Post()
	create(@Body() dto: CreateMascotaDto) {
		return this.service.create(dto);
	}

	@Get()
	findAll() {
		return this.service.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.service.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateMascotaDto) {
		return this.service.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.service.remove(id);
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { GrupoFamiliarService } from '../services/grupo-familiar.service';

import { CreateGrupoFamiliarDto } from '../dto/grupo/create-grupo-familiar.dto';

import { UpdateGrupoFamiliarDto } from '../dto/grupo/update-grupo-familiar.dto';

@Controller('grupos')
export class GrupoFamiliarController {
	constructor(private readonly grupoService: GrupoFamiliarService) {}

	@Post()
	create(@Body() dto: CreateGrupoFamiliarDto) {
		return this.grupoService.create(dto);
	}

	@Get()
	findAll() {
		return this.grupoService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.grupoService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,

		@Body()
		dto: UpdateGrupoFamiliarDto,
	) {
		return this.grupoService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.grupoService.remove(id);
	}
}

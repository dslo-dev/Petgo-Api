import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalizacionService } from './localizacion.service';
import { CreateLocalizacionDto } from './dto/create-localizacion.dto';
import { UpdateLocalizacionDto } from './dto/update-localizacion.dto';

@Controller('localizacion')
export class LocalizacionController {
	constructor(private readonly localizacionService: LocalizacionService) {}

	@Post()
	create(@Body() createLocalizacionDto: CreateLocalizacionDto) {
		return this.localizacionService.create(createLocalizacionDto);
	}

	@Get()
	findAll() {
		return this.localizacionService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.localizacionService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateLocalizacionDto: UpdateLocalizacionDto) {
		return this.localizacionService.update(+id, updateLocalizacionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.localizacionService.remove(+id);
	}
}

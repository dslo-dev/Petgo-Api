import { Injectable } from '@nestjs/common';
import { CreateLocalizacionDto } from './dto/create-localizacion.dto';
import { UpdateLocalizacionDto } from './dto/update-localizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
//ENTIDADES
import { Repository } from 'typeorm';
import { Comuna } from './entities/comuna.entity';
import { Ciudad } from './entities/ciudad.entity';
import { Region } from './entities/region.entity';
import { Detalle } from './entities/detalle.entity';
import { Direccion } from './entities/direccion.entity';

@Injectable()
export class LocalizacionService {
	constructor(
		@InjectRepository(Region)
		private readonly regionRepository: Repository<Region>,
		@InjectRepository(Ciudad)
		private readonly ciudadRepository: Repository<Ciudad>,
		@InjectRepository(Comuna)
		private readonly comunaRepository: Repository<Comuna>,
		@InjectRepository(Direccion)
		private readonly direccionRepository: Repository<Direccion>,
		@InjectRepository(Detalle)
		private readonly detalleRepository: Repository<Detalle>,
	) {}

	create(createLocalizacionDto: CreateLocalizacionDto) {
		return 'This action adds a new localizacion';
	}

	findAll() {
		return `This action returns all localizacion`;
	}

	findOne(id: number) {
		return `This action returns a #${id} localizacion`;
	}

	update(id: number, updateLocalizacionDto: UpdateLocalizacionDto) {
		return `This action updates a #${id} localizacion`;
	}

	remove(id: number) {
		return `This action removes a #${id} localizacion`;
	}
}

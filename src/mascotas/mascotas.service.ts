import { Injectable } from '@nestjs/common';
import { CreateMascotaDto } from './dto/mascota/create-mascota.dto';
import { UpdateMascotaDto } from './dto/mascota/update-mascota.dto';
import { Mascota } from './entities/mascota.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MascotasService {
	constructor(
		@InjectRepository(Mascota)
		private mascotaRepo: Repository<Mascota>,
	) {}

	create(dto: CreateMascotaDto) {
		const mascota = this.mascotaRepo.create(dto);
		return this.mascotaRepo.save(mascota);
	}

	findAll() {
		return this.mascotaRepo.find({
			relations: ['especie', 'raza', 'microchip'],
		});
	}

	findOne(id: string) {
		return this.mascotaRepo.findOne({
			where: { id },
			relations: ['especie', 'raza', 'microchip'],
		});
	}

	async update(id: string, dto: UpdateMascotaDto) {
		await this.mascotaRepo.update(id, dto);
		return this.findOne(id);
	}

	remove(id: string) {
		return this.mascotaRepo.delete(id);
	}
}

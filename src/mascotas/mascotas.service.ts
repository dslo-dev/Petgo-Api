import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMascotaDto } from './dto/mascota/create-mascota.dto';
import { UpdateMascotaDto } from './dto/mascota/update-mascota.dto';
import { Mascota } from './entities/mascota.entity';

@Injectable()
export class MascotasService {
	constructor(
		@InjectRepository(Mascota)
		private mascotaRepo: Repository<Mascota>,
	) {}

	create(dto: CreateMascotaDto, usuarioId: string) {
		const mascota = this.mascotaRepo.create({ ...dto, creadoPor: usuarioId });
		return this.mascotaRepo.save(mascota);
	}

	findAll(usuarioId?: string) {
		const where = usuarioId ? { creadoPor: usuarioId } : {};
		return this.mascotaRepo.find({
			where,
			relations: ['especie', 'raza', 'microchip'],
		});
	}

	findOne(id: string) {
		return this.mascotaRepo.findOne({
			where: { id },
			relations: ['especie', 'raza', 'microchip'],
		});
	}

	async update(id: string, dto: UpdateMascotaDto, usuarioId: string) {
		const mascota = await this.findOne(id);
		if (!mascota) throw new NotFoundException('Mascota no encontrada');
		if (mascota.creadoPor !== usuarioId) {
			throw new BadRequestException('Solo el creador puede modificar esta mascota');
		}
		await this.mascotaRepo.update(id, dto);
		return this.findOne(id);
	}

	async remove(id: string, usuarioId: string) {
		const mascota = await this.findOne(id);
		if (!mascota) throw new NotFoundException('Mascota no encontrada');
		if (mascota.creadoPor !== usuarioId) {
			throw new BadRequestException('Solo el creador puede eliminar esta mascota');
		}
		return this.mascotaRepo.delete(id);
	}
}

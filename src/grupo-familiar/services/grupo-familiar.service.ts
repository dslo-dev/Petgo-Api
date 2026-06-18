import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GrupoFamiliar } from '../entities/grupo-familiar.entity';

import { CreateGrupoFamiliarDto } from '../dto/grupo/create-grupo-familiar.dto';

import { UpdateGrupoFamiliarDto } from '../dto/grupo/update-grupo-familiar.dto';

@Injectable()
export class GrupoFamiliarService {
	constructor(
		@InjectRepository(GrupoFamiliar)
		private readonly grupoRepository: Repository<GrupoFamiliar>,
	) {}

	async create(dto: CreateGrupoFamiliarDto): Promise<GrupoFamiliar> {
		const grupo = this.grupoRepository.create(dto);

		return this.grupoRepository.save(grupo);
	}

	async findAll(): Promise<GrupoFamiliar[]> {
		return this.grupoRepository.find({
			relations: {
				miembros: true,
				invitaciones: true,
			},
		});
	}

	async findOne(id: string): Promise<GrupoFamiliar> {
		const grupo = await this.grupoRepository.findOne({
			where: { id },
			relations: {
				miembros: true,
				invitaciones: true,
			},
		});

		if (!grupo) {
			throw new NotFoundException('Grupo familiar no encontrado');
		}

		return grupo;
	}

	async update(id: string, dto: UpdateGrupoFamiliarDto): Promise<GrupoFamiliar> {
		await this.findOne(id);

		await this.grupoRepository.update(id, dto);

		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		await this.findOne(id);

		await this.grupoRepository.delete(id);
	}
}

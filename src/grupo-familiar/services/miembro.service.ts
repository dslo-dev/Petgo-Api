import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { MiembroGrupo } from '../entities/miembro-grupo.entity';

import { GrupoFamiliar } from '../entities/grupo-familiar.entity';

import { CreateMiembroDto } from '../dto/miembro/create-miembro.dto';

import { CambiarRolDto } from '../dto/miembro/cambiar-rol.dto';

@Injectable()
export class MiembroService {
	constructor(
		@InjectRepository(MiembroGrupo)
		private readonly miembroRepository: Repository<MiembroGrupo>,

		@InjectRepository(GrupoFamiliar)
		private readonly grupoRepository: Repository<GrupoFamiliar>,
	) {}

	async agregarMiembro(dto: CreateMiembroDto) {
		const grupo = await this.grupoRepository.findOne({
			where: { id: dto.grupoId },
		});

		if (!grupo) {
			throw new NotFoundException('Grupo no encontrado');
		}

		const existe = await this.miembroRepository.findOne({
			where: {
				usuarioId: dto.usuarioId,
				grupo: {
					id: dto.grupoId,
				},
			},
			relations: {
				grupo: true,
			},
		});

		if (existe) {
			throw new ConflictException('El usuario ya pertenece al grupo');
		}

		const miembro = this.miembroRepository.create({
			usuarioId: dto.usuarioId,
			rol: dto.rol,
			grupo,
			fechaIngreso: new Date(),
		});

		return this.miembroRepository.save(miembro);
	}

	async cambiarRol(dto: CambiarRolDto) {
		const miembro = await this.miembroRepository.findOne({
			where: {
				id: dto.miembroId,
			},
		});

		if (!miembro) {
			throw new NotFoundException('Miembro no encontrado');
		}

		miembro.rol = dto.rol;

		return this.miembroRepository.save(miembro);
	}

	async expulsar(miembroId: string) {
		const miembro = await this.miembroRepository.findOne({
			where: {
				id: miembroId,
			},
		});

		if (!miembro) {
			throw new NotFoundException('Miembro no encontrado');
		}

		await this.miembroRepository.remove(miembro);

		return {
			message: 'Miembro eliminado',
		};
	}
}

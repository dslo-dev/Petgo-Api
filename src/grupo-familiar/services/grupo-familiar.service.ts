import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { MiembroGrupo } from '../entities/miembro-grupo.entity';
import { CreateGrupoFamiliarDto } from '../dto/grupo/create-grupo-familiar.dto';
import { UpdateGrupoFamiliarDto } from '../dto/grupo/update-grupo-familiar.dto';
import { Rol, Estado } from '../../common/Enums';

@Injectable()
export class GrupoFamiliarService {
	constructor(
		@InjectRepository(GrupoFamiliar)
		private readonly grupoRepository: Repository<GrupoFamiliar>,

		@InjectRepository(MiembroGrupo)
		private readonly miembroRepository: Repository<MiembroGrupo>,
	) {}

	async create(dto: CreateGrupoFamiliarDto, usuarioId: string): Promise<GrupoFamiliar> {
		const grupo = this.grupoRepository.create({
			nombre: dto.nombre,
			propietarioId: usuarioId,
			creadoPor: usuarioId,
			descripcion: dto.descripcion,
			urlImagen: dto.urlImagen,
		});

		const grupoGuardado = await this.grupoRepository.save(grupo);

		const dueno = this.miembroRepository.create({
			usuarioId,
			rol: Rol.DUENO,
			grupo: grupoGuardado,
			fechaIngreso: new Date(),
		});

		await this.miembroRepository.save(dueno);

		return this.findOne(grupoGuardado.id);
	}

	async findAll(usuarioId?: string): Promise<GrupoFamiliar[]> {
		const where = usuarioId
			? { miembros: { usuarioId, estado: Estado.ACTIVO } }
			: undefined;

		return this.grupoRepository.find({
			where,
			relations: { miembros: true, invitaciones: true, mascotas: true },
			order: { fechaCreacion: 'DESC' },
		});
	}

	async findOne(id: string): Promise<GrupoFamiliar> {
		const grupo = await this.grupoRepository.findOne({
			where: { id },
			relations: { miembros: true, invitaciones: true, mascotas: true },
		});

		if (!grupo) throw new NotFoundException('Grupo familiar no encontrado');

		return grupo;
	}

	async update(id: string, dto: UpdateGrupoFamiliarDto, usuarioId: string): Promise<GrupoFamiliar> {
		const grupo = await this.findOne(id);

		if (grupo.propietarioId !== usuarioId) {
			throw new BadRequestException('Solo el dueño del grupo puede actualizarlo');
		}

		await this.grupoRepository.update(id, dto);
		return this.findOne(id);
	}

	async remove(id: string, usuarioId: string): Promise<void> {
		const grupo = await this.findOne(id);

		if (grupo.propietarioId !== usuarioId) {
			throw new BadRequestException('Solo el dueño del grupo puede eliminarlo');
		}

		grupo.estado = Estado.ELIMINADO;
		grupo.fechaEliminacion = new Date();
		await this.grupoRepository.save(grupo);
	}
}

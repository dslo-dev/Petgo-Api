import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invitacion } from '../entities/invitacion.entity';
import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { MiembroGrupo } from '../entities/miembro-grupo.entity';
import { CreateInvitacionDto } from '../dto/invitacion/create-invitacion.dto';
import { Estado, Rol } from '../../common/Enums';

@Injectable()
export class InvitacionService {
	constructor(
		@InjectRepository(Invitacion)
		private readonly invitacionRepository: Repository<Invitacion>,

		@InjectRepository(GrupoFamiliar)
		private readonly grupoRepository: Repository<GrupoFamiliar>,

		@InjectRepository(MiembroGrupo)
		private readonly miembroRepository: Repository<MiembroGrupo>,
	) {}

	async crear(dto: CreateInvitacionDto, solicitanteId: string) {
		const grupo = await this.grupoRepository.findOne({ where: { id: dto.grupoId } });
		if (!grupo) throw new NotFoundException('Grupo no encontrado');

		if (grupo.propietarioId !== solicitanteId) {
			throw new BadRequestException('Solo el dueño del grupo puede invitar usuarios');
		}

		const invitacion = this.invitacionRepository.create({
			grupo,
			usuarioId: dto.usuarioId,
			fechaInvitacion: new Date(),
		});

		return this.invitacionRepository.save(invitacion);
	}

	async aceptar(id: string, usuarioId: string) {
		const invitacion = await this.invitacionRepository.findOne({
			where: { id },
			relations: { grupo: true },
		});

		if (!invitacion) throw new NotFoundException('Invitación no encontrada');

		if (invitacion.usuarioId !== usuarioId) {
			throw new BadRequestException('Esta invitación no te pertenece');
		}

		const miembro = this.miembroRepository.create({
			usuarioId: invitacion.usuarioId,
			rol: Rol.MIEMBRO,
			grupo: invitacion.grupo,
			fechaIngreso: new Date(),
		});

		await this.miembroRepository.save(miembro);

		invitacion.estado = Estado.INACTIVO;
		invitacion.fechaRespuesta = new Date();
		return this.invitacionRepository.save(invitacion);
	}

	async rechazar(id: string, usuarioId: string) {
		const invitacion = await this.invitacionRepository.findOne({
			where: { id },
		});

		if (!invitacion) throw new NotFoundException('Invitación no encontrada');

		if (invitacion.usuarioId !== usuarioId) {
			throw new BadRequestException('Esta invitación no te pertenece');
		}

		invitacion.estado = Estado.INACTIVO;
		invitacion.fechaRespuesta = new Date();
		return this.invitacionRepository.save(invitacion);
	}

	async listarPorUsuario(usuarioId: string) {
		return this.invitacionRepository.find({
			where: { usuarioId, estado: Estado.ACTIVO },
			relations: { grupo: true },
		});
	}
}

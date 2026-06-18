import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Invitacion } from '../entities/invitacion.entity';

import { CreateInvitacionDto } from '../dto/invitacion/create-invitacion.dto';

import { Estado } from 'src/common/Enums';

@Injectable()
export class InvitacionService {
	constructor(
		@InjectRepository(Invitacion)
		private readonly invitacionRepository: Repository<Invitacion>,
	) {}

	async crear(dto: CreateInvitacionDto) {
		const invitacion = this.invitacionRepository.create({
			...dto,
			fechaInvitacion: new Date(),
		});

		return this.invitacionRepository.save(invitacion);
	}

	async aceptar(id: string) {
		const invitacion = await this.invitacionRepository.findOne({
			where: { id },
		});

		if (!invitacion) {
			throw new NotFoundException('Invitación no encontrada');
		}

		invitacion.estado = Estado.ACTIVO;

		invitacion.fechaRespuesta = new Date();

		return this.invitacionRepository.save(invitacion);
	}

	async rechazar(id: string) {
		const invitacion = await this.invitacionRepository.findOne({
			where: { id },
		});

		if (!invitacion) {
			throw new NotFoundException('Invitación no encontrada');
		}

		invitacion.estado = Estado.INACTIVO;

		invitacion.fechaRespuesta = new Date();

		return this.invitacionRepository.save(invitacion);
	}
}

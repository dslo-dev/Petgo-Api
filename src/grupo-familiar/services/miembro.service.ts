import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MiembroGrupo } from '../entities/miembro-grupo.entity';
import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { CreateMiembroDto } from '../dto/miembro/create-miembro.dto';
import { CambiarRolDto } from '../dto/miembro/cambiar-rol.dto';
import { Rol, Estado } from '../../common/Enums';

@Injectable()
export class MiembroService {
	constructor(
		@InjectRepository(MiembroGrupo)
		private readonly miembroRepository: Repository<MiembroGrupo>,

		@InjectRepository(GrupoFamiliar)
		private readonly grupoRepository: Repository<GrupoFamiliar>,
	) {}

	async agregarMiembro(dto: CreateMiembroDto, solicitanteId: string) {
		const grupo = await this.grupoRepository.findOne({ where: { id: dto.grupoId } });
		if (!grupo) throw new NotFoundException('Grupo no encontrado');

		if (grupo.propietarioId !== solicitanteId) {
			throw new BadRequestException('Solo el dueño del grupo puede agregar miembros');
		}

		if (dto.rol === Rol.DUENO) {
			throw new BadRequestException('No puedes asignar rol DUENO. El dueño se asigna al crear el grupo.');
		}

		const existe = await this.miembroRepository.findOne({
			where: { usuarioId: dto.usuarioId, grupo: { id: dto.grupoId } },
			relations: { grupo: true },
		});

		if (existe) throw new ConflictException('El usuario ya pertenece al grupo');

		const miembro = this.miembroRepository.create({
			usuarioId: dto.usuarioId,
			rol: dto.rol,
			grupo,
			fechaIngreso: new Date(),
		});

		return this.miembroRepository.save(miembro);
	}

	async cambiarRol(dto: CambiarRolDto, solicitanteId: string) {
		const miembro = await this.miembroRepository.findOne({
			where: { id: dto.miembroId },
			relations: { grupo: true },
		});

		if (!miembro) throw new NotFoundException('Miembro no encontrado');

		if (miembro.grupo.propietarioId !== solicitanteId) {
			throw new BadRequestException('Solo el dueño del grupo puede cambiar roles');
		}

		if (miembro.rol === Rol.DUENO) {
			throw new BadRequestException('No puedes cambiar el rol del dueño');
		}

		if (dto.rol === Rol.DUENO) {
			throw new BadRequestException('No puedes asignar rol DUENO. Transfiere la propiedad del grupo.');
		}

		miembro.rol = dto.rol;
		return this.miembroRepository.save(miembro);
	}

	async expulsar(miembroId: string, solicitanteId: string) {
		const miembro = await this.miembroRepository.findOne({
			where: { id: miembroId },
			relations: { grupo: true },
		});

		if (!miembro) throw new NotFoundException('Miembro no encontrado');

		if (miembro.grupo.propietarioId !== solicitanteId) {
			throw new BadRequestException('Solo el dueño del grupo puede expulsar miembros');
		}

		if (miembro.rol === Rol.DUENO) {
			throw new BadRequestException('No puedes expulsar al dueño del grupo');
		}

		miembro.estado = Estado.ELIMINADO;
		miembro.fechaSalida = new Date();
		await this.miembroRepository.save(miembro);

		return { message: 'Miembro eliminado del grupo' };
	}

	async obtenerMiembrosPorGrupo(grupoId: string) {
		return this.miembroRepository.find({
			where: { grupo: { id: grupoId }, estado: Estado.ACTIVO },
			relations: { grupo: true },
		});
	}
}

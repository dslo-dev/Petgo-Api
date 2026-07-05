import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GrupoMascota } from '../entities/grupo-mascota.entity';
import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { AddMascotaDto } from '../dto/mascota/add-mascota.dto';
import { MascotasClientService } from '../../common/clients/mascotas-client.service';

@Injectable()
export class GroupPetsService {
	constructor(
		@InjectRepository(GrupoMascota)
		private readonly grupoMascotaRepository: Repository<GrupoMascota>,

		@InjectRepository(GrupoFamiliar)
		private readonly grupoRepository: Repository<GrupoFamiliar>,

		private readonly mascotasClient: MascotasClientService,
	) {}

	async agregarMascota(dto: AddMascotaDto, solicitanteId: string): Promise<GrupoMascota> {
		const grupo = await this.grupoRepository.findOne({ where: { id: dto.grupoId } });
		if (!grupo) throw new NotFoundException('Grupo no encontrado');

		if (grupo.propietarioId !== solicitanteId) {
			throw new BadRequestException('Solo el dueño del grupo puede agregar mascotas');
		}

		const existe = await this.mascotasClient.validarMascotaExiste(dto.mascotaId);
		if (!existe) {
			throw new NotFoundException('Mascota no encontrada en el sistema');
		}

		const yaAgregada = await this.grupoMascotaRepository.findOne({
			where: { mascotaId: dto.mascotaId, grupo: { id: dto.grupoId }, activo: true },
		});

		if (yaAgregada) {
			throw new BadRequestException('La mascota ya está agregada al grupo');
		}

		const grupoMascota = this.grupoMascotaRepository.create({
			grupo,
			mascotaId: dto.mascotaId,
			fechaAgregado: new Date(),
		});

		return this.grupoMascotaRepository.save(grupoMascota);
	}

	async removerMascota(grupoId: string, mascotaId: string, solicitanteId: string): Promise<{ message: string }> {
		const grupo = await this.grupoRepository.findOne({ where: { id: grupoId } });
		if (!grupo) throw new NotFoundException('Grupo no encontrado');

		if (grupo.propietarioId !== solicitanteId) {
			throw new BadRequestException('Solo el dueño del grupo puede remover mascotas');
		}

		const relacion = await this.grupoMascotaRepository.findOne({
			where: { mascotaId, grupo: { id: grupoId }, activo: true },
		});

		if (!relacion) throw new NotFoundException('La mascota no está en el grupo');

		relacion.activo = false;
		relacion.fechaRemovido = new Date();
		await this.grupoMascotaRepository.save(relacion);

		return { message: 'Mascota removida del grupo' };
	}

	async listarMascotasDelGrupo(grupoId: string): Promise<GrupoMascota[]> {
		return this.grupoMascotaRepository.find({
			where: { grupo: { id: grupoId }, activo: true },
		});
	}
}

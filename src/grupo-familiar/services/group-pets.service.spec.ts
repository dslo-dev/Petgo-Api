import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { GroupPetsService } from './group-pets.service';
import { GrupoMascota } from '../entities/grupo-mascota.entity';
import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { MascotasClientService } from '../../common/clients/mascotas-client.service';

describe('GroupPetsService', () => {
	let service: GroupPetsService;

	const mockGrupoMascotaRepository = {
		create: jest.fn(),
		save: jest.fn(),
		findOne: jest.fn(),
		find: jest.fn(),
	};

	const mockGrupoRepository = {
		findOne: jest.fn(),
	};

	const mockMascotasClient = {
		validarMascotaExiste: jest.fn(),
		obtenerMascota: jest.fn(),
		obtenerMascotasPorIds: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				GroupPetsService,
				{ provide: getRepositoryToken(GrupoMascota), useValue: mockGrupoMascotaRepository },
				{ provide: getRepositoryToken(GrupoFamiliar), useValue: mockGrupoRepository },
				{ provide: MascotasClientService, useValue: mockMascotasClient },
			],
		}).compile();

		service = module.get<GroupPetsService>(GroupPetsService);
		jest.clearAllMocks();
	});

	describe('agregarMascota', () => {
		it('agrega una mascota al grupo si es el dueño y existe en MS Mascotas', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockMascotasClient.validarMascotaExiste.mockResolvedValue(true);
			mockGrupoMascotaRepository.findOne.mockResolvedValue(null);
			mockGrupoMascotaRepository.create.mockReturnValue({ id: 'gm-1', mascotaId: 'm-1' });
			mockGrupoMascotaRepository.save.mockResolvedValue({ id: 'gm-1' });

			const result = await service.agregarMascota({ grupoId: 'g-1', mascotaId: 'm-1' }, 'user-1');
			expect(result).toEqual({ id: 'gm-1' });
			expect(mockMascotasClient.validarMascotaExiste).toHaveBeenCalledWith('m-1');
		});

		it('lanza NotFoundException si la mascota no existe en el MS Mascotas', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockMascotasClient.validarMascotaExiste.mockResolvedValue(false);

			await expect(
				service.agregarMascota({ grupoId: 'g-1', mascotaId: 'm-1' }, 'user-1'),
			).rejects.toThrow(NotFoundException);
		});

		it('lanza BadRequestException si la mascota ya está en el grupo', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockMascotasClient.validarMascotaExiste.mockResolvedValue(true);
			mockGrupoMascotaRepository.findOne.mockResolvedValue({ id: 'gm-1', activo: true });

			await expect(
				service.agregarMascota({ grupoId: 'g-1', mascotaId: 'm-1' }, 'user-1'),
			).rejects.toThrow(BadRequestException);
		});

		it('lanza BadRequestException si no es el dueño', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });

			await expect(
				service.agregarMascota({ grupoId: 'g-1', mascotaId: 'm-1' }, 'otro-user'),
			).rejects.toThrow(BadRequestException);
		});

		it('lanza NotFoundException si el grupo no existe', async () => {
			mockGrupoRepository.findOne.mockResolvedValue(null);
			await expect(
				service.agregarMascota({ grupoId: 'x', mascotaId: 'm-1' }, 'user-1'),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('removerMascota', () => {
		it('remueve (soft delete) la mascota del grupo si es el dueño', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockGrupoMascotaRepository.findOne.mockResolvedValue({ id: 'gm-1', activo: true });
			mockGrupoMascotaRepository.save.mockResolvedValue({ id: 'gm-1', activo: false });

			const result = await service.removerMascota('g-1', 'm-1', 'user-1');
			expect(result.message).toBe('Mascota removida del grupo');
			expect(mockGrupoMascotaRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({ activo: false }),
			);
		});

		it('lanza NotFoundException si la mascota no está en el grupo', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockGrupoMascotaRepository.findOne.mockResolvedValue(null);

			await expect(service.removerMascota('g-1', 'm-1', 'user-1')).rejects.toThrow(NotFoundException);
		});
	});

	describe('listarMascotasDelGrupo', () => {
		it('retorna las mascotas activas del grupo', async () => {
			const relaciones = [
				{ id: 'gm-1', mascotaId: 'm-1', activo: true },
				{ id: 'gm-2', mascotaId: 'm-2', activo: true },
			];
			mockGrupoMascotaRepository.find.mockResolvedValue(relaciones);

			const result = await service.listarMascotasDelGrupo('g-1');
			expect(result).toEqual(relaciones);
			expect(mockGrupoMascotaRepository.find).toHaveBeenCalledWith(
				expect.objectContaining({
					where: { grupo: { id: 'g-1' }, activo: true },
				}),
			);
		});
	});
});

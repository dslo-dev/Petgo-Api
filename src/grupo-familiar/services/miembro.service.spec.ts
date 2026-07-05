import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';

import { MiembroService } from './miembro.service';
import { MiembroGrupo } from '../entities/miembro-grupo.entity';
import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { Rol, Estado } from '../../common/Enums';

describe('MiembroService', () => {
	let service: MiembroService;

	const mockMiembroRepository = {
		create: jest.fn(),
		save: jest.fn(),
		findOne: jest.fn(),
		find: jest.fn(),
	};

	const mockGrupoRepository = {
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				MiembroService,
				{ provide: getRepositoryToken(MiembroGrupo), useValue: mockMiembroRepository },
				{ provide: getRepositoryToken(GrupoFamiliar), useValue: mockGrupoRepository },
			],
		}).compile();

		service = module.get<MiembroService>(MiembroService);
		jest.clearAllMocks();
	});

	describe('agregarMiembro', () => {
		it('agrega un miembro si es el dueño del grupo', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockMiembroRepository.findOne.mockResolvedValue(null);
			mockMiembroRepository.create.mockReturnValue({ id: 'm-1', usuarioId: 'u-2', rol: Rol.CUIDADOR });
			mockMiembroRepository.save.mockResolvedValue({ id: 'm-1' });

			const result = await service.agregarMiembro({ grupoId: 'g-1', usuarioId: 'u-2', rol: Rol.CUIDADOR }, 'user-1');
			expect(result).toEqual({ id: 'm-1' });
		});

		it('lanza BadRequestException si no es el dueño', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			await expect(
				service.agregarMiembro({ grupoId: 'g-1', usuarioId: 'u-2', rol: Rol.MIEMBRO }, 'otro-user'),
			).rejects.toThrow(BadRequestException);
		});

		it('lanza BadRequestException si se intenta asignar DUENO', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			await expect(
				service.agregarMiembro({ grupoId: 'g-1', usuarioId: 'u-2', rol: Rol.DUENO }, 'user-1'),
			).rejects.toThrow(BadRequestException);
		});

		it('lanza ConflictException si el usuario ya pertenece al grupo', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockMiembroRepository.findOne.mockResolvedValue({ id: 'm-1' });
			await expect(
				service.agregarMiembro({ grupoId: 'g-1', usuarioId: 'u-2', rol: Rol.MIEMBRO }, 'user-1'),
			).rejects.toThrow(ConflictException);
		});

		it('lanza NotFoundException si el grupo no existe', async () => {
			mockGrupoRepository.findOne.mockResolvedValue(null);
			await expect(
				service.agregarMiembro({ grupoId: 'x', usuarioId: 'u-2', rol: Rol.MIEMBRO }, 'user-1'),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('cambiarRol', () => {
		it('cambia el rol si es el dueño del grupo', async () => {
			mockMiembroRepository.findOne.mockResolvedValue({
				id: 'm-1',
				rol: Rol.MIEMBRO,
				grupo: { propietarioId: 'user-1' },
			});
			mockMiembroRepository.save.mockResolvedValue({ id: 'm-1', rol: Rol.CUIDADOR });

			const result = await service.cambiarRol({ miembroId: 'm-1', rol: Rol.CUIDADOR }, 'user-1');
			expect(result.rol).toBe(Rol.CUIDADOR);
		});

		it('lanza BadRequestException si no es el dueño', async () => {
			mockMiembroRepository.findOne.mockResolvedValue({
				id: 'm-1',
				grupo: { propietarioId: 'user-1' },
			});
			await expect(
				service.cambiarRol({ miembroId: 'm-1', rol: Rol.CUIDADOR }, 'otro'),
			).rejects.toThrow(BadRequestException);
		});

		it('lanza BadRequestException si el miembro es DUENO', async () => {
			mockMiembroRepository.findOne.mockResolvedValue({
				id: 'm-1',
				rol: Rol.DUENO,
				grupo: { propietarioId: 'user-1' },
			});
			await expect(
				service.cambiarRol({ miembroId: 'm-1', rol: Rol.CUIDADOR }, 'user-1'),
			).rejects.toThrow(BadRequestException);
		});

		it('lanza NotFoundException si el miembro no existe', async () => {
			mockMiembroRepository.findOne.mockResolvedValue(null);
			await expect(
				service.cambiarRol({ miembroId: 'x', rol: Rol.CUIDADOR }, 'user-1'),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('expulsar', () => {
		it('expulsa (soft delete) si es el dueño', async () => {
			mockMiembroRepository.findOne.mockResolvedValue({
				id: 'm-1',
				rol: Rol.MIEMBRO,
				grupo: { propietarioId: 'user-1' },
			});
			mockMiembroRepository.save.mockResolvedValue({ id: 'm-1', estado: Estado.ELIMINADO });

			const result = await service.expulsar('m-1', 'user-1');
			expect(result.message).toBe('Miembro eliminado del grupo');
			expect(mockMiembroRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({ estado: Estado.ELIMINADO }),
			);
		});

		it('lanza BadRequestException si se intenta expulsar al dueño', async () => {
			mockMiembroRepository.findOne.mockResolvedValue({
				id: 'm-1',
				rol: Rol.DUENO,
				grupo: { propietarioId: 'user-1' },
			});
			await expect(service.expulsar('m-1', 'user-1')).rejects.toThrow(BadRequestException);
		});

		it('lanza NotFoundException si el miembro no existe', async () => {
			mockMiembroRepository.findOne.mockResolvedValue(null);
			await expect(service.expulsar('x', 'user-1')).rejects.toThrow(NotFoundException);
		});
	});

	describe('obtenerMiembrosPorGrupo', () => {
		it('retorna miembros activos del grupo', async () => {
			const miembros = [{ id: 'm-1', usuarioId: 'u-1', estado: Estado.ACTIVO }];
			mockMiembroRepository.find.mockResolvedValue(miembros);

			const result = await service.obtenerMiembrosPorGrupo('g-1');
			expect(result).toEqual(miembros);
			expect(mockMiembroRepository.find).toHaveBeenCalledWith(
				expect.objectContaining({
					where: { grupo: { id: 'g-1' }, estado: Estado.ACTIVO },
				}),
			);
		});
	});
});
